import React from 'react'

interface CustomInputTextfieldProps{
    label : string;
    placeholder: string;
    // children: React.ReactNode;
}

export default function CustomInputTextfield({label, placeholder}:CustomInputTextfieldProps) {
    return (
        <div>
            <label htmlFor="" className='text-[11px] font-medium uppercase tracking-wider text-muted-foreground group-data-[invalid=true]:text-destructive'>
                {label}
            </label>
            <br />
            <input 
                placeholder={placeholder} 
                className='flex h-12 w-full items-center gap-3 rounded-md border-2 border-transparent bg-accent/70 px-4 transition-all hover:bg-muted focus-within:border-primary focus-within:bg-card group-data-[invalid=true]:border-destructive group-data-[invalid=true]:bg-destructive/5 shadow-none' type="text" 
            />
            
        </div>
    )
}
