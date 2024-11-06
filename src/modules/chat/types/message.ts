export type Message = {
  text: string
  userName: string
  createdAt: Date
  uuid: string
  readBy: string[]
  replyTo?: string
}