import { IconButton } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext } from '../../context/colorModeContext'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

interface Props {
  className?: string
}

export default function ThemeToggle({ className }: Props) {
  const [mode, setMode] = useContext(ColorModeContext)

  return (
    <IconButton
      className={className}
      onClick={() =>
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
      color="inherit"
    >
      {mode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  )
}
