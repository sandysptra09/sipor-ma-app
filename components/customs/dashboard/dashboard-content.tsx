'use client';

import { useState } from 'react'; 
import ReportFilterTabs, { TabItem } from './tabs/report-filter-tab';
import StatWidget, { StatData } from './widgets/stat-widget';
import NotificationWidget, { NotificationItem } from './widgets/notification-widget';
import HelpWidget from './widgets/help-widget';
import ReportCard from './cards/report-card';
import CancelReportModal from './modals/cancel-report-modal'; 

import { Clock4, History } from 'lucide-react';
import { LuFileText, LuCircleCheckBig } from 'react-icons/lu';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';
import { MdOutlineEngineering, MdOutlineInsertComment } from 'react-icons/md';


const statData: StatData = {
    total: 24,
    chipText: '+3 Bulan Ini',
    proses: 8,
    selesai: 16
};

const notificationData: NotificationItem[] = [
    {
        id: 1,
        icon: <History size={16} strokeWidth={2.5} />,
        message: <>Status laporan <span className='text-[#0A6F66] font-semibold'>#REP-2026-001</span> diperbarui ke Sedang Diproses.</>,
        time: '1 JAM YANG LALU'
    },
    {
        id: 2,
        icon: <LuCircleCheckBig size={16} strokeWidth={2.5} />,
        message: <>Selamat! Laporan <span className='text-[#0A6F66] font-semibold'>#REP-2026-002</span> telah dinyatakan selesai.</>,
        time: 'KEMARIN'
    },
    {
        id: 3,
        icon: <MdOutlineInsertComment size={16} />,
        message: <>Admin memberikan komentar pada laporan <span className='text-[#0A6F66] font-semibold'>#REP-2026-003</span> terkait lokasi.</>,
        time: '3 HARI YANG LALU'
    }
];


