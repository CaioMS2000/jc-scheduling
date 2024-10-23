import Agenda from './agenda'
import Schedule from './schedule'

export default function Home() {
    return (
        <>
            <div className="flex min-h-screen flex-col bg-zinc-900 max-w-[1500px] mx-auto items-center gap-2 font-catamaran md:justify-center md:flex-row md:p-2 md:items-start">
                <Schedule />
                <Agenda />
            </div>
        </>
    )
}
