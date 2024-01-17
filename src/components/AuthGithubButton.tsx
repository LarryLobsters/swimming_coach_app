import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import Icons from './icons'
import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const AuthGithubButton: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGithub = async () => {
    setIsLoading(true)

    try {
      await signIn('github')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Github.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGithub}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.gitHub className='h-4 w-4 mr-2' />}
        Login with Github
      </Button>
    </div>
  )
}

export default AuthGithubButton
