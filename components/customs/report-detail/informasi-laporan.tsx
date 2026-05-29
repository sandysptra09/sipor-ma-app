import React, { ReactNode } from "react";
import Image from "next/image";
import { Hash, MapPin, LayoutGrid, CircleAlert } from "lucide-react";

export interface InformasiLaporanProps {
    id: string;
    location: string;
    category: string;
    priority: string;
}

export default function InformasiLaporan({ id, location, category, priority }: InformasiLaporanProps) {

    const getPriorityStyle = (p: string) => {
        switch (p?.toUpperCase()) {
            case 'HIGH': return 'text-red-600';
            case 'MEDIUM': return 'text-yellow-600';
            case 'LOW': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    };

    const getPriorityIconColor = (p: string) => {
        switch (p?.toUpperCase()) {
            case 'HIGH': return 'text-red-500';
            case 'MEDIUM': return 'text-yellow-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-sm w-full flex flex-col gap-5 border border-zinc-100">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span>Informasi Laporan</span>
            </div>

            <div className="flex flex-col gap-4 text-white items-start">
                <div className="flex flex-row items-start gap-4">
                    <div className="bg-accent rounded-sm px-2 py-2 text-primary shrink-0">
                        {<Hash size={15} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181C1C]/80 text-[11px] font-medium tracking-wide uppercase">ID LAPORAN</span>
                        <p className="text-xs font-medium text-primary">
                            {id}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-start gap-4">
                    <div className="bg-accent rounded-sm px-2 py-2 text-primary shrink-0">
                        {<MapPin size={15} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181C1C]/80 text-[11px] font-medium tracking-wide uppercase">Lokasi Spesifik</span>
                        <p className="text-foreground text-xs font-medium">
                            {location}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-start gap-4 ">
                    <div className="bg-accent rounded-sm px-2 py-2 text-primary shrink-0">
                        {<LayoutGrid size={15} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181C1C]/80 text-[11px] font-medium tracking-wide uppercase">Kategori Fasilitas</span>
                        <p className="text-foreground text-xs font-medium">
                            {category}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-start gap-4">
                    <div className="bg-accent rounded-sm px-2 py-2 text-danger shrink-0">
                        {<CircleAlert size={15} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181C1C]/80 text-[11px] font-medium tracking-wide uppercase">Prioritas Laporan</span>
                        <span className={`text-[10px] w-fit font-bold rounded uppercase tracking-wider ${getPriorityStyle(priority)}`}>
                            {priority}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}