'use client'

import { useCallback, useEffect, useRef } from 'react'
import { Message, ReaderData } from '../../types/message'

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'

interface MessageEventData {
  event: 'message'
  data: Message
}

interface ReadMessageEventData {
  event: 'readMessage'
  data: ReaderData
}

type SocketEventData = MessageEventData | ReadMessageEventData

interface WebsocketHookProps {
  onMessage: (message: Message) => void
  onReadMessage: (data: ReaderData) => void
}

export default function useWebsocket({
  onMessage,
  onReadMessage,
}: WebsocketHookProps) {
  const webSocketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ws = new WebSocket(`${protocol}//${window.location.host}/api/ws`)

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data) as SocketEventData

        // if (message.event === 'message') onMessage(message.data)

        switch (message.event) {
          case 'message':
            onMessage(message.data)
            break

          case 'readMessage':
            onReadMessage(message.data)
            break

          default:
        }
      }

      setInterval(() => {
        if (ws.readyState !== ws.OPEN) {
          webSocketRef.current = new WebSocket(
            `${protocol}//${window.location.host}/api/ws`,
          )
          return
        }

        ws.send(`{"event":"ping"}`)
      }, 29000)

      webSocketRef.current = ws

      return () => {
        ws.close()
      }
    }
  }, [onMessage, onReadMessage])

  const sendMessage = useCallback((message: Message) => {
    if (webSocketRef.current) {
      const messageEventData: MessageEventData = {
        event: 'message',
        data: message,
      }

      const messageJson = JSON.stringify(messageEventData)

      webSocketRef.current.send(messageJson)
    }
  }, [])

  const readMessage = useCallback((reader: ReaderData) => {
    if (webSocketRef.current) {
      const readMessageEventData: ReadMessageEventData = {
        event: 'readMessage',
        data: reader,
      }

      const readMessageJson = JSON.stringify(readMessageEventData)

      webSocketRef.current.send(readMessageJson)
    }
  }, [])

  return { sendMessage, readMessage }
}
