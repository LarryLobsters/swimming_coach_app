import { trpc } from '@/utils/api'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

import { Label } from './ui/label'
import { Button } from './ui/button'
import { api } from '@/utils/api'

function AuthButton() {
  const { data: sessionData } = useSession()

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  )

  return (
    <div className='flex items-center justify-center gap-4'>
      <div className='text-center text-2xl text-white'>
        {sessionData && (
          <Button className='flex items-center justify-between gap-3 w-full'>
            <Avatar>
              <AvatarImage src={sessionData?.user?.image as string} />
              <AvatarFallback>{sessionData?.user?.email}</AvatarFallback>
            </Avatar>
            <Label>{sessionData.user?.name}</Label>
          </Button>
        )}
      </div>
      <button
        className='rounded-md bg-white/10 px-9 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}

export default AuthButton
