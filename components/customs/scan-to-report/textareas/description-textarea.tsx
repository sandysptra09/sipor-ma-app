'use client';

import { TextField, Label, TextArea } from '@heroui/react';
import { MessageSquareText } from 'lucide-react';

interface DescriptionTextareaProps {
    value: string;
    onChange: (value: string) => void;
}

export default function DescriptionTextarea({ value, onChange }: DescriptionTextareaProps) {
    return (
        <TextField className='w-full flex flex-col gap-2'>
            <Label isRequired className='text-xs font-semibold uppercase tracking-wider text-foreground'>
                Deskripsi Kerusakan
            </Label>
            <TextArea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder='Jelaskan secara detail kendala yang dialami (contoh: AC tidak dingin, ada bunyi bising, atau air menetes)...'
                minLength={10}
                rows={6}
                className='flex text-muted-foreground placeholder:text-muted-foreground placeholder:text-[13px] w-full items-center gap-3 rounded-md border-2 border-transparent bg-accent/70 px-4 py-3 transition-all hover:bg-muted focus-within:border-primary focus-within:bg-card'
            />
        </TextField>
    );
}