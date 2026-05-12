import React from 'react'

interface TermsLastUpdateProps {
    label: string;
    date: string;
    startIcon?: React.ReactNode;
}

export default function TermsLastUpdate({label, date, startIcon}: TermsLastUpdateProps) {
  return (
    <div className='flex gap-2'>
        <div>
            {startIcon}
        </div>
        <div>
            <p>{label} {date}</p>
        </div>
    </div>
  )
}
