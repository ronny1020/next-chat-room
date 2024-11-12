export type Message = {
  text: string
  userName: string
  createdAt: number
  uuid: string
  readBy: string[]
  replyTo?: string
}

export type ReaderData = {
  uuids: string[]
  reader: string
}
