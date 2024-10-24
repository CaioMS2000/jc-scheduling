import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const usernameCookie = cookieStore.get('@jc-scheduling:username')
    
    if(!usernameCookie) return NextResponse.redirect(new URL('/user', request.url));
    
    console.log('middleware acessado por: ', usernameCookie?.value)
    //   return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: '/',
}
