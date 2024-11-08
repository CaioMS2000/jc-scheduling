import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

const bodySchema = z.object({
    client: z.string(),
    username: z.string(),
    date: z.string(),
    time: z.string(),
    timezoneOffset: z.number(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { client, username, date, time, timezoneOffset } = bodySchema.parse(body)
        const [hour, minute] = time.split(':')
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        })

        if (!user) {
            return NextResponse.json('User not found', {
                status: 400,
            })
        }

        const scheduleDate = dayjs(date).set('hour', +hour).set('minute', +minute)
        const newSchedule = await prisma.scheduling.create({
            data: {
                clientName: client,
                date: scheduleDate.toDate(),
                userId: user.id,
            }
        })
        const referenceTimezoneOffset = new Date().getTimezoneOffset() / 60
        const diffTimezoneOffset = Number(timezoneOffset) - referenceTimezoneOffset
        const diffIsPositive = diffTimezoneOffset > 0
        const corredtedDate = diffIsPositive ? dayjs(newSchedule.date).add(diffTimezoneOffset, 'hour') : dayjs(newSchedule.date).subtract(diffTimezoneOffset * (-1), 'hour')

        return NextResponse.json({newSchedule: {...newSchedule, date: corredtedDate.toDate()}})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, {
                status: 400,
            })
        }

        throw error
    }
}
