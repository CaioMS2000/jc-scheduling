import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.locale(ptBR)

const querySchema = z.object({
    username: z.string(),
    date: z.string(),
    timezoneOffset: z.string(),
})

export async function GET(request: NextRequest) {
    try {
        console.log(request)
        console.log("\n\n\n")
        console.log('server timezoneOffset', new Date().getTimezoneOffset()/60)
        const { username, date, timezoneOffset } = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams))
        console.log('timezoneOffset from client', timezoneOffset)
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

        const startOfDay = dayjs(date).set('hour', 0).set('minute', 0).set('second', 0)
        const endOfDay = dayjs(date).set('hour', 23).set('minute', 59).set('second', 59)
        const referenceTimezoneOffset = new Date().getTimezoneOffset() / 60
        console.log('again', referenceTimezoneOffset)
        const schedules = await prisma.scheduling.findMany({
            where: {
                userId: user.id,
                date:{
                    gte: startOfDay.toDate(),
                    lte: endOfDay.toDate()
                }
            },

        })
        const diffTimezoneOffset = Number(timezoneOffset) - referenceTimezoneOffset
        const diffIsPositive = diffTimezoneOffset > 0

        return NextResponse.json({schedules: schedules.map((schedule) => {
            const corredtedDate = diffIsPositive ? dayjs(schedule.date).add(diffTimezoneOffset, 'hour') : dayjs(schedule.date).subtract(diffTimezoneOffset * (-1), 'hour')

            console.log('corredtedDate')
            console.log(corredtedDate.format())
            console.log(corredtedDate.toDate())
            return {...schedule, date: corredtedDate.toDate()}
        })})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, {
                status: 400,
            })
        }

        throw error
    }
}
