import { useRouter } from 'next/router'
import { useState, type ChangeEvent, type FC } from 'react'

import Image from 'next/image'
import Logo from '../../public/iYamTransparent.png'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Card, CardHeader } from './ui/card'
import AuthGithubButton from './AuthGithubButton'
import AuthGoogleButton from './AuthGoogleButton'
import { api } from '@/utils/api'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const LoginForm = () => {
  const router = useRouter()

  const { mutate: login, error } = api.admin.login.useMutation({
    onSuccess: () => {
      router.push('/dashboard')
    }
  })

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Card className='p-6 bg-slate-500'>
      <div className='flex flex-col space-y-2 text-center'>
        <CardHeader>
          <Image className='mx-auto h-12 w-auto' src={Logo} alt='Logo' height={100} width={100} />
          <h2 className='mt-6 text-center text-3xl font-bold text-zinc-300'>Sign in to your account</h2>
        </CardHeader>
        <div className='flex flex-col gap-3'>
          <AuthGithubButton />
          <AuthGoogleButton />
        </div>
        <form className='mt-8 space-y-6'>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='-space-y-px rounded-md shadow-sm'>
            <p className='pb-1 text-sm text-red-600'>{error && 'Invalid login credentials'}</p>
            <div className='flex flex-col gap-1 '>
              <Label htmlFor='email-address' className='sr-only'>
                Email address
              </Label>
              <Input
                id='email-address'
                name='email'
                type='email'
                value={input.email}
                onChange={handleChange}
                autoComplete='email'
                required
                placeholder='Email address'
              />

              <Label htmlFor='password' className='sr-only'>
                Password
              </Label>
              <Input
                id='password'
                name='password'
                type='password'
                value={input.password}
                onChange={handleChange}
                autoComplete='current-password'
                required
                placeholder='Password'
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center w-full justify-end'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
              />
              <Label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                Remember me
              </Label>
            </div>
          </div>

          <div>
            <div className='flex items-centerjustify-between '>
              <Button
                className='w-full'
                type='submit'
                onClick={(e) => {
                  e.preventDefault()
                  login(input)
                }}
              >
                Sign in by email
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  )
}

export default LoginForm
