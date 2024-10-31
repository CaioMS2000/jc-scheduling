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
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { client, username, date, time } = bodySchema.parse(body)
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

        return NextResponse.json({newSchedule})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, {
                status: 400,
            })
        }

        throw error
    }
}
