import React, { ReactNode } from "react";
import Image from "next/image";
import { Hash } from "lucide-react";

export interface InformasiLaporanProps {
    id: string;
    location: string;
    category: string;
    priority: string;
}

export default function InformasiLaporan({ id, location, category, priority }: InformasiLaporanProps) {
    return (
        <div className="bg-white p-5 rounded-lg shadow-md w-full flex flex-col gap-5">
            <div className="text-sm">
                <span>Informasi Laporan</span>
            </div>

            <div className="flex flex-col gap-4 text-white items-start">
                <div className="flex flex-row gap-4">
                    <div className="bg-primary/20 rounded-sm px-2 py-2 text-primary">
                        {<Hash size={15} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181C1C]/80 text-xs font-semibold tracking-wide uppercase">ID LAPORAN</span>
                        <p className="text-[#181C1C]/60 text-xs">
                            {id}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="bg-primary/20 rounded-sm px-2 py-2 text-primary">
                        {<Hash size={15} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181C1C]/80 text-xs font-semibold tracking-wide uppercase">Lokasi Spesifik</span>
                        <p className="text-[#181C1C]/60 text-xs">
                            {location}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="bg-primary/20 rounded-sm px-2 py-2 text-primary">
                        {<Hash size={15} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181C1C]/80 text-xs font-semibold tracking-wide uppercase">Kategori Fasilitas</span>
                        <p className="text-[#181C1C]/60 text-xs">
                            {category}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="bg-primary/20 rounded-sm px-2 py-2 text-primary">
                        {<Hash size={15} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181C1C]/80 text-xs font-semibold tracking-wide uppercase">Prioritas Laporan</span>
                        <p className="text-[#181C1C]/60 text-xs">
                            {priority}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}