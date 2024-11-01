import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

const bodySchema = z.object({
    scheduleId: z.string(),
    username: z.string(),
})

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json()
        const { scheduleId, username } = bodySchema.parse(body)
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
        
        const schedule = await prisma.scheduling.delete({
            where: {
                id: scheduleId,
                user:{
                    username,
                }
            },
        })

        if (!schedule) {
            return NextResponse.json('Deletion failed', {status: 400})
        }

        return new NextResponse(null, {status: 204})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, {
                status: 400,
            })
        }

        throw error
    }
}
