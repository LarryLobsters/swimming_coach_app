import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import SidebarNav from '@/components/sidebar-nav'

interface DashboardProps {
  children: React.ReactNode
}
export default function Dashboard({ children }: DashboardProps) {
  return (
    <div className='container mt-36 border'>
      <div className='flex min-h-[calc(100vh-140px)] flex-col gap-8 py-8 md:min-h-[calc(100vh-160px)] lg:flex-row 2xl:gap-12'>
        <aside className='lg:w-1/5'>
          <SidebarNav />
        </aside>
        <div className='w-full'>{children}</div>
        <Link
          className={
            buttonVariants({
              variant: 'outline'
            }) + 'rounded-md p-2'
          }
          href='/dashboard/opening'
        >
          Opening hours
        </Link>
        <Link
          className={
            buttonVariants({
              variant: 'outline'
            }) + 'rounded-md p-2'
          }
          href='/dashboard/menu'
        >
          Menu
        </Link>
      </div>
    </div>
  )
}
