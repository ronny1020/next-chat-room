import { Avatar, Box, Button, Divider, Popover } from '@mui/material'
import { Message } from '../../types/message'
import dayjs from 'dayjs'
import condSwitch from 'condition-switch'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

function scrollToId(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView()
  }
}

interface MessageBoxProps {
  userName: string
  message: Message
  replyToMessage: Message | null
  setReplyTo: (arg0: string) => void
}

export default function MessageBox({
  userName,
  message: { text, userName: userNameOfMessage, createdAt, readBy, uuid },
  setReplyTo,
  replyToMessage,
}: MessageBoxProps) {
  const isMyMessage = userName === userNameOfMessage
  const readTimes = readBy.filter(
    (readByUserName) => readByUserName !== userName,
  ).length

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box
      component="div"
      className={twMerge(
        'flex gap-2 p-4',
        isMyMessage ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <Avatar>{userNameOfMessage?.[0]}</Avatar>
      <Box className="flex flex-col gap-2">
        {!isMyMessage && (
          <Box className="text-xs text-gray-600">{userNameOfMessage}</Box>
        )}
        <Box
          id={uuid}
          component="button"
          className={twMerge(
            'max-w-[70vw] whitespace-pre-wrap break-words rounded-md border px-3 py-2 text-left',
            isMyMessage ? 'bg-blue-200' : 'bg-white',
          )}
        >
          {replyToMessage && (
            <>
              <Box
                className="cursor-pointer px-4"
                onClick={() => scrollToId(replyToMessage.uuid)}
              >
                <div>{replyToMessage.text}</div>
              </Box>
              <Divider />
            </>
          )}
          <Box className="cursor-pointer px-4" onClick={handleClick}>
            <div>{text}</div>
          </Box>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Button
              onClick={() => {
                setReplyTo(uuid)
                handleClose()
              }}
            >
              Reply
            </Button>
          </Popover>
        </Box>
      </Box>
      <Box
        component="div"
        className={twMerge(
          'self-end text-xs text-gray-600',
          isMyMessage ? 'text-right' : 'text-left',
        )}
      >
        {condSwitch(
          [
            [!isMyMessage, ''],
            [readTimes === 0, ''],
            [readTimes === 1, 'Read'],
            [readTimes > 1, `Read ${readTimes}`],
          ],
          '',
        )}
        <br />
        {dayjs(createdAt).format('YYYY/MM/DD HH:mm:ss')}
      </Box>
    </Box>
  )
}
