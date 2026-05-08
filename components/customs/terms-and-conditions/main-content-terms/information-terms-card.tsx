import React from 'react'

interface InformationTermsCardProps {
  id?:string;
  description: string;
}

export default function InformationTermsCard({id, description,}: InformationTermsCardProps) {
  return (
    <div id={id} className="flex flex-col gap-5 rounded-md border-l-4 border-primary bg-secondary/10 p-6 scroll-mt-28">
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-primary font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}