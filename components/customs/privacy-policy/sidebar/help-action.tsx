import React from 'react'

interface HelpActionProps{
    title: string;
    description: string;
    email: string;
}

export default function HelpAction({title, description, email}:HelpActionProps) {
  return (
    <div className='flex flex-col w-full gap-2 rounded-xl bg-secondary/10 p-6'>
        <p className='text-lg font-semibold text-primary'>
            {title}
        </p>

        <p className="text-sm text-gray-500 leading-relaxed">
            {description}
        </p>

        <a
        href={`mailto:${email}`}
        className="text-sm font-semibold text-primary hover:underline"
        >
            {email}
        </a>

    </div>
  )
}
