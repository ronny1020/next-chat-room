import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function useUpdateUserName() {
  const router = useRouter()

  return useCallback(
    (userName: string) => {
      router.push(`/${userName}`)
    },
    [router],
  )
}
