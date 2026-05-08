import React from "react";

interface SectionActionLinkProps {
  label: string;
  href?: string;
}

export default function SectionActionLink({label, href = "#",}: SectionActionLinkProps) {
  return (
    <a
      href={href}
      className="
        inline-flex w-fit items-center gap-1
        text-sm font-medium text-primary
        transition-all hover:gap-2
      "
    >
      {label}

      <span>→</span>
    </a>
  );
}