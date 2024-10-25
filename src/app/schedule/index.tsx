'use client'
import { Label } from '@/components/ui/label'
import { workingHours, workingPeriodLabels } from '../constants'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { InputElement, InputIcon, InputRoot } from '@/components/input'
import UsernameInput from './components/usernameInput'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import TimeButton from './components/timeButton'
import { queryClient } from '@/lib/react-query'
import { Schedule } from '../agenda'

const scheduleFormSchema = z.object({
    date: z.string({ message: 'date is missing' }),
    time: z.number({ message: 'time is missing' }).min(8).max(20),
    client: z
        .string({ message: 'client is missing' })
        .min(3, { message: 'client name is too short' }),
})

type ScheduleFormData = z.infer<typeof scheduleFormSchema>

export default function ScheduleComponent() {
    const [selectedHour, setSelectedHour] = useState<undefined | number>(
        undefined
    )
    const usernameCookie = getCookie('@jc-scheduling:username')
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleFormSchema),
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
            time: 0,
            client: '',
        },
    })

    async function handleCreateSchedule(data: ScheduleFormData) {        
        try {
            const response = await fetch('/system/makeSchedule', {
                method: 'POST',
                body: JSON.stringify({ ...data, username: usernameCookie }),
            })
            
            reset({client: '', time: 0})
            setSelectedHour(undefined)

            const { newSchedule } = await response.json()

            queryClient.setQueryData(['schedules', data.date], (cache: Array<Schedule>|undefined) => {
                if (!cache) {
                    return []
                }

                const res: Array<Schedule> = [...cache, {clientName: newSchedule.clientName, createdAt: newSchedule.createdAt, id: newSchedule.id, updatedAt: newSchedule.updatedAt, userId: newSchedule.userId, date: new Date(newSchedule.date)}]

                return res
            })
        } catch (error) {
            console.warn(error)
        }
    }

    useEffect(() => {
        console.warn('errors')
        console.warn(errors)
    }, [errors])

    return (
        <>
            <form
                onSubmit={handleSubmit(handleCreateSchedule)}
                className="bg-zinc-800 w-full max-w-[498px] p-10 flex flex-col gap-2 md:rounded-xl md:h-full"
            >
                <h2 className="text-lg mb-5">
                    <strong>Agende um atendimento</strong>
                </h2>
                <Label className="text-zinc-400 flex flex-col gap-2 mb-5">
                    <p>
                        <strong>Data</strong>
                    </p>
                    <InputRoot className="p-2 max-w-60">
                        <InputIcon>
                            <Calendar
                                size={40}
                                className="text-styles-purple"
                            />
                        </InputIcon>
                        <InputElement type="date" {...register('date')} />
                    </InputRoot>
                </Label>
                <div className="flex flex-col gap-3 justify-center mb-5">
                    <h3>
                        <strong>Horários</strong>
                    </h3>
                    {workingHours.map((period, i) => (
                        <div key={i} className="d">
                            <p className="text-zinc-500">
                                {workingPeriodLabels[i]}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {period.map(hour => (
                                    <Controller
                                        key={hour}
                                        control={control}
                                        name="time"
                                        render={({ field }) => {
                                            return (
                                                <TimeButton
                                                    onClick={() => {
                                                        field.onChange(hour)
                                                    }}
                                                    isSelected={
                                                        selectedHour === hour
                                                    }
                                                    hour={hour}
                                                    onSelectTime={
                                                        setSelectedHour
                                                    }
                                                >
                                                    {hour} : 00
                                                </TimeButton>
                                            )
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Label className="text-zinc-300 flex flex-col gap-2 mb-5">
                    <p className="mb-2">
                        <strong>Cliente</strong>
                    </p>
                    <UsernameInput hookFormReference={register('client')} />
                </Label>
                <Button type="submit" className="bg-styles-purple text-white">
                    <strong>AGENDAR</strong>
                </Button>
            </form>
        </>
    )
}
