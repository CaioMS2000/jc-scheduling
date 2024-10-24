'use client'

import { InputElement, InputIcon, InputRoot } from '@/components/input'
import { KeyRound } from 'lucide-react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface PasswordInputProps {
    hookFormReference: UseFormRegisterReturn
}

export default function PasswordInput({hookFormReference}: PasswordInputProps) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <InputRoot className="p-2" isFocused={isFocused}>
            <InputIcon>
                <KeyRound size={40} className="text-styles-purple" />
            </InputIcon>
            <InputElement
                type="password"
                className="font-bold text-white text-lg"
                placeholder="Senha"
                onIsFocused={setIsFocused}
                {...hookFormReference}
            />
        </InputRoot>
    )
}
