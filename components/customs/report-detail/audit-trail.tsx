// components/audit-item.tsx
import React from "react";
import { Check } from 'lucide-react'

export interface AuditItemProps {
    title: string;
    description: string;
    timestamp: string;
    isCompleted?: boolean;
    isLast?: boolean;
}

export default function AuditItem({ title, description, timestamp, isCompleted = false, isLast = false }: AuditItemProps) {
    return (
        <div className="flex gap-4">
            {/* Left: dot + line */}
            <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-1 ${isCompleted ? 'text-white bg-primary' : 'bg-gray-300'}`}>
                    {isCompleted && (
                        <Check size={12} />
                    )}
                </div>
                {!isLast && <div className="w-0.5 bg-gray-200 flex-1 my-1" />}
            </div>

            {/* Right: content */}
            <div className="pb-6 flex-1">
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 text-sm">{title}</span>
                    <span className={`text-xs px-2 py-1 rounded ${isCompleted ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {timestamp}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
        </div>
    );
}