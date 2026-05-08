import React from 'react'

interface TitleLastUpdateProps {
    label: string;
    date: string;
    startIcon?: React.ReactNode;
}

export default function TitleLastUpdate({label, date, startIcon}: TitleLastUpdateProps) {
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
