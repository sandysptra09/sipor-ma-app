import React from 'react'

interface InformationUsageCardProps {
  id?:string;
  title: string;
  description: string;
  items: string[];
}

export default function InformationUsageCard({id, title, description, items,}: InformationUsageCardProps) {
  return (
    <div id={id} className="flex flex-col gap-5 rounded-2xl border-l-4 border-primary bg-white p-8 scroll-mt-28">

      <div className="flex flex-col gap-3">

        <h3 className="text-2xl font-semibold text-primary">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-600">
          {description}
        </p>

      </div>

      <div className="flex flex-col gap-3">

        {items.map((item) => (
          <p
            key={item}
            className="text-sm text-gray-600"
          >
            {item}
          </p>
        ))}

      </div>

    </div>
  );
}