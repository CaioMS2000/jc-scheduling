'use client'

import { InputElement, InputIcon, InputRoot } from '@/components/input'
import { Clock } from 'lucide-react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ScheduleTimeInputProps {
    hookFormReference: UseFormRegisterReturn
}

export default function ScheduleTimeInput({hookFormReference}: ScheduleTimeInputProps) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <InputRoot className="p-2 w-52" isFocused={isFocused}>
            <InputIcon>
                <Clock size={40} className="text-styles-purple" />
            </InputIcon>
            <InputElement
                onIsFocused={setIsFocused}
                type='time'
                {...hookFormReference}
            />
        </InputRoot>
    )
}
