import React from 'react'
import { MapPin, Mail, Phone } from 'lucide-react';

interface CustomInformationCardProps{
    title: string;
    description?: string;
    startIcon?: React.ReactNode;
}

export default function CustomInformationCard({ title, description, startIcon }: CustomInformationCardProps) {
  return (
    <div className={`flex items-center gap-3 transition-opacity duration-700 ease-in-out 'opacity-100' : 'opacity-0'}`}>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#E7F4F3] p-1.5'>
            {startIcon}
        </div>
        <div>
            <p className="font-semibold">{title}</p>
            {description && (
                <p className="text-sm text-gray-500">{description}</p>
            )}
      </div>
    </div>
  )
}
