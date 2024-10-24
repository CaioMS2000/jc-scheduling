import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const bodySchema = z.object({
    client: z.string(),
    username: z.string(),
    date: z.string(),
    time: z.number(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { client, username, date, time } = bodySchema.parse(body)
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

        const scheduleDate = new Date(date)
        scheduleDate.setHours(time, 0, 0)

        const newSchedule = await prisma.scheduling.create({
            data: {
                clientName: client,
                date: scheduleDate,
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