export default function DashboardContent() {
    // 🟢 STATE UNTUK MENGATUR MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

    const handleOpenModal = (id: string) => {
        setSelectedReportId(id);
        setIsModalOpen(true);
    };

    const handleSuccessDelete = () => {
        setIsModalOpen(false);
        // Refresh halaman
        window.location.reload(); 
    };

    const tabItems: TabItem[] = [
        {
            id: 'semua',
            label: 'Semua Laporan',
            content: (
                <div className='flex flex-col gap-6'>
                    <ReportCard
                        id='#REP-2026-001'
                        title='AC Ruang Kuliah 20.4B.05.005'
                        date='12 JAN 2026'
                        status='PROSES'
                        imageSrc='https://suarakampus.com/wp-content/uploads/2024/11/IMG-20241112-WA0062-1160x764.jpg'
                        messageIcon={<TbRosetteDiscountCheckFilled size={22} className='text-[#0A6F66]' />}
                        messageText='Laporan Diterima'
                        actionIcon={<MdOutlineEngineering size={18} className='text-zinc-400' />}
                        actionText='Tim Lapangan Menuju Lokasi'
                        actionType='neutral'
                        delay={0.1}
                    />
                    <ReportCard
                        id='#REP-2026-002'
                        title='Kursi Ruang Kuliah 20.4E.02.006'
                        date='13 JAN 2026'
                        status='SELESAI'
                        imageSrc='https://pascasarjana.unsrat.ac.id/images/Ruang_kuliah_1.JPG'
                        messageIcon={<TbRosetteDiscountCheckFilled size={22} className='text-[#0A6F66]' />}
                        messageText='Masalah Teratasi'
                        actionIcon={<LuFileText size={18} />}
                        actionText='Lihat Dokumentasi Perbaikan'
                        actionType='primary'
                        delay={0.2}
                    />
                    <ReportCard
                        id='#REP-2026-003'
                        title='Smartboard Ruang Kuliah 20.4B.04.001'
                        date='KEMARIN'
                        status='PENDING'
                        imageSrc='https://www.indovisual.co.id/wp-content/uploads/2025/01/asian-female-professor-giving-biology-lecture-university_63762-12486.jpg'
                        messageIcon={<Clock4 size={18} className='text-destructive' />}
                        messageText='Menunggu Verifikasi Admin'
                        actionText='Batalkan Laporan'
                        actionType='danger'
                        delay={0.3}
                        onActionClick={() => handleOpenModal('#REP-2026-003')} // 👈 BUKA MODAL
                    />
                </div>
            )
        },
        {
            id: 'pending',
            label: 'Pending',
            content: (
                <div className='flex flex-col gap-6'>
                    <ReportCard
                        id='#REP-2026-003'
                        title='Smartboard Ruang Kuliah 20.4B.04.001'
                        date='KEMARIN'
                        status='PENDING'
                        imageSrc='https://www.indovisual.co.id/wp-content/uploads/2025/01/asian-female-professor-giving-biology-lecture-university_63762-12486.jpg'
                        messageIcon={<Clock4 size={18} className='text-destructive' />}
                        messageText='Menunggu Verifikasi Admin'
                        actionText='Batalkan Laporan'
                        actionType='danger'
                        delay={0.1}
                        onActionClick={() => handleOpenModal('#REP-2026-003')} // 👈 BUKA MODAL
                    />
                </div>
            )
        },
        {
            id: 'proses',
            label: 'Proses',
            content: (
                <div className='flex flex-col gap-6'>
                    <ReportCard
                        id='#REP-2026-001'
                        title='AC Ruang Kuliah 20.4B.05.005'
                        date='12 JAN 2026'
                        status='PROSES'
                        imageSrc='https://suarakampus.com/wp-content/uploads/2024/11/IMG-20241112-WA0062-1160x764.jpg'
                        messageIcon={<TbRosetteDiscountCheckFilled size={22} className='text-[#0A6F66]' />}
                        messageText='Laporan Diterima'
                        actionIcon={<MdOutlineEngineering size={18} className='text-zinc-400' />}
                        actionText='Tim Lapangan Menuju Lokasi'
                        actionType='neutral'
                        delay={0.1}
                    />
                </div>
            )
        },
        {
            id: 'selesai',
            label: 'Selesai',
            content: (
                <div className='flex flex-col gap-6'>
                    <ReportCard
                        id='#REP-2026-002'
                        title='Kursi Ruang Kuliah 20.4E.02.006'
                        date='13 JAN 2026'
                        status='SELESAI'
                        imageSrc='https://pascasarjana.unsrat.ac.id/images/Ruang_kuliah_1.JPG'
                        messageIcon={<TbRosetteDiscountCheckFilled size={22} className='text-[#0A6F66]' />}
                        messageText='Masalah Teratasi'
                        actionIcon={<LuFileText size={18} />}
                        actionText='Lihat Dokumentasi Perbaikan'
                        actionType='primary'
                        delay={0.1}
                    />
                </div>
            )
        }
    ];

    return (
        <>
            <div className='flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full'>

                <div className='contents lg:flex lg:flex-col lg:col-span-8 lg:gap-8'>

                    <div className='order-1 flex flex-col mb-2 lg:mb-0'>
                        <h1 className='font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl'>Dashboard</h1>
                        <p className='mt-2 text-sm font-normal leading-relaxed text-foreground md:text-base'>
                            Pantau langsung status fasilitas sarana kampus dalam satu dashboard yang real-time dan terpercaya.
                        </p>
                    </div>

                    <div className='order-3 w-full'>
                        <ReportFilterTabs items={tabItems} />
                    </div>

                </div>

                <div className='contents lg:flex lg:flex-col lg:col-span-4 lg:gap-6'>

                    <div className='order-2 w-full'>
                        <StatWidget data={statData} />
                    </div>

                    <div className='order-4 w-full'>
                        <NotificationWidget items={notificationData} />
                    </div>

                    <div className='order-5 w-full'>
                        <HelpWidget />
                    </div>

                </div>

            </div>

            <CancelReportModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reportId={selectedReportId}
                onSuccess={handleSuccessDelete}
            />
        </>
    );
}