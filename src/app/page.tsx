import Agenda from './agenda'
import Schedule from './schedule'

export default function Home() {
    return (
        <>
            {/* <div className="flex h-screen flex-col items-center md:justify-center md:flex-row bg-zinc-900 max-w-[1500px] mx-auto"> */}
            <div className="flex h-screen flex-col bg-zinc-900 max-w-[1500px] mx-auto items-center">
                <Schedule />
                <Agenda />
            </div>
        </>
    )
}
