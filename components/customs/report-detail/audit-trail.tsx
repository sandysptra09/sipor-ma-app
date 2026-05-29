import React from "react";
import { Check } from 'lucide-react'

export interface AuditItemProps {
    title: string;
    description: string;
    timestamp: string;
    isActive?: boolean;
    isPast?: boolean;
    isLast?: boolean;
}

export default function AuditItem({ title, description, timestamp, isActive = false, isPast = false, isLast = false }: AuditItemProps) {
    return (
        <div className="flex gap-4">

            <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-1 
                    ${isActive ? 'bg-primary text-white' : isPast ? 'bg-[#A1E3CB]' : 'bg-zinc-200'}`}>
                    {isActive && (
                        <Check size={10} strokeWidth={3} />
                    )}
                </div>

                {!isLast && <div className={`w-0.5 flex-1 my-1 ${isPast ? 'bg-zinc-100' : 'bg-zinc-100'}`} />}
            </div>

            <div className="pb-6 flex-1">
                <div className="flex items-center justify-between">
                    <span className={`font-bold text-sm ${isActive ? 'text-[#004C3F]' : isPast ? 'text-zinc-700' : 'text-zinc-400'}`}>
                        {title}
                    </span>

                    {timestamp && (
                        <span className={`text-[10px] md:text-xs font-medium px-2.5 py-1 rounded w-fit
                            ${isActive ? 'bg-primary text-white' : isPast ? 'bg-zinc-100 text-zinc-600' : 'bg-zinc-100 text-zinc-400'}`}>
                            {timestamp}
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
        </div>
    );
}