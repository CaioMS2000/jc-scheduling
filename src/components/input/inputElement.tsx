'use client'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    onIsFocused?: (value: boolean) => void
}

const InputElement = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, onIsFocused, ...props }, ref) => {
        const inputRef = React.useRef<HTMLInputElement>(null)

        function handleClick(event: React.MouseEvent<HTMLInputElement>) {
            event.currentTarget.showPicker()
        }

        function handleFocus(){
            onIsFocused?.(true)
        }

        function handleBlur(){
            onIsFocused?.(false)
        }

        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md px-3 py-2 text-sm bg-transparent border-0 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref ? ref : inputRef}
                onClick={handleClick}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
        )
    }
)
InputElement.displayName = 'Input'

export { InputElement }
