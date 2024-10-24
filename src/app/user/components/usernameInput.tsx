'use client'

import { InputElement, InputIcon, InputRoot } from '@/components/input'
import { SquareUser } from 'lucide-react'
import { useState } from 'react'

export default function UsernameInput() {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <InputRoot className="p-2" isFocused={isFocused}>
            <InputIcon>
                <SquareUser size={40} className="text-styles-purple" />
            </InputIcon>
            <InputElement
                className="font-bold text-white text-lg"
                placeholder="Nome de usuário"
                onIsFocused={setIsFocused}
            />
        </InputRoot>
    )
}
