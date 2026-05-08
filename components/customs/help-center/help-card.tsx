import React, { ReactNode } from "react";

export interface HelpCardProps{
  icon : ReactNode;
  text: String;
}

export default function HelpCard({icon, text }:HelpCardProps) {
  return (
    <div className="flex items-center gap-3 bg-[#E7F4F3] px-5 py-3 rounded-xl cursor-pointer hover:bg-teal-200 transition">
      
      <div className="bg-secondary/40 p-2 rounded-lg">
        {icon}
      </div>
      <span className="font-medium text-gray-800">
        {text}
      </span>

    </div>
  );
}