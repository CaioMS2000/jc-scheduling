'use client'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar, LoaderCircle } from 'lucide-react'
import { InputElement, InputIcon, InputRoot } from '@/components/input'
import UsernameInput from './components/usernameInput'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { queryClient } from '@/lib/react-query'
import { Schedule } from '../agenda'
import ScheduleTimeInput from './components/scheduleTimeInput'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

const scheduleFormSchema = z.object({
    date: z.string({ message: 'date is missing' }),
    time: z.string({ message: 'time is missing' }),
    client: z
        .string({ message: 'client is missing' })
        .min(3, { message: 'client name is too short' }),
})

type ScheduleFormData = z.infer<typeof scheduleFormSchema>

export default function ScheduleComponent() {
    const usernameCookie = getCookie('@jc-scheduling:username')
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleFormSchema),
        defaultValues: {
            date: dayjs().format().split('T')[0],
            time: '',
            client: '',
        },
    })

    async function handleCreateSchedule(data: ScheduleFormData) {
        try {
            const response = await fetch('/system/makeSchedule', {
                method: 'POST',
                body: JSON.stringify({ ...data, username: usernameCookie }),
            })

            if (!response.ok) {
                throw new Error(`${response.statusText}`)
            }

            reset({ client: '', time: '' })

            const { newSchedule } = await response.json()

            queryClient.setQueryData(
                ['schedules', data.date],
                (cache: Array<Schedule> | undefined) => {
                    if (!cache) {
                        return cache
                    }

                    const res: Array<Schedule> = [
                        ...cache,
                        {
                            clientName: newSchedule.clientName,
                            createdAt: newSchedule.createdAt,
                            id: newSchedule.id,
                            updatedAt: newSchedule.updatedAt,
                            userId: newSchedule.userId,
                            date: new Date(data.date),
                        },
                    ]

                    return res
                }
            )

            toast.success('Agendamento criado')
        } catch (error) {
            toast.error(JSON.stringify(error))
        }
    }

    useEffect(() => {
        const isEmpty = (
            obj: Record<string, unknown> | null | undefined
        ): boolean => {
            return obj != null && Object.keys(obj).length === 0
        }

        if (errors && !isEmpty(errors)) {
            toast.error(JSON.stringify(errors))
        }
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
                    <InputRoot className="p-2 w-52">
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
                        <strong>Horário</strong>
                    </h3>
                    <ScheduleTimeInput hookFormReference={register('time')} />
                </div>
                <Label className="text-zinc-300 flex flex-col gap-2 mb-5">
                    <p className="mb-2">
                        <strong>Cliente</strong>
                    </p>
                    <UsernameInput hookFormReference={register('client')} />
                </Label>
                <Button
                    type="submit"
                    className="bg-styles-purple text-white flex items-center gap-2"
                    disabled={isSubmitting}
                >
                    <strong>AGENDAR</strong>
                    {isSubmitting && (
                        <LoaderCircle size={20} className="animate-spin" />
                    )}
                </Button>
            </form>
        </>
    )
}
