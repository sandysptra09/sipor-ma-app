import { Button, Spinner } from '@heroui/react';

interface AuthSubmitButtonProps {
    name: React.ReactNode;
    isLoading?: boolean;
    loadingText?: string;
}

export default function AuthSubmitButton({ name, isLoading, loadingText }: AuthSubmitButtonProps) {
    return (
        <Button
            type='submit'
            isPending={isLoading}
            className='mt-2 h-12 w-full rounded-md bg-primary text-sm font-bold tracking-wide text-primary-foreground shadow-md transition-colors hover:bg-primary/90'
        >
            {isLoading ? (
                <div className='flex items-center gap-2'>
                    <Spinner color='current' size='sm' />
                    <span>{loadingText}</span>
                </div>
            ) : (
                name
            )}
        </Button>
    );
}