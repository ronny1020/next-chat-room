import { AppBar, Toolbar } from '@mui/material'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

interface Props {
  userName: string
}
export default function Header({ userName }: Props) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          Hi {userName}
          <ThemeToggle className="ml-auto" />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
