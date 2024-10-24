import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    isFocused?: boolean
}

const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
    ({ className, children, isFocused, ...props }, ref) => {

        return (
            <div
                className={cn(
                    'flex items-center gap-1 rounded-md border border-input  bg-transparent ring-offset-background file:border-0 file:bg-transparent',
                    className,
                    { 'border-styles-purple': isFocused }
                )}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        )
    }
)
InputRoot.displayName = 'InputRoot'

export { InputRoot }
