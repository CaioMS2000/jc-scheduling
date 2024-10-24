'use client'

import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

export interface ProviderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Providers({ children, ...props }: ProviderProps) {
    return (
        <QueryClientProvider client={queryClient} {...props}>
            {children}
        </QueryClientProvider>
    )
}
