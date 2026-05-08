import React from 'react'

interface PrivacySectionTermsProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

export default function PrivacySectionTerms({id, title,children,}: PrivacySectionTermsProps) {
  return (
    <section id={id} className="flex flex-col gap-4 scroll-mt-28">

      <h2 className="text-2xl font-semibold text-primary">
        {title}
      </h2>

      <div className="flex flex-col gap-3">
        {children}
      </div>

    </section>
  );
}
