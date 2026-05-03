import { useId } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface AuthCheckboxProps {
    children: React.ReactNode;
    name?: string;
}

export default function AuthCheckbox({ children, name }: AuthCheckboxProps) {
    const checkboxId = useId();

    return (
        <div className='flex items-start gap-3'>
            <Checkbox
                id={checkboxId}
                name={name}
                className='mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary'
            />

            <label
                htmlFor={checkboxId}
                className='cursor-pointer text-xs font-medium leading-relaxed text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
                {children}
            </label>
        </div>
    );
}