import ChatPage from '@/modules/chat/components/ChatPage'

export default async function Chat({
  params,
}: {
  params: Promise<{ userName: string }>
}) {
  const userName = (await params).userName

  return <ChatPage userName={userName}></ChatPage>
}
