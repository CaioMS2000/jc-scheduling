import Image from 'next/image'
import Agenda from './agenda'
import Schedule from './schedule'

export default function Home() {
    return (
        <>
            <div className="flex min-h-screen flex-col bg-zinc-900 max-w-[1500px] mx-auto items-center gap-2 font-catamaran md:justify-center md:flex-row md:p-2 md:items-start">
                <Image
                    alt=''
                    src={'/images/small-logo-fill.png'}
                    width="0"
                    height="0"
                    sizes="100px"
                    className="absolute top-0 left-0 m-2 w-8 md:w-12"
                />
                <Schedule />
                <Agenda />
            </div>
        </>
    )
}
