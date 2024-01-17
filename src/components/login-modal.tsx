import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import AuthButton from './AuthButton'

export default function LoginModal() {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className='w-full max-w-[400px] rounded-md'>
        <DialogHeader>
          <DialogTitle>
            <h2 className=' font-semibold tracking-tight transition-colors'>Welcome Back 👋</h2>
          </DialogTitle>
        </DialogHeader>
        <AuthButton />
      </DialogContent>
    </Dialog>
  )
}
