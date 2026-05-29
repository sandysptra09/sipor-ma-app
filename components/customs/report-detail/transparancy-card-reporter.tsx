import React, { ReactNode } from "react";
import Image from "next/image";
import { ClipboardClock, User, Timer } from "lucide-react";

export interface ReportCardReporterProps {
    image: string;
    state: string;
    content: string;
    reporter: string;
    timestamp: string;
}

export default function ReportCardReporter({ image, state, content, reporter, timestamp }: ReportCardReporterProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full flex flex-col h-full">
            <div className="bg-primary px-4 py-3 flex items-center gap-2 text-white">
                {<ClipboardClock size={24} />}
                <span className="text-white text-sm font-semibold tracking-wide uppercase">Laporan Anda</span>
            </div>

            <div className="relative">
                <img src={image} alt="Laporan" className="w-full h-48 object-cover" />
                <span className="absolute bottom-3 left-3 bg-gray-500 text-white text-xs font-semibold px-3 py-1 rounded">
                    {state}
                </span>
            </div>

            <div className="px-4 pt-4 pb-2 flex-1">
                <p className="text-gray-800 text-xs leading-relaxed italic">
                    "{content}"
                </p>
            </div>

            <div className="px-4 py-3 flex items-center justify-between text-xs text-gray-500 mt-2 shrink-0 border-t border-zinc-50">
                <div className="flex items-center gap-1.5 truncate">
                    <User size={15} className="shrink-0" />
                    <span className="truncate">Pelapor: {reporter}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                    <Timer size={15} />
                    <span>{timestamp}</span>
                </div>
            </div>
        </div>
    );
}