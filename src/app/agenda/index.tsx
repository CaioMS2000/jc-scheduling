'use client'
import { InputElement, InputIcon, InputRoot } from '@/components/input'
import { Calendar } from 'lucide-react'
import { workingPeriodLabels, workingHours } from '../constants'
import { PeriodBox } from './components/periodBox'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getCookie } from 'cookies-next'

export interface Schedule {
    clientName: string;
    createdAt: string;
    date: Date;
    id: string;
    updatedAt: string;
    userId: string;
  }

  
export default function Agenda() {
    const usernameCookie = getCookie('@jc-scheduling:username')
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const {data: schedules, isPending, isFetching} = useQuery({queryKey: ['schedules', selectedDate], queryFn: async () => {
        const response = await fetch(`/system/getSchedules?username=${usernameCookie}&date=${selectedDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const {schedules}: { schedules: Array<any> } = await response.json()
        const res: Schedule[] = schedules.map(schedule => ({...schedule, date: new Date(schedule.date)}))

        return res
    }, enabled: Boolean(usernameCookie) && Boolean(selectedDate)})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        console.log(event.target.value);
      };


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
                    {schedules && workingPeriodLabels.map((period, i) => {
                        const workingHoursOfPeriod = workingHours[i]
                        const schedulesOfPeriod = schedules.filter(schedule => workingHoursOfPeriod.includes(schedule.date.getHours()))

                        return (
                            <PeriodBox
                                key={period}
                                period={period}
                                schedules={schedulesOfPeriod}
                                className=""
                            ></PeriodBox>
                        )
                    })}
                </main>
            </div>
        </>
    )
}
