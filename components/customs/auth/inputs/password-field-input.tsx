import { useState } from 'react';
import Link from 'next/link';
import { TextField, Label, InputGroup, FieldError } from '@heroui/react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordFieldInputProps {
    label: string;
    name: string;
    placeholder: string;
    showForgotLink?: boolean;
    startIcon?: React.ReactNode;
}

export default function PasswordFieldInput({ label, name, placeholder, showForgotLink, startIcon }: PasswordFieldInputProps) {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <TextField name={name} className='group flex w-full flex-col gap-2' isRequired>
            <div className='flex items-center justify-between'>
                <Label className='text-[11px] font-semibold uppercase tracking-wider text-muted-foreground group-data-[invalid=true]:text-destructive' isRequired>
                    {label}
                </Label>
                {showForgotLink && (
                    <Link href='/forget-password' className='text-xs font-semibold text-primary hover:underline'>
                        Lupa Password?
                    </Link>
                )}
            </div>

            <InputGroup
                className='flex h-12 w-full items-center gap-3 rounded-md border-2 border-transparent bg-accent/70 px-4 transition-all hover:bg-muted focus-within:border-primary focus-within:bg-card group-data-[invalid=true]:border-destructive group-data-[invalid=true]:bg-destructive/5 shadow-none'
            >
                <InputGroup.Prefix className='shrink-0 text-muted-foreground group-data-[invalid=true]:text-destructive'>
                    {startIcon || <Lock size={18} />}
                </InputGroup.Prefix>

                <InputGroup.Input
                    type={isVisible ? 'text' : 'password'}
                    placeholder={placeholder}
                    className='w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none'
                />

                <InputGroup.Suffix>
                    <button
                        type='button'
                        onClick={toggleVisibility}
                        className='shrink-0 focus:outline-none'
                    >
                        {isVisible ? (
                            <EyeOff className='text-muted-foreground hover:text-foreground transition-colors group-data-[invalid=true]:text-destructive' size={18} />
                        ) : (
                            <Eye className='text-muted-foreground hover:text-foreground transition-colors group-data-[invalid=true]:text-destructive' size={18} />
                        )}
                    </button>
                </InputGroup.Suffix>
            </InputGroup>

            <FieldError className='text-xs text-destructive' />
        </TextField>
    );
}