import { InputElement, InputIcon, InputRoot } from '@/components/input'
import { Calendar } from 'lucide-react'
import { workingPeriodLabels } from '../constants'
import { PeriodBox } from './periodBox'

export default function Agenda() {
    return (
        <>
            <div className="bg-zinc-900 w-full max-w-[498px] p-10 flex flex-col gap-2 md:rounded-xl md:min-h-screen md:flex-1 md:max-w-[800px]">
                <header className='flex flex-col gap-2 mb-10 md:flex-row md:justify-between'>
                    <span>
                        <h2 className='text-xl'>
                            <strong>Sua agenda</strong>
                        </h2>
                        <p className='text-sm text-muted-foreground'>Consulte seus agendamentos por dia</p>
                    </span>
                    <InputRoot className="p-2">
                        <InputIcon>
                            <Calendar
                                size={40}
                                className="text-styles-yellow"
                            />
                        </InputIcon>
                        <InputElement
                            type="date"
                            defaultValue={
                                new Date().toISOString().split('T')[0]
                            }
                        />
                    </InputRoot>
                </header>
                <main className='flex-1 flex flex-col gap-3'>
                    {workingPeriodLabels.map((period, i) => {
                        return <PeriodBox key={period} period={period} className=""></PeriodBox>
                    })}
                </main>
            </div>
        </>
    )
}
