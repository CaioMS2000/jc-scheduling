'use client'

import { InputElement, InputIcon, InputRoot } from '@/components/input'
import { SquareUser } from 'lucide-react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface UsernameInputProps {
    hookFormReference: UseFormRegisterReturn
}

export default function UsernameInput({hookFormReference}: UsernameInputProps) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <InputRoot className="p-2" isFocused={isFocused}>
            <InputIcon>
                <SquareUser size={40} className="text-styles-purple" />
            </InputIcon>
            <InputElement
                placeholder="Nome do cliente"
                onIsFocused={setIsFocused}
                {...hookFormReference}
            />
        </InputRoot>
    )
}
