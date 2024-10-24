import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
    title: 'JG - Agenda',
    description: 'Sistema de agendamento de Jhennifer Gomes',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={'antialiased bg-black text-white tracking-tight'}
                suppressHydrationWarning={true}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
