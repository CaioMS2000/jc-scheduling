import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { workingHours, workingPeriodLabels } from '../constants'
import { Button } from '@/components/ui/button'
import { Calendar, SquareUser } from 'lucide-react'
import { InputElement, InputIcon, InputRoot } from '@/components/input'

export default function Schedule() {
    return (
        <>
            <form className="bg-zinc-800 w-full max-w-[498px] p-10 flex flex-col gap-2 md:rounded-b-xl">
                <h2 className="text-lg mb-5">
                    <strong>Agende um atendimento</strong>
                </h2>
                <Label className="text-zinc-300 flex flex-col gap-2 mb-5">
                    <p>
                        <strong>Data</strong>
                    </p>
                    <InputRoot className="p-2">
                        <InputIcon>
                            <Calendar size={40}
                                className="text-styles-yellow" />
                        </InputIcon>
                        <InputElement type='date' defaultValue={new Date().toISOString().split('T')[0]} />
                    </InputRoot>
                </Label>
                <div className="flex flex-col gap-3 justify-center mb-5">
                    <h3>
                        <strong>Horários</strong>
                    </h3>
                    {workingHours.map((period, i) => (
                        <div key={i} className="d">
                            <p className="text-zinc-500">
                                {workingPeriodLabels[i]}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {period.map(hour => (
                                    <Button
                                        key={hour}
                                        className="bg-zinc-700 border-2 border-zinc-500 font-light w-16 lg:w-20 focus:border-styles-yellow focus:text-styles-yellow"
                                    >
                                        {hour} : 00
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Label className="text-zinc-300 flex flex-col gap-2 mb-5">
                    <p className="mb-2">
                        <strong>Cliente</strong>
                    </p>
                    <InputRoot className="p-2">
                        <InputIcon>
                            <SquareUser
                                size={40}
                                className="text-styles-yellow"
                            />
                        </InputIcon>
                        <InputElement placeholder="Nome do cliente" />
                    </InputRoot>
                </Label>
                <Button type="submit" className="bg-styles-yellow text-black">
                    <strong>AGENDAR</strong>
                </Button>
            </form>
        </>
    )
}

// export const CalendarDay = styled('button', {
//     all: 'unset',
//     width: '100%',
//     aspectRatio: '1 / 1',
//     background: '$gray600',
//     textAlign: 'center',
//     cursor: 'pointer',
//     borderRadius: '$sm',

//     '&:disabled': {
//       background: 'none',
//       cursor: 'default',
//       opacity: 0.4,
//     },

//     '&:not(:disabled):hover': {
//       background: '$gray500',
//     },

//     '&:focus': {
//       boxShadow: '0 0 0 2px $colors$gray100',
//     },
//   })

// export const TimePickerItem = styled('button', {
//     border: 0,
//     backgroundColor: '$gray600',
//     padding: '$2 0',
//     cursor: 'pointer',
//     color: '$gray100',
//     borderRadius: '$sm',
//     fontSize: '$sm',
//     lineHeight: '$base',

//     '&:last-child': {
//       marginBottom: '$6',
//     },

//     '&:disabled': {
//       background: 'none',
//       cursor: 'default',
//       opacity: 0.4,
//     },

//     '&:not(:disabled):hover': {
//       background: '$gray500',
//     },

//     '&:focus': {
//       boxShadow: '0 0 0 2px $colors$gray100',
//     },
//   })
