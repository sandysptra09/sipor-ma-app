import React from "react";

interface ContactItemProps {
  label: string;
  startIcon?: React.ReactNode;
}

export default function ContactItem({label, startIcon,}: ContactItemProps) {
  return (
    <div className="flex items-center gap-2">

      {startIcon && (
        <div className="text-primary bg-secondary p-2 rounded-lg">
          {startIcon}
        </div>
      )}

      <p className="text-sm text-gray-600">
        {label}
      </p>

    </div>
  );
}