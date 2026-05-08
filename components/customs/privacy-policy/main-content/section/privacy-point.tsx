import React from 'react'
import { CheckCircle2 } from "lucide-react";

interface PrivacyPointProps {
  text: string;
}

export default function PrivacyPoint({
  text,
}: PrivacyPointProps) {
  return (
    <div className="flex items-start gap-3">

      <CheckCircle2
        size={18}
        className="mt-1 text-primary"
      />

      <p className="text-sm leading-relaxed text-gray-600">
        {text}
      </p>

    </div>
  );
}