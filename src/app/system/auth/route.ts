import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { authenticate } from '../../../../functions/authenticate'

const bodySchema = z.object({
    password: z.string(),
    username: z.string(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { password, username } = bodySchema.parse(body)

        if (!username || !password) {
            return NextResponse.json('Missing username or password', {
                status: 400,
            })
        }

        const {user} = await authenticate({ password, username })
        const cookieStore = await cookies()

        cookieStore.set({
            name: '@jc-scheduling:username',
            value: username,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        })

        return NextResponse.redirect(new URL('/', 'http://localhost:3000'))
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, {
                status: 400,
            })
        }

        throw error
    }
}
