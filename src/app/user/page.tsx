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

export default function Register() {
    return (
        <>
            <div className="flex h-screen w-screen max-w-[1500px] mx-auto justify-center items-center bg-zinc-900 font-catamaran text-lg">
                <Card className="bg-zinc-800 border-transparent w-64 md:w-96">
                    <CardHeader>
                        <CardTitle className="justify-center flex">
                            <Image
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
                            <UsernameInput />
                            <PasswordInput />
                        </CardContent>
                        <CardFooter className="justify-center gap-5">
                            <Button className="bg-transparent border-2 border-styles-purple">
                                <strong>Registrar</strong>
                            </Button>
                            <Button className="bg-styles-purple hover:bg-styles-purple-dark">
                                <strong>Entrar</strong>
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}
