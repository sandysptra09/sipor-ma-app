import React from 'react'

interface InfoCardProps {
  title: string;
  description: string;
  startIcon?: React.ReactNode;
}

export default function InfoCard({title, description, startIcon,}: InfoCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-2">

        {startIcon && (
          <div className="text-primary">
            {startIcon}
          </div>
        )}

        <h6 className="font-medium text-black">
          {title}
        </h6>

      </div>

      <p className="text-sm leading-relaxed text-gray-600">
        {description}
      </p>

    </div>
  );
}
