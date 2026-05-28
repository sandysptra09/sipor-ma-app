import { Chip } from "@heroui/react";
import { Eye, MapPin } from "lucide-react";
import Link from "next/link";

export const columns = [
    {
        id: "report_id",
        name: "REPORT ID",
        width: "130px",
        render: (item: any) => <span className="font-semibold text-teal-600 text-[12px]">{item.reportNumber}</span>
    },
    {
        id: "fasilitas",
        name: "NAMA FASILITAS",
        width: "250px",
        render: (item: any) => (
            <div className="flex flex-col w-full whitespace-normal pr-4">
                <span className="font-semibold text-black">{item.title}</span>
                <span className="text-xs text-default-400 line-clamp-2 mt-1">{item.description}</span>
            </div>
        )
    },
    {
        id: "gedung",
        name: "GEDUNG",
        width: "250px",
        render: (item: any) => (
            <div className="flex items-start gap-2 w-full whitespace-normal pr-4">
                <MapPin size={14} className="text-default-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed break-words">{item.location}</span>
            </div>
        )
    },
    {
        id: "kategori",
        name: "KATEGORI",
        width: "160px",
        render: (item: any) => (
            <Chip size="sm" className="bg-primary/10 text-primary font-semibold text-[10px] px-3 py-0.5 rounded-md">
                {item.category}
            </Chip>
        )
    },
    {
        id: "status",
        name: "STATUS",
        width: "140px",
        render: (item: any) => {
            const statusConfig: any = {
                RESOLVED: { color: "text-white bg-primary", label: "SELESAI" },
                REJECTED: { color: "text-white bg-red-600", label: "DITOLAK" },
                IN_PROGRESS: { color: "text-blue-600 bg-blue-500/20", label: "DIPROSES" },
                PENDING: { color: "text-gray-600 bg-gray-500/20", label: "MENUNGGU" },
                VERIFIED: { color: "text-amber-500 bg-amber-500/20", label: "DIVERIFIKASI" },
            };

            const current = statusConfig[item.status?.toUpperCase()] || statusConfig.PENDING;

            return (
                <Chip size="sm" className={`font-semibold text-[10px] px-2.5 py-0.5 ${current.color}`}>
                    {current.label}
                </Chip>
            );
        }
    },
    {
        id: "aksi",
        name: "AKSI",
        width: "80px", 
        render: (item: any) => (
            <Link
                href={`/admin/report-management/${encodeURIComponent(item.reportNumber)}`}
                className="inline-flex items-center justify-center p-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors cursor-pointer"
            >
                <Eye size={22} />
            </Link>
        )
    },
];
