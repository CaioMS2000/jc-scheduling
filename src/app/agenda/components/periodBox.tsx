import * as React from 'react'
import { cn } from '@/lib/utils'
import { CloudSun, Moon, Sun } from 'lucide-react'
import { workingHours, workingPeriodLabels } from '@/app/constants'
import { Schedule } from '..'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import PeriodRow from './periodRow'

dayjs.locale(ptBR)

type Period = (typeof workingPeriodLabels)[number]

export interface PeriodBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    period: Period
    schedules: Schedule[]
}

const periodIconsOptions = [Sun, CloudSun, Moon]

const PeriodBox = React.forwardRef<HTMLDivElement, PeriodBoxProps>(
    ({ className, period, schedules, ...props }, ref) => {
        const periodIndex = workingPeriodLabels.indexOf(period)
        const PeriodIcon = periodIconsOptions[periodIndex]
        const periodAllHours = workingHours[periodIndex]
        const [firstHour, lastHour] = [
            periodAllHours[0],
            periodAllHours[periodAllHours.length - 1],
        ]

        return (
            <div
                className={cn(
                    'flex flex-col border border-zinc-700 rounded-md text-muted-foreground',
                    className
                )}
                ref={ref}
                {...props}
            >
                <header className="w-full flex justify-between items-center p-2 border-b-[1px] border-zinc-700">
                    <span className="inline-flex items-center gap-2">
                        <PeriodIcon className="text-styles-purple" />
                        {period}
                    </span>
                    <p>
                        {firstHour.toString().padStart(2, '0')}h-
                        {lastHour.toString().padStart(2, '0')}h
                    </p>
                </header>
                <section className="p-5 flex flex-col gap-2">
                    {schedules
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map(schedule => {
                            return (
                                <PeriodRow
                                    key={schedule.id}
                                    schedule={schedule}
                                />
                            )
                        })}
                </section>
            </div>
        )
    }
)
PeriodBox.displayName = 'PeriodBox'

export { PeriodBox }
