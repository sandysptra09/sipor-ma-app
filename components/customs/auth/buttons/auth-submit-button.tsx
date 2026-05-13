import { Button } from '@heroui/react';

interface AuthSubmitButtonProps {
    name: React.ReactNode;
    isLoading?: boolean;
}

export default function AuthSubmitButton({ name, isLoading }: AuthSubmitButtonProps) {
    return (
        <Button
            type='submit'
            isPending={isLoading}
            className='mt-2 h-12 w-full rounded-md bg-primary text-sm font-bold tracking-wide text-primary-foreground shadow-md transition-colors hover:bg-primary/90'
        >
            {name}
        </Button>
    );
}