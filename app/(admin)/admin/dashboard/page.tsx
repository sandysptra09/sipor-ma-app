"use client";

import React, { useState, useEffect } from "react";
import SummaryCardReport from "@/components/customs/admin/summary-card-report";
import RecentActivityCard from "@/components/customs/admin/recent-activity-card";
import SummaryReportByCategoryCard from "@/components/customs/admin/summary-report-by-category-card";
import { CustomTableReport } from "@/components/customs/admin/custom-table-report";
import { BadgeCheck, Clock, MapPin, TrendingUp, Eye } from "lucide-react";
import { Chip } from "@heroui/react";
import Link from "next/link";

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
                completed: { color: "text-white bg-primary", label: "SELESAI" },
                rejected: { color: "text-white bg-red-600", label: "DITOLAK" },
                process: { color: "text-blue-600 bg-blue-500/20", label: "DIPROSES" },
                pending: { color: "text-gray-600 bg-gray-500/20", label: "MENUNGGU" },
                verified: { color: "text-amber-500 bg-amber-500/20", label: "DIVERIFIKASI" },
            };
            const current = statusConfig[item.status] || statusConfig.pending;
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
            <Link
                href={`/admin/report-management/${item.id}?status=${item.status}`}
                className="inline-flex items-center justify-center p-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors cursor-pointer"
            >
                <Eye size={22} />
            </Link>
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
        status: "completed",
    },
    {
        id: "2",
        report_id: "#FAC-2024-042",
        nama: "Washtafel",
        deskripsi: "Air tidak mengalir",
        lokasi: "Gedung Baru, 04.005",
        kategori: "SANITASI",
        status: "rejected",
    },
    {
        id: "3",
        report_id: "#FAC-2024-058",
        nama: "AC Matiasdas",
        deskripsi: "AC mati tidak terasa dingin",
        lokasi: "Gedung Baru, 04.005",
        kategori: "AC",
        status: "pending",
    },
    {
        id: "4",
        report_id: "#FAC-2024-089",
        nama: "Lampu Mati",
        deskripsi: "Lampu pada ruangan mati",
        lokasi: "Gedung Baru, 04.005",
        kategori: "KELISTRIKAN",
        status: "process",
    },
    {
        id: "5",
        report_id: "#FAC-2024-102",
        nama: "Smart Boarasdasdd",
        deskripsi: "Pena digital hilang",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "verified",
    }, {
        id: "11",
        report_id: "#FAC-2024-001",
        nama: "Meja Doseasdasdasdn",
        deskripsi: "Kaki kaki nya patah",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "completed",
    },
    {
        id: "21",
        report_id: "#FAC-2024-042",
        nama: "Washtafelasdas",
        deskripsi: "Air tidak mengalir",
        lokasi: "Gedung Baru, 04.005",
        kategori: "SANITASI",
        status: "rejected",
    },
    {
        id: "13",
        report_id: "#FAC-2024-058",
        nama: "AC Matiasdasd",
        deskripsi: "AC mati tidak terasa dingin",
        lokasi: "Gedung Baru, 04.005",
        kategori: "AC",
        status: "pending",
    },
    {
        id: "41",
        report_id: "#FAC-2024-089",
        nama: "Lampu Matiadsas",
        deskripsi: "Lampu pada ruangan mati",
        lokasi: "Gedung Baru, 04.005",
        kategori: "KELISTRIKAN",
        status: "process",
    },
    {
        id: "51",
        report_id: "#FAC-2024-102",
        nama: "Smart Boardass",
        deskripsi: "Pena digital hilang",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "verified",
    },
    {
        id: "12",
        report_id: "#FAC-2024-001",
        nama: "Meja Dosensdsd",
        deskripsi: "Kaki kaki nya patah",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "completed",
    },
    {
        id: "22",
        report_id: "#FAC-2024-042",
        nama: "Washtafeassal",
        deskripsi: "Air tidak mengalir",
        lokasi: "Gedung Baru, 04.005",
        kategori: "SANITASI",
        status: "rejected",
    },
    {
        id: "32",
        report_id: "#FAC-2024-058",
        nama: "AC Mataai",
        deskripsi: "AC mati tidak terasa dingin",
        lokasi: "Gedung Baru, 04.005",
        kategori: "AC",
        status: "pending",
    },
    {
        id: "222",
        report_id: "#FAC-2024-089",
        nama: "Lampu Matisss",
        deskripsi: "Lampu pada ruangan mati",
        lokasi: "Gedung Baru, 04.005",
        kategori: "KELISTRIKAN",
        status: "process",
    },
    {
        id: "25",
        report_id: "#FAC-2024-102",
        nama: "Smart Board",
        deskripsi: "Pena digital hilang",
        lokasi: "Gedung Baru, 04.005",
        kategori: "FURNITURE",
        status: "verified",
    },
];

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentData = dataList.slice(indexOfFirstItem, indexOfLastItem);

    interface DashboardStatistic {
        incoming: number;
        inProgress: number;
        completed: number;
    }

    const [data, setData] = useState<DashboardStatistic | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchDashboardStatistic() {
            const res = await fetch(`/api/admin/dashboard/statistic`);
            const json = await res.json();
            setData(json);
            setIsLoading(false);
        }

        fetchDashboardStatistic();
    }, []);


    return (
        <div className="grid grid-cols-6 gap-[20px]">
            {/* Row 1: Summary Cards */}
            <SummaryCardReport
                className="col-span-6 md:col-span-2"
                title={"Laporan Masuk"}
                subTitle="Testing"
                count={data?.incoming || 0}
                type="incoming"
                loading={isLoading}
                description={<><TrendingUp size={14} /> +12% dari bulan lalu</>}
            />
            <SummaryCardReport
                className="col-span-6 md:col-span-2"
                title={"Sedang Dikerjakan"}
                subTitle="Testing"
                count={data?.inProgress || 0}
                type="in-progress"
                loading={isLoading}
                description={<><Clock size={14} /> Estimasi selesai: 3 hari</>}
            />
            <SummaryCardReport
                className="col-span-6 md:col-span-2"
                title={"Selesai Bulan Ini"}
                subTitle="Testing"
                count={data?.completed || 0}
                type="completed"
                loading={isLoading}
                description={<><BadgeCheck size={14} /> 12.4% Tingkat Kepuasan</>}
            />

            {/* Row 2: Charts & Activities */}
            <RecentActivityCard
                className='col-span-6 md:col-span-3'
            />
            <SummaryReportByCategoryCard
                className='col-span-6 md:col-span-3'
            />

            <div className="col-span-6">
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

        </div>
    );
}