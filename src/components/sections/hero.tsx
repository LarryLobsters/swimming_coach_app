import Link from 'next/link'
import { BrandIcons } from '@/components/sections/brand-icons'
import { buttonVariants } from '@/components/ui/button'
import Icons from '../icons'
import { Label } from '../ui/label'

export default function Hero() {
  return (
    <section>
      <div className='container flex w-full flex-col items-center justify-center space-y-20 py-16 md:py-20 lg:py-24 xl:py-28'>
        <div className='mx-auto w-full max-w-2xl '>
          <Link
            href='https://twitter.com/'
            title='Follow Updates'
            target='_blank'
            rel='noreferrer'
            className='mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors duration-300 hover:bg-blue-200'
          >
            <Icons.twitter className='h-5 w-5 text-blue-700' />
            <Label className='text-sm font-semibold text-blue-700'>Swimmers Club</Label>
          </Link>

          <h1 className='text-balance bg-gradient-to-br from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-center font-heading text-[40px] font-bold leading-tight tracking-[-0.02em] text-transparent  drop-shadow-sm duration-300 ease-linear [word-spacing:theme(spacing.3)] md:text-7xl md:leading-[5rem] dark:bg-gradient-to-br dark:from-gray-100 dark:to-gray-900 mb-16'>
            iYamSwimCoach
          </h1>

          <div className='mx-auto mt-6 flex items-center justify-center space-x-5'>
            <Link className={buttonVariants() + ' gap-x-2'} href='/dashboard'>
              Get Started
            </Link>
            <Link
              className={buttonVariants({ variant: 'outline' }) + ' gap-x-2'}
              href='https://github.com/LarryLobsters/swimming_coach_app'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='font-medium'>Github Repo</span>

              <Icons.gitHub width={16} />
            </Link>
          </div>
        </div>
        <div className='w-full '>
          <h2 className='my-12 text-center text-2xl font-semibold tracking-tight transition-colors'>
            {'Built with amazing tools '}
          </h2>
          <div className='flex w-full flex-wrap items-center justify-center gap-x-20 gap-y-10 '>
            {tools.map((t, i) => (
              <Link key={i} href={t.link} target='_blank'>
                <t.icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const tools = [
  {
    link: 'https://www.typescriptlang.org/',
    icon: BrandIcons.ts
  },
  {
    link: 'https://nextjs.org/',
    icon: BrandIcons.nextjs
  },
  {
    link: 'https://tailwindcss.com/',
    icon: BrandIcons.tailwind
  },
  {
    link: 'https://www.prisma.io/',
    icon: BrandIcons.prisma
  },
  {
    link: 'https://vercel.com/',
    icon: BrandIcons.vercel
  }
]
