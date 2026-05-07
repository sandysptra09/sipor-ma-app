import React from 'react'

interface ButtonProps{
    name:React.ReactNode;
}

export default function CustomButtonContact({name}:ButtonProps) {
  return (
    <button type='submit' className='mt-2 h-12 w-full rounded-md bg-primary text-sm font-bold tracking-wide text-primary-foreground shadow-md transition-colors hover:bg-primary/90'>
        {name}
    </button>
  )
}
