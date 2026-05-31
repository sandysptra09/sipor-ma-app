import React from 'react'
import { Spinner } from '@heroui/react'

interface ButtonProps {
  name: React.ReactNode;
  isLoading?: boolean;
}

export default function CustomButtonContact({ name, isLoading }: ButtonProps) {
  return (
    <button
      type='submit'
      disabled={isLoading}
      className='cursor-pointer mt-4 h-12 w-full flex justify-center items-center rounded-md bg-primary text-sm font-bold tracking-wide text-primary-foreground shadow-md transition-colors hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed'
    >
      {isLoading ? <Spinner size="sm" /> : name}
    </button>
  )
}