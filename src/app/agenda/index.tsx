'use client'
import { InputElement, InputIcon, InputRoot } from '@/components/input'
import { Calendar, LoaderCircle, Sun } from 'lucide-react'
import { workingPeriodLabels, workingHours } from '../constants'
import { PeriodBox } from './components/periodBox'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Skeleton } from '@/components/ui/skeleton'
import { secondsToMilliseconds } from '../utils'

dayjs.locale(ptBR)

export interface Schedule {
    clientName: string
    createdAt: string
    date: Date
    id: string
    updatedAt: string
    userId: string
}

export default function Agenda() {
    const usernameCookie = getCookie('@jc-scheduling:username')
    const [selectedDate, setSelectedDate] = useState(
        dayjs().format().split('T')[0]
    )
    const {
        data: schedules,
        isPending,
        isFetching,
        error,
    } = useQuery({
        queryKey: ['schedules', selectedDate],
        queryFn: async () => {
            console.log('fetching')
            console.log(selectedDate)
            const response = await fetch(
                `/system/getSchedules?username=${usernameCookie}&date=${selectedDate}&timezoneOffset=${new Date().getTimezoneOffset() / 60}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            const { schedules }: { schedules: Array<any> } =
                await response.json()
            const res: Schedule[] = schedules.map(schedule => ({
                ...schedule,
                date: new Date(schedule.date),
            }))

            return res
        },
        enabled: Boolean(usernameCookie) && Boolean(selectedDate),
        // staleTime: Number.POSITIVE_INFINITY,
        // staleTime: secondsToMilliseconds(60 * 5), // 5 minutes
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value)
    }

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])
    
    useEffect(() => {
        console.log('client timezoneOffset', new Date().getTimezoneOffset()/60)
    })

    return (
        <>
            <div className="bg-zinc-900 w-full max-w-[498px] p-10 flex flex-col gap-2 md:rounded-xl md:min-h-screen md:flex-1 md:max-w-[800px]">
                <header className="flex flex-col gap-2 mb-10 md:flex-row md:justify-between">
                    <span>
                        <h2 className="text-xl">
                            <strong>Sua agenda</strong>
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Consulte seus agendamentos por dia
                        </p>
                    </span>
                    <InputRoot className="p-2">
                        <InputIcon>
                            <Calendar
                                size={40}
                                className="text-styles-purple"
                            />
                        </InputIcon>
                        <InputElement
                            type="date"
                            value={selectedDate}
                            onChange={handleChange}
                        />
                    </InputRoot>
                </header>
                <main className="flex-1 flex flex-col gap-3">
                    {(isFetching || isPending) && (
                        <>
                            {/* <LoaderCircle
                                size={40}
                                className="animate-spin mx-auto"
                            /> */}
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col border border-zinc-700 rounded-md text-muted-foreground"
                                >
                                    <header className="w-full flex justify-between items-center p-2 border-b-[1px] border-zinc-700">
                                        <Skeleton className="w-48 h-5 rounded-full bg-muted/25" />
                                    </header>
                                    <div className="flex p-2 alint-center">
                                        <Skeleton className="w-20 h-5 rounded-full bg-muted/25" />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    {!isFetching && !isPending && (
                        Array.isArray(schedules) &&
                        workingPeriodLabels.map((period, i) => {
                            const workingHoursOfPeriod = workingHours[i]
                            const schedulesOfPeriod = schedules.filter(
                                schedule =>
                                    workingHoursOfPeriod.includes(
                                        schedule.date.getHours()
                                    )
                            )

                            return (
                                <PeriodBox
                                    key={period}
                                    period={period}
                                    schedules={schedulesOfPeriod}
                                />
                            )
                        })
                    )}
                </main>
            </div>
        </>
    )
}
