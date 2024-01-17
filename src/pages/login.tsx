import type { FC } from 'react'
import LoginForm from '@/components/LoginForm'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'

const login: FC = () => {
  return (
    <div className='absolute inset-0'>
      <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
        <Link href='/' className={cn(buttonVariants({ variant: 'ghost' }), 'self-start -mt-36')}>
          <ChevronLeft className='mr-2 h-4 w-4 ' />
          Home
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}

export default login
