import React from 'react'

interface HighlightCardProps {
  id?:string;
  title: string;
  description: string;
}

export default function HighlightCard({id, title, description,}: HighlightCardProps) {
  return (
    <div id={id} className="flex flex-col gap-3 rounded-2xl bg-primary p-6 text-white">

      <h3 className="text-xl font-semibold text-secondary">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-white/80">
        {description}
      </p>

    </div>
  );
}
