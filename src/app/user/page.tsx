'use client'
import Image from 'next/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import UsernameInput from './components/usernameInput'
import PasswordInput from './components/passwordInput'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.locale(ptBR)

const userFormSchema = z.object({
    username: z.string(),
    password: z.string(),
})

type UserFormData = z.infer<typeof userFormSchema>

function User() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const username = searchParams.get('username')
    const { register, handleSubmit, setValue, reset } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
    })

    async function handleRegister(data: UserFormData) {
        try {
            const response = await fetch('/system/register', {
                method: 'POST',
                body: JSON.stringify({
                    password: data.password,
                    username: data.username,
                }),
            })

            reset({password: ''})

            if(response.redirected && response.url) {
                router.push(response.url)
            }
        } catch (error) {
            console.warn(error)
        }
    }

    async function handleLogin(data: UserFormData) {
        try {
            const response = await fetch('/system/auth', {
                method: 'POST',
                body: JSON.stringify({
                    password: data.password,
                    username: data.username,
                }),
            })

            if(response.redirected && response.url) {
                router.push(response.url)
            }
        } catch (error) {
            console.warn(error)
        }
    }

    useEffect(() => {        
        if (username) {
            setValue('username', username)
        }
    }, [username, setValue])

    return (
        <>
            <div className="flex h-screen w-screen max-w-[1500px] mx-auto justify-center items-center bg-zinc-900 font-catamaran text-lg">
                <Card className="bg-zinc-800 border-transparent w-64 md:w-96">
                    <CardHeader>
                        <CardTitle className="justify-center flex">
                            <Image
                                alt=""
                                src={'/images/small-logo-fill.png'}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-28 h-28"
                            />
                        </CardTitle>
                        <CardDescription className="text-center text-lg">
                            <strong>Crie seu cadastro</strong>
                        </CardDescription>
                    </CardHeader>
                    <form>
                        <CardContent className="justify-center flex flex-col gap-3">
                            <UsernameInput
                                hookFormReference={register('username')}
                            />
                            <PasswordInput
                                hookFormReference={register('password')}
                            />
                        </CardContent>
                        <CardFooter className="justify-center gap-5">
                            <Button
                                className="bg-transparent border-2 border-styles-purple"
                                type="button"
                                onClick={handleSubmit(handleRegister)}
                            >
                                <strong>Registrar</strong>
                            </Button>
                            <Button
                                className="bg-styles-purple hover:bg-styles-purple-dark"
                                type="button"
                                onClick={handleSubmit(handleLogin)}
                            >
                                <strong>Entrar</strong>
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default function Component() {
    return (
        <Suspense>
            <User />
        </Suspense>
    )
}