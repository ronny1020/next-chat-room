'use client'

import Header from './Header/Header'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Message, ReaderData } from '../types/message'
import { useForm } from 'react-hook-form'
import { Box, Button, Divider, IconButton, TextField } from '@mui/material'
import MessageBox from './MessageBox/MessageBox'
import useExecuteAfterRender from '../hooks/useExecuteAfterRender'
import DeleteIcon from '@mui/icons-material/Delete'
import findUnreadUuid from '../domain/findUnreadUuid'
import addUserNameToMessageReadBy from '../domain/addUserNameToMessageReadBy'
import addReaderToMyMessageReadBy from '../domain/addReaderToMyMessageReadBy.'
import createMessageUuidMap from '../domain/createMessageUuidMap'
import isElementScrolledToBottom from '@/shared/utils/dom/isElementScrolledToBottom'
import requiredWithTrimmed from '@/shared/utils/form/validate/requiredWithTrimmed'
import useWebsocket from '../services/websocket/useWebsocket'

interface MessageForm {
  message: string
}

interface Props {
  userName: string
}

export default function ChatPage({ userName }: Props) {
  const [messages, setMessages] = useState<Message[]>([])

  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollToBottomCallback = useCallback(() => {
    bottomRef.current?.scrollIntoView()
  }, [])

  const scrollToBottom = useExecuteAfterRender(scrollToBottomCallback)

  const onMessage = useCallback(
    (message: Message) => {
      setMessages((prev) => [...prev, message])

      const messageAreaElement = bottomRef.current?.parentNode

      if (
        messageAreaElement instanceof HTMLElement &&
        isElementScrolledToBottom(messageAreaElement)
      ) {
        scrollToBottom()
      }
    },
    [scrollToBottom],
  )

  const onReadMessage = useCallback(
    ({ uuids, reader }: ReaderData) => {
      setMessages((previous) =>
        addReaderToMyMessageReadBy(previous, userName, uuids, reader),
      )
    },
    [userName],
  )

  const { sendMessage, readMessage } = useWebsocket({
    onMessage,
    onReadMessage,
  })

  const readUnreadMessages = useCallback(() => {
    const uuids = findUnreadUuid(messages, userName)

    if (uuids.length) {
      readMessage({ uuids, reader: userName })

      setMessages((previous) =>
        addUserNameToMessageReadBy(previous, userName, uuids),
      )
    }
  }, [messages, readMessage, userName])

  useEffect(() => {
    const isFocused = document.hasFocus()
    if (isFocused) {
      readUnreadMessages()
    }
  }, [readUnreadMessages])

  useEffect(() => {
    window.addEventListener('focus', readUnreadMessages)
    return () => {
      window.removeEventListener('focus', readUnreadMessages)
    }
  }, [readUnreadMessages, userName])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageForm>()

  const messageUuidMap = useMemo(
    () => createMessageUuidMap(messages),
    [messages],
  )

  const [replyToMessageUuid, setReplyToMessageUuid] = useState<string | null>(
    null,
  )

  const replyToMessage = replyToMessageUuid
    ? messageUuidMap[replyToMessageUuid]
    : null

  const onSubmit = handleSubmit((messageForm) => {
    const message: Message = {
      text: messageForm.message,
      userName,
      createdAt: new Date().getTime(),
      uuid: crypto.randomUUID(),
      readBy: [userName],
    }

    if (replyToMessageUuid) {
      message['replyTo'] = replyToMessageUuid
      setReplyToMessageUuid(null)
    }

    sendMessage(message)

    setMessages((prev) => [...prev, message])

    reset()

    scrollToBottom()
  })

  return (
    <Box className="flex h-screen flex-col">
      <Header userName={userName} />
      <Box className="flex h-0 shrink grow flex-col overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBox
            message={message}
            key={message.createdAt}
            setReplyTo={setReplyToMessageUuid}
            replyToMessage={
              (message.replyTo && messageUuidMap[message.replyTo]) || null
            }
            userName={userName}
          />
        ))}
        <div ref={bottomRef} />
      </Box>
      <Divider component="div" role="presentation" />
      <Box className="flex max-w-[100vw] items-center gap-2 whitespace-pre-wrap break-all p-4">
        {replyToMessage && (
          <>
            reply to:
            <div>{replyToMessage.text}</div>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => setReplyToMessageUuid(null)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Box
        component="form"
        className="flex items-start gap-2 p-4"
        onSubmit={onSubmit}
      >
        <TextField
          multiline
          fullWidth
          rows={5}
          error={!!errors.message}
          placeholder="Please input your message."
          {...register('message', {
            validate: requiredWithTrimmed,
          })}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              onSubmit()
            }
          }}
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  )
}
