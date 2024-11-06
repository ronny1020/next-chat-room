'use client'

import { ColorModeContext } from '@/modules/chat/context/colorModeContext'
import { ChildrenOnly } from '@/shared/types/ChildrenOnly'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { useMemo, useState } from 'react'

export default function ClientWrapper({ children }: ChildrenOnly) {
  const modeState = useState<'light' | 'dark'>('light')
  const [mode] = modeState

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={modeState}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
