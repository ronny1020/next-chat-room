'use client'

import ThemeToggle from '@/modules/chat/components/ThemeToggle/ThemeToggle'
import useUpdateUserName from '@/modules/home/hooks/useUpdateUserName'
import requiredWithTrimmed from '@/shared/utils/form/validate/requiredWithTrimmed'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

interface UserForm {
  userName: string
}

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>()

  const updateUserName = useUpdateUserName()

  const onSubmit = handleSubmit((userForm) =>
    updateUserName(userForm.userName.trim()),
  )

  return (
    <>
      <div className="fixed right-4 top-4">
        Theme: <ThemeToggle />
      </div>

      <Box
        component="form"
        onSubmit={onSubmit}
        className="flex h-screen items-center justify-center gap-2"
      >
        <TextField
          error={!!errors.userName}
          label="Name"
          placeholder="Please input your name."
          {...register('userName', {
            validate: requiredWithTrimmed,
          })}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </>
  )
}
