import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { register } from '../../../../functions/register'

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

        const {newUser} = await register({ password, username })

        return NextResponse.redirect(new URL(`/user?username=${newUser.username}`, request.url), 303)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message, {
                status: 400,
            })
        }

        throw error
    }
}
