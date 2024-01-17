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

const AuthGoogleButton: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google.',
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
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Login with Google
      </Button>
    </div>
  )
}

export default AuthGoogleButton
