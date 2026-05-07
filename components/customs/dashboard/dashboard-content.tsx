'use client';

import ReportFilterTabs, { TabItem } from './tabs/report-filter-tab';
import ReportCard from './cards/report-card';
import { Clock4 } from 'lucide-react';
import { LuFileText } from 'react-icons/lu';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';
import { MdOutlineEngineering } from 'react-icons/md';

// 1. KITA BALIKIN DATA DUMMY-NYA DI SINI
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

export default function DashboardContent() {

    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>

            <div className='lg:col-span-8 flex flex-col'>

                <div className='mb-8'>
                    <h1 className='font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl'>Dashboard</h1>
                    <p className='mt-2 text-sm font-normal leading-relaxed text-foreground md:text-base'>
                        Pantau langsung status fasilitas sarana kampus dalam satu dashboard yang real-time dan terpercaya.
                    </p>
                </div>

                <div className='flex flex-col gap-6'>
                    <ReportFilterTabs items={tabItems} />
                </div>
            </div>

            <div className='lg:col-span-4 hidden lg:flex lg:flex-col gap-6'>

            </div>

        </div>
    );
}