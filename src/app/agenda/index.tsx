import { InputElement, InputIcon, InputRoot } from '@/components/input'
import { Calendar } from 'lucide-react'
import { workingPeriodLabels } from '../constants'
import { PeriodBox } from './periodBox'

export default function Agenda() {
    return (
        <>
            <div className="bg-zinc-900 w-full max-w-[498px] p-10 flex flex-col gap-2 md:rounded-b-xl">
                <header className='flex flex-col gap-2 md:flex-row'>
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
                <main>
                    {workingPeriodLabels.map((period, i) => {
                        return <PeriodBox key={period} period={period} className="mb-2"></PeriodBox>
                    })}
                </main>
            </div>
        </>
    )
}
