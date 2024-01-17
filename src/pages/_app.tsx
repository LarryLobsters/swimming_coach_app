import { type AppType } from 'next/app'
import { SessionProvider } from 'next-auth/react'
// import { trpc } from 'src/utils/trpc'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Providers } from '@/components/providers'
import '../styles/Calendar.css'
import '../styles/globals.css'
import '../styles/Spinner.css'
import { cn } from '@/lib/utils'
import { Navigation } from '@/components/navigation'
import { type Session } from 'next-auth'
import { api } from '@/utils/api'

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

const fontHeading = localFont({
  src: '../../public/assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
})

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <div
        className={cn(
          'font-sans antialiased bg-slate-300 dark:bg-slate-800 min-h-screen ',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <Providers>
          <div className='pb-20 '>
            <Navigation />
          </div>
          <div className='container max-w-7xl mx-auto'>
            <Component {...pageProps} />
          </div>
        </Providers>
      </div>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
