import type { Day } from '@prisma/client'
import { add, format, formatISO, isBefore, parse } from 'date-fns'
// import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { type FC, useEffect, useState } from 'react'
import { now, OPENING_HOURS_INTERVAL } from 'src/constants/config'
import { getOpeningTimes, roundToNearestMinutes } from 'src/utils/helper'
import type { DateTime } from 'src/utils/types'
import { Button } from './ui/button'
import dynamic from 'next/dynamic'

const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false })

interface CalendarProps {
  days: Day[]
  closedDays: string[] // as ISO strings
}

const CalendarComponent: FC<CalendarProps> = ({ days, closedDays }) => {
  const router = useRouter()

  // Determine if today is closed
  const today = days.find((d) => d.dayOfWeek === now.getDay())
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL)
  const closing = parse(today?.closeTime as string, 'hh:mm a', now)
  const tooLate = !isBefore(rounded, closing)
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))

  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null
  })

  useEffect(() => {
    if (date.dateTime) {
      localStorage.setItem('selectedTime', date.dateTime.toISOString())
      router.push('/menu')
    }
  }, [date.dateTime, router])

  const getTimes = () => {
    if (!date.justDate) return

    const { justDate } = date

    const beginning = add(justDate, { hours: 9 })
    const end = add(justDate, { hours: 17 })
    const interval = 30 // in minutes

    const times = []
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i)
    }
    return times
  }

  const times = getTimes()
  console.log(times)
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {date.justDate ? (
        <div className='flex max-w-lg flex-wrap gap-4'>
          {times?.map((time, i) => (
            <div key={`time-${i}`} className='rounded-sm bg-gray-100 p-2'>
              <Button onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))} type='button'>
                {format(time, 'hh:mm aa')}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <DynamicCalendar
          minDate={now}
          className='REACT-CALENDAR p-2'
          view='month'
          onClickDay={(date) => setDate({ justDate: date, dateTime: null })}
          tileClassName={({ date }) => {
            return closedDays?.includes(formatISO(date)) ? 'closed-day' : null
          }}
        />
      )}
    </div>
  )
}

export default CalendarComponent
