import { TextField, Label, InputGroup, FieldError } from '@heroui/react';

interface TextFieldInputProps {
    label: string;
    name: string;
    placeholder: string;
    startIcon?: React.ReactNode;
}

export default function TextFieldInput({ label, name, placeholder, startIcon }: TextFieldInputProps) {
    return (
        <TextField name={name} className='group flex w-full flex-col gap-2' isRequired>
            <Label className='text-[11px] font-semibold uppercase tracking-wider text-muted-foreground group-data-[invalid=true]:text-destructive'>
                {label}
            </Label>

            <InputGroup
                className='flex h-12 w-full items-center gap-3 rounded-md border-2 border-transparent bg-accent/70 px-4 transition-all hover:bg-muted focus-within:border-primary focus-within:bg-card group-data-[invalid=true]:border-destructive group-data-[invalid=true]:bg-destructive/5 shadow-none'
            >
                {startIcon && (
                    <InputGroup.Prefix className='shrink-0 text-muted-foreground group-data-[invalid=true]:text-destructive'>
                        {startIcon}
                    </InputGroup.Prefix>
                )}

                <InputGroup.Input
                    placeholder={placeholder}
                    className='w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none'
                />
            </InputGroup>

            <FieldError className='text-xs text-destructive' />
        </TextField>
    );
}