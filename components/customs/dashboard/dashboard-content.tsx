'use client';

import { useEffect, useState, useMemo } from 'react';
import { api } from '@/lib/axios';
import { format, isToday, isYesterday } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Skeleton, Pagination } from '@heroui/react';
import ReportFilterTabs, { TabItem } from './tabs/report-filter-tab';
import StatWidget from './widgets/stat-widget';
import NotificationWidget, { NotificationItem } from './widgets/notification-widget';
import HelpWidget from './widgets/help-widget';
import ReportCard, { ReportStatus } from './cards/report-card';
import { Clock4, History } from 'lucide-react';
import { LuFileText, LuCircleCheckBig } from 'react-icons/lu';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';
import { MdOutlineEngineering, MdOutlineInsertComment } from 'react-icons/md';

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

    const [reports, setReports] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await api.get('/reports');
                setReports(response.data.data);
            } catch (error) {
                console.error('Gagal mengambil data laporan:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const formatReportDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isToday(date)) return 'HARI INI';
        if (isYesterday(date)) return 'KEMARIN';
        return format(date, 'dd MMM yyyy', { locale: localeId }).toUpperCase();
    };

    const getCardPropsByStatus = (prismaStatus: string) => {
        switch (prismaStatus) {
            case 'PENDING':
                return {
                    status: 'PENDING' as ReportStatus,
                    messageIcon: <Clock4 size={18} className='text-destructive' />,
                    messageText: 'Menunggu Verifikasi Admin',
                    actionIcon: null,
                    actionText: 'Batalkan Laporan',
                    actionType: 'danger' as const,
                };
            case 'VERIFIED':
            case 'IN_PROGRESS':
                return {
                    status: 'PROSES' as ReportStatus,
                    messageIcon: <TbRosetteDiscountCheckFilled size={22} className='text-[#0A6F66]' />,
                    messageText: 'Laporan Diterima',
                    actionIcon: <MdOutlineEngineering size={18} className='text-zinc-400' />,
                    actionText: 'Tim Lapangan Menuju Lokasi',
                    actionType: 'neutral' as const,
                };
            case 'RESOLVED':
                return {
                    status: 'SELESAI' as ReportStatus,
                    messageIcon: <TbRosetteDiscountCheckFilled size={22} className='text-[#0A6F66]' />,
                    messageText: 'Masalah Teratasi',
                    actionIcon: <LuFileText size={18} />,
                    actionText: 'Lihat Dokumentasi Perbaikan',
                    actionType: 'primary' as const,
                };
            case 'REJECTED':
                return {
                    status: 'DITOLAK' as ReportStatus,
                    messageIcon: <Clock4 size={18} className='text-destructive' />,
                    messageText: 'Laporan Ditolak Admin',
                    actionIcon: <LuFileText size={18} />,
                    actionText: 'Lihat Alasan Penolakan',
                    actionType: 'danger' as const,
                };
            default:
                return {
                    status: 'PENDING' as ReportStatus,
                    messageIcon: <Clock4 size={18} className='text-zinc-400' />,
                    messageText: 'Menunggu',
                    actionIcon: null,
                    actionText: 'Lihat Detail',
                    actionType: 'neutral' as const,
                };
        }
    };

    const renderReportCards = (filteredReports: any[]) => {
        if (isLoading) {
            return (
                <div className='flex flex-col gap-6'>
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className='w-full bg-white border border-zinc-100 rounded-2xl shadow-sm p-4 md:p-5 flex flex-col gap-5'>
                            <div className='flex justify-between items-start gap-4'>
                                <div className='flex items-center gap-4 w-full'>
                                    <Skeleton className='h-14 w-14 md:h-16 md:w-16 rounded-xl shrink-0' />
                                    <div className='flex flex-col gap-3 w-full'>
                                        <Skeleton className='h-4 w-3/4 rounded-lg' />
                                        <Skeleton className='h-3 w-1/3 rounded-lg' />
                                    </div>
                                </div>
                                <Skeleton className='h-6 w-20 rounded-full shrink-0' />
                            </div>
                            <div className='space-y-3 mt-2'>
                                <div className='flex justify-between'>
                                    <Skeleton className='h-2 w-12 rounded-full' />
                                    <Skeleton className='h-2 w-24 rounded-full' />
                                    <Skeleton className='h-2 w-12 rounded-full' />
                                </div>
                                <Skeleton className='h-2.5 w-full rounded-full' />
                            </div>
                            <div className='bg-zinc-50/50 p-3 rounded-xl border border-zinc-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3'>
                                <Skeleton className='h-4 w-2/3 sm:w-1/3 rounded-lg' />
                                <Skeleton className='h-4 w-1/2 sm:w-1/4 rounded-lg' />
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (filteredReports.length === 0) {
            return (
                <div className='flex flex-col items-center justify-center py-12 text-center bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200'>
                    <LuFileText size={40} className='text-zinc-300 mb-3' />
                    <p className='text-zinc-500 font-medium text-sm'>Belum ada laporan di kategori ini.</p>
                </div>
            );
        }

        const totalItems = filteredReports.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentData = filteredReports.slice(startIndex, endIndex);

        const getPageNumbers = () => {
            const pages: (number | 'ellipsis')[] = [];

            if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                if (currentPage > 3) pages.push('ellipsis');
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                for (let i = start; i <= end; i++) pages.push(i);
                if (currentPage < totalPages - 2) pages.push('ellipsis');
                pages.push(totalPages);
            }
            return pages;
        };

        return (
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-6'>
                    {currentData.map((report, index) => {
                        const { status, messageIcon, messageText, actionIcon, actionText, actionType } = getCardPropsByStatus(report.status);

                        return (
                            <ReportCard
                                key={report.id}
                                id={`${report.reportNumber}`}
                                title={report.title}
                                date={formatReportDate(report.createdAt)}
                                status={status}
                                imageSrc={report.imageBefore}
                                messageIcon={messageIcon}
                                messageText={messageText}
                                actionIcon={actionIcon}
                                actionText={actionText}
                                actionType={actionType}
                                delay={index * 0.05}
                                roomCode={report.roomCode}
                            />
                        )
                    })}
                </div>

                {totalPages > 1 && (
                    <div className='flex flex-col items-center gap-4 mt-4 overflow-x-auto no-scrollbar pb-2'>
                        <Pagination className='justify-center'>
                            <Pagination.Content className='gap-2'>
                                <Pagination.Item>
                                    <Pagination.Previous
                                        isDisabled={currentPage === 1}
                                        onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        className='bg-white text-zinc-500 hover:bg-zinc-100 rounded-xl shadow-sm border border-zinc-100 w-10 h-10'
                                    >
                                        <Pagination.PreviousIcon />
                                    </Pagination.Previous>
                                </Pagination.Item>

                                {getPageNumbers().map((p, i) =>
                                    p === 'ellipsis' ? (
                                        <Pagination.Item key={`ellipsis-${i}`}>
                                            <Pagination.Ellipsis className='w-10 h-10 text-zinc-400' />
                                        </Pagination.Item>
                                    ) : (
                                        <Pagination.Item key={p}>
                                            <Pagination.Link
                                                isActive={p === currentPage}
                                                onPress={() => setCurrentPage(p as number)}
                                                className={`w-10 h-10 text-sm font-bold rounded-xl transition-all shadow-sm ${p === currentPage
                                                    ? 'bg-[#0A6F66] text-white'
                                                    : 'bg-white text-zinc-500 hover:bg-zinc-100 border border-zinc-100'
                                                    }`}
                                            >
                                                {p}
                                            </Pagination.Link>
                                        </Pagination.Item>
                                    ),
                                )}

                                <Pagination.Item>
                                    <Pagination.Next
                                        isDisabled={currentPage === totalPages}
                                        onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        className='bg-white text-zinc-500 hover:bg-zinc-100 rounded-xl shadow-sm border border-zinc-100 w-10 h-10'
                                    >
                                        <Pagination.NextIcon />
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </Pagination>
                    </div>
                )}
            </div>

        );
    };

    const handleTabChange = () => {
        setCurrentPage(1);
    };

    const tabItems = useMemo<TabItem[]>(() => [
        {
            id: 'semua',
            label: 'Semua Laporan',
            content: renderReportCards(reports)
        },
        {
            id: 'pending',
            label: 'Pending',
            content: renderReportCards(reports.filter(r => r.status === 'PENDING'))
        },
        {
            id: 'proses',
            label: 'Proses',
            content: renderReportCards(reports.filter(r => r.status === 'VERIFIED' || r.status === 'IN_PROGRESS'))
        },
        {
            id: 'selesai',
            label: 'Selesai',
            content: renderReportCards(reports.filter(r => r.status === 'RESOLVED'))
        }
    ], [reports, isLoading, currentPage]);

    return (
        <div className='flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full'>

            <div className='contents lg:flex lg:flex-col lg:col-span-8 lg:gap-8'>

                <div className='order-1 flex flex-col mb-2 lg:mb-0'>
                    <h1 className='font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl'>Dashboard</h1>
                    <p className='mt-2 text-sm font-normal leading-relaxed text-foreground md:text-base'>
                        Pantau langsung status fasilitas sarana kampus dalam satu dashboard yang real-time dan terpercaya.
                    </p>
                </div>

                <div className='order-3 w-full'>
                    <ReportFilterTabs items={tabItems} onTabChange={handleTabChange} />
                </div>

            </div>

            <div className='contents lg:flex lg:flex-col lg:col-span-4 lg:gap-6'>

                <div className='order-2 w-full'>
                    <StatWidget />
                </div>

                <div className='order-4 w-full'>
                    <NotificationWidget items={notificationData} />
                </div>

                <div className='order-5 w-full'>
                    <HelpWidget />
                </div>

            </div>

        </div>
    );
}