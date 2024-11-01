import { getCookie } from 'cookies-next'
import { Schedule } from '..'
import { toast } from 'sonner'
import { queryClient } from '@/lib/react-query'
import dayjs from 'dayjs'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface PeriodRowProps extends React.HTMLAttributes<HTMLDivElement> {
    schedule: Schedule
}

export default function PeriodRow({ schedule, ...props }: PeriodRowProps) {
    const [isBeingDeleteed, setIsBeingDeleteed] = useState(false)
    const hour = dayjs(schedule.date).get('hour').toString().padStart(2, '0')
    const minute = dayjs(schedule.date)
        .get('minute')
        .toString()
        .padStart(2, '0')
    async function handleDeleteSchedule(schedule: Schedule) {
        setIsBeingDeleteed(true)
        const usernameCookie = getCookie('@jc-scheduling:username')

        if (!usernameCookie) {
            return toast.error('Falha ao deletar agendamento')
        }

        const response = await fetch('/system/deleteSchedule', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                scheduleId: schedule.id,
                username: usernameCookie,
            }),
        })

        if (!response.ok) {
            return toast.error('Falha ao deletar agendamento')
        }

        queryClient.setQueryData(
            ['schedules', dayjs(schedule.date).format().split('T')[0]],
            (cache: Array<Schedule> | undefined) => {
                if (!cache) {
                    return cache
                }

                const res: Array<Schedule> = [
                    ...cache.filter(scdl => scdl.id !== schedule.id),
                ]

                return res
            }
        )

        toast.success('Agendamento deletado com sucesso')
        setIsBeingDeleteed(false)
    }

    return (
        <>
            <div
                className="inline-flex justify-between items-center"
                {...props}
            >
                <div className="inline-flex gap-2">
                    <strong>
                        {hour} : {minute}
                    </strong>
                    <p>{schedule.clientName}</p>
                </div>
                <button onClick={() => handleDeleteSchedule(schedule)}>
                    {!isBeingDeleteed && <Trash2 className="cursor-pointer" />}
                    {isBeingDeleteed && (
                        <LoaderCircle className="animate-spin cursor-not-allowed" />
                    )}
                </button>
            </div>
        </>
    )
}
