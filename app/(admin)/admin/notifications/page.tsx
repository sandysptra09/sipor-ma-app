'use client';

import ReportNotificationCard, { ReportData } from '@/components/customs/admin/report-notification-card';
import TitlePage from '@/components/customs/admin/title-page'
import React, { useState, useEffect } from 'react'
import { Skeleton, Card, toast } from '@heroui/react';
import { api } from '@/lib/axios';

export default function AdminNotificationsPage() {
    // States untuk data dan meta
    const [data, setData] = useState<ReportData[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // States untuk Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);

            try {
                const res = await api.get("/admin/notifications", {
                    params: {
                        page: currentPage,
                        limit: rowsPerPage,
                    },
                });

                const { data, meta, message } = res.data;

                setData(data || []);
                setTotalRecords(meta?.totalRecords || 0);
                toast.success(message ?? "Data notifikasi berhasil dimuat")

            } catch (error) {
                console.error(
                    "Terjadi kesalahan sistem saat fetch notifikasi:",
                    error
                );
                toast.danger("Data notifikasi gagal dimuat")
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, [currentPage, rowsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    return (
        <div className='flex flex-col gap-6'>
            <TitlePage title='Notifikasi' desc='Pembaruan dan Pemberitahuan Laporan terbaru yang masuk' />

            {isLoading ? (
                <Card className="w-full bg-white rounded-lg shadow-md ring-0 overflow-hidden border border-gray-100 p-8">
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex gap-4 items-start border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                                <Skeleton className="flex rounded-lg w-12 h-12 shrink-0" />
                                <div className="w-full flex flex-col gap-2 mt-1">
                                    <div className="flex justify-between items-center w-full">
                                        <Skeleton className="h-4 w-2/5 rounded-lg" />
                                        <Skeleton className="h-3 w-16 rounded-lg" />
                                    </div>
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                    <Skeleton className="h-3 w-1/6 rounded-lg mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4 border-t mt-4">
                        <Skeleton className="h-9 w-32 rounded-md" />
                        <div className="flex gap-2">
                            <Skeleton className="h-9 w-20 rounded-md" />
                            <Skeleton className="h-9 w-32 rounded-md hidden sm:block" />
                            <Skeleton className="h-9 w-20 rounded-md" />
                        </div>
                    </div>
                </Card>
            ) : (
                <ReportNotificationCard
                    data={data}
                    totalRecords={totalRecords}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsChange}
                />
            )}
        </div>
    )
}