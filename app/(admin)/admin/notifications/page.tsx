'use client';

import ReportNotificationCard from '@/components/customs/admin/report-notification-card';
import TitlePage from '@/components/customs/admin/title-page'
import React, { useState } from 'react'

const MOCK_REPORTS = [
    {
        id: "REP-001",
        type: "pending" as const,
        user: "Ahmad Subarjo",
        title: "Penerangan Jalan Mati",
        location: "Jl. Merdeka No. 10",
        datetime: new Date().toISOString(),
        description: "Lampu jalan di area taman kota sudah mati selama 3 hari, mohon segera diperbaiki karena gelap saat malam hari.",
    },
    {
        id: "REP-002",
        type: "process" as const,
        user: "Siti Aminah",
        title: "Pipa Bocor",
        location: "Kecamatan Sukamaju",
        datetime: "2024-03-20T10:00:00Z",
        description: "Terjadi kebocoran pipa air bersih yang meluap ke jalan raya utama.",
    },
    {
        id: "REP-003",
        type: "success" as const,
        user: "Budi Doremi",
        title: "Sampah Menumpuk",
        location: "Pasar Baru",
        datetime: "2024-03-19T08:30:00Z",
        description: "Laporan penumpukan sampah sudah diselesaikan oleh tim kebersihan.",
    },
    {
        id: "REP-021",
        type: "pending" as const,
        user: "Ahmad Subarjo",
        title: "Penerangan Jalan Mati",
        location: "Jl. Merdeka No. 10",
        datetime: new Date().toISOString(),
        description: "Lampu jalan di area taman kota sudah mati selama 3 hari, mohon segera diperbaiki karena gelap saat malam hari.",
    },
    {
        id: "REP-032",
        type: "process" as const,
        user: "Siti Aminah",
        title: "Pipa Bocor",
        location: "Kecamatan Sukamaju",
        datetime: "2024-03-20T10:00:00Z",
        description: "Terjadi kebocoran pipa air bersih yang meluap ke jalan raya utama.",
    },
    {
        id: "REP-023",
        type: "success" as const,
        user: "Budi Doremi",
        title: "Sampah Menumpuk",
        location: "Pasar Baru",
        datetime: "2024-03-19T08:30:00Z",
        description: "Laporan penumpukan sampah sudah diselesaikan oleh tim kebersihan.",
    },
    {
        id: "REP-234",
        type: "pending" as const,
        user: "Ahmad Subarjo",
        title: "Penerangan Jalan Mati",
        location: "Jl. Merdeka No. 10",
        datetime: new Date().toISOString(),
        description: "Lampu jalan di area taman kota sudah mati selama 3 hari, mohon segera diperbaiki karena gelap saat malam hari.",
    },
    {
        id: "REP-0232",
        type: "process" as const,
        user: "Siti Aminah",
        title: "Pipa Bocor",
        location: "Kecamatan Sukamaju",
        datetime: "2024-03-20T10:00:00Z",
        description: "Terjadi kebocoran pipa air bersih yang meluap ke jalan raya utama.",
    },
    {
        id: "REP-0243",
        type: "success" as const,
        user: "Budi Doremi",
        title: "Sampah Menumpuk",
        location: "Pasar Baru",
        datetime: "2024-03-19T08:30:00Z",
        description: "Laporan penumpukan sampah sudah diselesaikan oleh tim kebersihan.",
    },

    {
        id: "REP-0312",
        type: "pending" as const,
        user: "Ahmad Subarjo",
        title: "Penerangan Jalan Mati",
        location: "Jl. Merdeka No. 10",
        datetime: new Date().toISOString(),
        description: "Lampu jalan di area taman kota sudah mati selama 3 hari, mohon segera diperbaiki karena gelap saat malam hari.",
    },
    {
        id: "REP-0424",
        type: "process" as const,
        user: "Siti Aminah",
        title: "Pipa Bocor",
        location: "Kecamatan Sukamaju",
        datetime: "2024-03-20T10:00:00Z",
        description: "Terjadi kebocoran pipa air bersih yang meluap ke jalan raya utama.",
    },
    {
        id: "REP-0253",
        type: "success" as const,
        user: "Budi Doremi",
        title: "Sampah Menumpuk",
        location: "Pasar Baru",
        datetime: "2024-03-19T08:30:00Z",
        description: "Laporan penumpukan sampah sudah diselesaikan oleh tim kebersihan.",
    },

    {
        id: "REP-04111",
        type: "pending" as const,
        user: "Ahmad Subarjo",
        title: "Penerangan Jalan Mati",
        location: "Jl. Merdeka No. 10",
        datetime: new Date().toISOString(),
        description: "Lampu jalan di area taman kota sudah mati selama 3 hari, mohon segera diperbaiki karena gelap saat malam hari.",
    },
    {
        id: "REP-1042",
        type: "process" as const,
        user: "Siti Aminah",
        title: "Pipa Bocor",
        location: "Kecamatan Sukamaju",
        datetime: "2024-03-20T10:00:00Z",
        description: "Terjadi kebocoran pipa air bersih yang meluap ke jalan raya utama.",
    },
    {
        id: "REP-1034",
        type: "success" as const,
        user: "Budi Doremi",
        title: "Sampah Menumpuk",
        location: "Pasar Baru",
        datetime: "2024-03-19T08:30:00Z",
        description: "Laporan penumpukan sampah sudah diselesaikan oleh tim kebersihan.",
    },
];

export default function AdminNotificationsPage() {

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalRecords = MOCK_REPORTS.length;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log("Pindah ke halaman:", page);
    };

    const handleRowsChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
        console.log("Jumlah baris per halaman:", rows);
    };

    const handleTest = () => {
        console.log('Action triggered!');
    };
    return (
        <div className='flex flex-col gap-[32px]'>
            <TitlePage title='Notifikasi' desc='Pembaruan dan Pemberitahuan Laporan terbaru yang masuk' />

            <ReportNotificationCard
                data={MOCK_REPORTS}
                totalRecords={totalRecords}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsChange}  
            />
        </div>
    )
}
