'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface TimeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  isSelected: boolean
  hour: number
  onSelectTime: (time: number) => void
}

export default function TimeButton({ className, children, onClick: inherithOnClickFunction, onSelectTime, hour, isSelected, ...props }: TimeButtonProps) {
    return (
        <>
            <Button
                type="button"
                className={cn("bg-zinc-700 border-2 border-zinc-500 font-light text-zinc-200 w-16 lg:w-20", {"border-styles-purple": isSelected, "text-styles-purple-light": isSelected}, className)}
                onClick={(e) => {
                    onSelectTime(hour)
                    if(inherithOnClickFunction) return inherithOnClickFunction(e);
                }}
                {...props}
            >
                {children}
            </Button>
        </>
    )
}
