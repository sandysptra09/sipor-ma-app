import React from 'react'

interface ContentParagraphProps {
  text: string;
}

export default function ContentParagraph({text,}: ContentParagraphProps) {
  return (
    <p className="text-sm leading-relaxed text-gray-600">
      {text}
    </p>
  );
}