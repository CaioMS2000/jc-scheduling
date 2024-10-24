import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const querySchema = z.object({
    username: z.string(),
    date: z.string(),
})

export async function GET(request: NextRequest) {
    try {
        const { username, date } = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams))
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

        const startOfDay = new Date(date);
        const endOfDay = new Date(date);

        startOfDay.setHours(0, 0, 0, 0);
        endOfDay.setHours(23, 59, 59, 999);

        const schedules = await prisma.scheduling.findMany({
            where: {
                userId: user.id,
                date:{
                    gte: startOfDay,
                    lte: endOfDay
                }
            },

        })

        return NextResponse.json({schedules})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, {
                status: 400,
            })
        }

        throw error
    }
}
