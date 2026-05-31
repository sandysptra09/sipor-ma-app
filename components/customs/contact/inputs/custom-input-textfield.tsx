import React from 'react'

interface CustomInputTextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function CustomInputTextfield({ label, ...props }: CustomInputTextfieldProps) {
    return (
        <div className='mt-2'>
            <label className='text-[11px] font-medium uppercase tracking-wider text-muted-foreground group-data-[invalid=true]:text-destructive'>
                {label}
            </label>
            <br />
            <input
                {...props}
                className='flex h-12 w-full items-center gap-3 rounded-md border-2 border-transparent bg-accent/70 px-4 transition-all hover:bg-muted focus-within:border-primary focus-within:bg-card outline-none shadow-none'
            />
        </div>
    )
}