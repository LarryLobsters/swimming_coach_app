import type { Day } from '@prisma/client'
import { formatISO } from 'date-fns'
import { type FC, useState, useMemo, useCallback } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { now } from 'src/constants/config'
import { capitalize, classNames, weekdayIndexToName } from '@/utils/helper'
import { trpc } from '@/utils/api'
import { prisma } from '../../server/db'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'

const TimeSelector = dynamic(() => import('@/components/TimeSelector'))
const Switch = dynamic(() => import('@headlessui/react').then((mod) => mod.Switch))
const Calendar = dynamic(() => import('react-calendar'))

interface OpeningProps {
  days: Day[]
}

const Opening: FC<OpeningProps> = ({ days }) => {
  const [enabled, setEnabled] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const initialOpeningHrs = useMemo(
    () =>
      days.map((day, index) => ({
        id: String(index),
        name: weekdayIndexToName(index),
        dayOfWeek: index,
        openTime: day?.openTime,
        closeTime: day?.closeTime
      })),
    [days]
  )

  // create a state variable with the opening hours(initial value)
  const [openingHrs, setOpeningHrs] = useState(initialOpeningHrs)
  // tRPC
  const { mutate: saveOpeningHrs, isLoading } = trpc.opening.changeOpeningHours.useMutation({
    onSuccess: () => toast.success('Opening hours saved'),
    onError: () => toast.error('Something went wrong')
  })
  const { mutate: closeDay } = trpc.opening.closeDay.useMutation({
    onSuccess: () => refetch()
  })
  const { mutate: openDay } = trpc.opening.openDay.useMutation({
    onSuccess: () => refetch()
  })
  const { data: closedDays, refetch } = trpc.opening.getClosedDays.useQuery()

  const dayIsClosed = selectedDate && closedDays?.includes(formatISO(selectedDate))

  // Curried for easier usage
  const changeTime = useCallback(
    (day: Day, time: string, type: 'openTime' | 'closeTime') => {
      const index = openingHrs.findIndex((x) => x.name === weekdayIndexToName(day.dayOfWeek))
      const newOpeningHrs = [...openingHrs] // Create a new copy of openingHrs
      if (newOpeningHrs) {
        newOpeningHrs[index][type] = time // Update the specific time value
        setOpeningHrs(newOpeningHrs) // Update the state with the new array
      }
    },
    [openingHrs]
  )

  return (
    <div className='mx-auto max-w-xl'>
      <Toaster />
      <div className='pt-12 flex justify-center gap-6'>
        <p className={`${!enabled ? 'font-medium' : ''}`}>Store Hours</p>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? 'bg-slate-800' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          )}
        >
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
        <p className={`${enabled ? 'font-medium' : ''}`}>Opening days</p>
      </div>

      {!enabled ? (
        <div className='my-12 flex flex-col gap-8'>
          {days.map((day) => (
            <div className='grid grid-cols-3 place-items-center' key={day.id}>
              <h3 className='font-semibold'>{weekdayIndexToName(day.dayOfWeek)}</h3>
              <div className='mx-4'>
                <TimeSelector
                  type='openTime'
                  changeTime={(time) => changeTime(day, time, 'openTime')}
                  selected={openingHrs.find((x) => x.name === weekdayIndexToName(day.dayOfWeek))?.openTime}
                />
              </div>
              <div className='mx-4'>
                <TimeSelector
                  type='closeTime'
                  changeTime={(time) => changeTime(day, time, 'closeTime')}
                  selected={openingHrs.find((x) => x.name === weekdayIndexToName(day.dayOfWeek))?.closeTime}
                />
              </div>
            </div>
          ))}
          <Button
            onClick={() => {
              openingHrs.map((day) => ({
                dayOfWeek: day.dayOfWeek,
                openTime: day.openTime,
                closeTime: day.closeTime
              }))
              saveOpeningHrs
            }}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      ) : (
        <div className='mt-6 flex flex-col items-center gap-6'>
          <Calendar
            minDate={now}
            className='REACT-CALENDAR p-2'
            view='month'
            onClickDay={(date) => setSelectedDate(date)}
            tileClassName={({ date }) => {
              return closedDays?.includes(formatISO(date)) ? 'closed-day' : null
            }}
          />
          <Button
            onClick={() => {
              if (dayIsClosed) openDay({ date: selectedDate })
              else if (selectedDate) closeDay({ date: selectedDate })
            }}
            disabled={!selectedDate}
            isLoading={isLoading}
          >
            {dayIsClosed ? 'Open shop this day' : 'Close shop this day'}
          </Button>
        </div>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const days = await prisma.day.findMany()

  if (days.length !== 7) {
    throw new Error('Insert all days into the database')
  }

  return { props: { days } }
}

export default Opening
