'use client';

import { TextField, Label, Input, Description, InputGroup } from '@heroui/react';
import { MapPin } from 'lucide-react';

interface LocationFieldInputProps {
    locationText: string;
}

export default function LocationFieldInput({ locationText }: LocationFieldInputProps) {
    return (
        <TextField className='w-full flex flex-col gap-2' isReadOnly>
            <Label isRequired className='text-xs font-semibold uppercase tracking-wider text-foreground'>
                Lokasi
            </Label>
            <Input
                value={locationText}
                className='flex h-12 text-muted-foreground placeholder:text-[13px] w-full items-center gap-3 rounded-md bg-accent/70 px-4 cursor-not-allowed shadow-none'
            />
            <Description className='text-xs text-muted-foreground mt-1 italic'>
                Lokasi diisi otomatis berdasarkan QR Code yang di-scan.
            </Description>
        </TextField>
    );
}