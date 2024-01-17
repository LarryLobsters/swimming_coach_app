import CalendarComponent from '@/components/Calendar'
import type { Day } from '@prisma/client'
import { formatISO } from 'date-fns'
import { type NextPage } from 'next'
import Head from 'next/head'
import { prisma } from '@/server/db'
import Hero from '@/components/sections/hero'
// import { trpc } from '@/utils/trpc'

interface HomeProps {
  days: Day[]
  closedDays: string[] // as ISO string
}

const Home: NextPage<HomeProps> = ({ days, closedDays }) => {
  // const hello = trpc.post.hello.useQuery({ text: 'from tRPC' })

  return (
    <>
      <Head>
        <title>iYamSwimCoach</title>
        <meta name='description' content='larryLobsters' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <section className=''>
          <Hero />
        </section>
        <CalendarComponent days={days} closedDays={closedDays} />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const days = await prisma.day.findMany()
  const closedDays = (await prisma.closedDay.findMany()).map((d) => formatISO(d.date))
  return { props: { days, closedDays } }
}

export default Home
