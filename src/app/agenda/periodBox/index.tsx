import * as React from 'react'
import { cn } from '@/lib/utils'
import { CloudSun, Moon, Sun } from 'lucide-react'
import { workingHours, workingPeriodLabels } from '@/app/constants'

type Period = (typeof workingPeriodLabels)[number]

export interface PeriodBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    period: Period
}

const periodIconsOptions = [Sun, CloudSun, Moon]

const PeriodBox = React.forwardRef<HTMLDivElement, PeriodBoxProps>(
    ({ className, children, period, ...props }, ref) => {
        const periodIndex = workingPeriodLabels.indexOf(period)
        const PeriodIcon = periodIconsOptions[periodIndex]
        const periodAllHours = workingHours[periodIndex]
        const [firstHour, lastHour] = [periodAllHours[0], periodAllHours[periodAllHours.length - 1]]

        return (
            <div
                className={cn('flex flex-col border border-zinc-700 rounded-md text-muted-foreground', className)}
                ref={ref}
                {...props}
            >
                <header className='w-full flex justify-between items-center p-2 border-b-[1px] border-zinc-700'>
                    <span className="inline-flex items-center gap-2">
                        <PeriodIcon className='text-styles-yellow' />
                        {period}
                    </span>
                    <p>{firstHour.toString().padStart(2, '0')}h-{lastHour.toString().padStart(2, '0')}h</p>
                </header>
                <section className='p-5'>
                    <div className="inline-flex gap-2">
                        <strong>13:00</strong>
                        <p>Caio Marques</p>
                    </div>
                </section>
                {children}
            </div>
        )
    }
)
PeriodBox.displayName = 'PeriodBox'

export { PeriodBox }
