'use client'
import { useEffect, useRef } from 'react'

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'

export default function useWebsocket() {
  const webSocketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      webSocketRef.current = new WebSocket(
        `${protocol}//${window.location.host}/api/ws`,
      )

      setInterval(() => {
        if (!webSocketRef.current) return

        if (webSocketRef.current.readyState !== webSocketRef.current.OPEN) {
          webSocketRef.current = new WebSocket(
            `${protocol}//${window.location.host}/api/ws`,
          )
          return
        }

        webSocketRef.current.send(`{"event":"ping"}`)
      }, 29000)
    }
  }, [])
}
