"use client";

import { id } from "date-fns/locale";
import { format } from "date-fns";
import { CustomTableReport } from '@/components/customs/admin/custom-table-report'
import { Chip, DateField, ListBox, Select } from '@heroui/react';

import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { Calendar as CalendarIcon, Eye, Funnel, FunnelX, MapPin } from 'lucide-react';
import React, { useState } from 'react'
import { ReportFilter } from "@/components/customs/admin/report-filter";


const columns = [
    {
        id: "report_id",
        name: "REPORT ID",
        render: (item: any) => <span className="font-semibold text-teal-600 text-[12px]">{item.report_id}</span>
    },
    {
        id: "fasilitas",
        name: "NAMA FASILITAS",
        render: (item: any) => (
            <div className="flex flex-col">
                <span className="font-semibold text-black">{item.nama}</span>
                <span className="text-xs text-default-400">{item.deskripsi}</span>
            </div>
        )
    },
    {
        id: "gedung",
        name: "GEDUNG",
        render: (item: any) => (
            <div className="flex items-center gap-2">
                <MapPin size={14} className="text-default-400" />
                <span className="text-xs">{item.lokasi}</span>
            </div>
        )
    },
    {
        id: "kategori",
        name: "KATEGORI",
        render: (item: any) => (
            <Chip size="sm" className="bg-primary/10 text-primary font-semibold text-[10px] px-3 py-0.5 rounded-md">
                {item.kategori}
            </Chip>
        )
    },
    {
        id: "status",
        name: "STATUS",
        render: (item: any) => {
            const statusConfig: any = {
                SELESAI: { color: "text-white bg-primary", label: "SELESAI" },
                DITOLAK: { color: "text-white bg-red-600", label: "DITOLAK" },
                DIPROSES: { color: "text-blue-600 bg-blue-500/20", label: "DIPROSES" },
                MENUNGGU: { color: "text-gray-600 bg-gray-500/20", label: "MENUNGGU" },
                DIVERIFIKASI: { color: "text-amber-500 bg-amber-500/20", label: "DIVERIFIKASI" },
            };
            const current = statusConfig[item.status] || statusConfig.MENUNGGU;
            return (
                <Chip size="sm" className={`font-semibold text-[10px] px-2.5 py-0.5      ${current.color}`}>
                    {current.label}
                </Chip>
            );
        }
    },
    {
        id: "aksi",
        name: "AKSI",
        render: (item: any) => (
            <button
                onClick={() => console.log("View detail:", item.id)}
                className="inline-flex items-center justify-center p-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors cursor-pointer"
            >
                <Eye size={22} />
            </button>
        )
    },
];

const dataList = [
    {
        id: "1",
        report_id: "#FAC-2024-001",
        nama: "Meja Dosen",
        deskripsi: "Kaki kaki nya patah",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "SELESAI",
    },
    {
        id: "2",
        report_id: "#FAC-2024-042",
        nama: "Washtafel",
        deskripsi: "Air tidak mengalir",
        lokasi: "Gedung Baru, 04.005",
        kategori: "SANITASI",
        status: "DITOLAK",
    },
    {
        id: "3",
        report_id: "#FAC-2024-058",
        nama: "AC Matiasdas",
        deskripsi: "AC mati tidak terasa dingin",
        lokasi: "Gedung Baru, 04.005",
        kategori: "AC",
        status: "MENUNGGU",
    },
    {
        id: "4",
        report_id: "#FAC-2024-089",
        nama: "Lampu Mati",
        deskripsi: "Lampu pada ruangan mati",
        lokasi: "Gedung Baru, 04.005",
        kategori: "KELISTRIKAN",
        status: "DIPROSES",
    },
    {
        id: "5",
        report_id: "#FAC-2024-102",
        nama: "Smart Boarasdasdd",
        deskripsi: "Pena digital hilang",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "DIVERIFIKASI",
    }, {
        id: "11",
        report_id: "#FAC-2024-001",
        nama: "Meja Doseasdasdasdn",
        deskripsi: "Kaki kaki nya patah",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "SELESAI",
    },
    {
        id: "21",
        report_id: "#FAC-2024-042",
        nama: "Washtafelasdas",
        deskripsi: "Air tidak mengalir",
        lokasi: "Gedung Baru, 04.005",
        kategori: "SANITASI",
        status: "DITOLAK",
    },
    {
        id: "13",
        report_id: "#FAC-2024-058",
        nama: "AC Matiasdasd",
        deskripsi: "AC mati tidak terasa dingin",
        lokasi: "Gedung Baru, 04.005",
        kategori: "AC",
        status: "MENUNGGU",
    },
    {
        id: "41",
        report_id: "#FAC-2024-089",
        nama: "Lampu Matiadsas",
        deskripsi: "Lampu pada ruangan mati",
        lokasi: "Gedung Baru, 04.005",
        kategori: "KELISTRIKAN",
        status: "DIPROSES",
    },
    {
        id: "51",
        report_id: "#FAC-2024-102",
        nama: "Smart Boardass",
        deskripsi: "Pena digital hilang",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "DIVERIFIKASI",
    },
    {
        id: "12",
        report_id: "#FAC-2024-001",
        nama: "Meja Dosensdsd",
        deskripsi: "Kaki kaki nya patah",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "SELESAI",
    },
    {
        id: "22",
        report_id: "#FAC-2024-042",
        nama: "Washtafeassal",
        deskripsi: "Air tidak mengalir",
        lokasi: "Gedung Baru, 04.005",
        kategori: "SANITASI",
        status: "DITOLAK",
    },
    {
        id: "32",
        report_id: "#FAC-2024-058",
        nama: "AC Mataai",
        deskripsi: "AC mati tidak terasa dingin",
        lokasi: "Gedung Baru, 04.005",
        kategori: "AC",
        status: "MENUNGGU",
    },
    {
        id: "222",
        report_id: "#FAC-2024-089",
        nama: "Lampu Matisss",
        deskripsi: "Lampu pada ruangan mati",
        lokasi: "Gedung Baru, 04.005",
        kategori: "KELISTRIKAN",
        status: "DIPROSES",
    },
    {
        id: "25",
        report_id: "#FAC-2024-102",
        nama: "Smart Board",
        deskripsi: "Pena digital hilang",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "DIVERIFIKASI",
    },
];

export default function ReportManagementPage() {

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [selectedGedung, setSelectedGedung] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    const handleReset = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setSelectedGedung("");
        setSelectedStatus("");
        setCurrentPage(1);
    };

    const handleFilter = () => {
        setCurrentPage(1);
    };

    const filteredData = dataList.filter((item) => {
        if (selectedGedung && !item.lokasi.toLowerCase().includes(selectedGedung.replace("gedung-", "gedung "))) return false;
        if (selectedStatus && item.status.toLowerCase() !== selectedStatus) return false;
        return true;
    });

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='flex flex-col gap-5'>
            <ReportFilter
                startDate={startDate}
                endDate={endDate}
                selectedGedung={selectedGedung}
                selectedStatus={selectedStatus}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onGedungChange={setSelectedGedung}
                onStatusChange={setSelectedStatus}
                onFilter={handleFilter}
                onReset={handleReset}
            />

            <CustomTableReport
                columns={columns}
                data={currentData}
                totalRecords={dataList.length}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                onRowsPerPageChange={(rows) => {
                    setRowsPerPage(rows);
                    setCurrentPage(1);
                }}
            />
        </div>
    )
}
