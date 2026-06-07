"use client";

import React, { useState, useEffect } from "react";
import SummaryCardReport from "@/components/customs/admin/summary-card-report";
import RecentActivityCard from "@/components/customs/admin/recent-activity-card";
import SummaryReportByCategoryCard from "@/components/customs/admin/summary-report-by-category-card";
import { CustomTableReport } from "@/components/customs/admin/custom-table-report";
import { BadgeCheck, Clock, MapPin, TrendingUp, Eye } from "lucide-react";
import { api } from "@/lib/axios";
import { columns } from "./columns";
import { toast } from "@heroui/react";

interface DashboardStatistic {
    incoming: number;
    inProgress: number;
    completed: number;
}

export default function Page() {
    const [data, setData] = useState<DashboardStatistic | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [reportData, setReportData] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [tableLoading, setTableLoading] = useState<boolean>(true);

    const [recentActivity, setRecentActivity] = useState<any>([])
    const [recentActivityLoading, setRecentActivityLoading] = useState<boolean>(true)

    async function fetchDashboardStatistic() {
        try {
            const res = await fetch(`/api/admin/dashboard/statistic`);
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error('Gagal mengambil statistik', error);
            toast.danger("Gagal memuat statistik dashboard", {
                description: "Terjadi kesalahan saat mengambil data statistik."
            });
        } finally {
            setIsLoading(false);
        }
    }

    const fetchRecentActivityData = async () => {
        try {
            const res = await api.get(`/admin/dashboard/recent-activity`);
            setRecentActivity(res?.data?.data);
        } catch (error) {
            console.error(error);
            toast.danger("Gagal memuat aktivitas terbaru");
        } finally {
            setRecentActivityLoading(false);
        }
    }


    const fetchTableData = async () => {
        try {
            const params = new URLSearchParams();
            params.append('page', currentPage.toString());
            params.append('limit', rowsPerPage.toString());

            const res = await api.get(`/admin/reports?${params.toString()}`);
            const { data, pagination } = res.data;

            setReportData(data);
            setTotalRecords(pagination.totalData);

        } catch (error) {
            console.error('Gagal mengambil data laporan untuk tabel:', error);
            toast.danger("Gagal memuat data laporan");
        } finally {
            setTableLoading(false);
        }
    };

    // fetch intial data
    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setIsLoading(true);
                setRecentActivityLoading(true);
                setTableLoading(true);

                await Promise.all([
                    fetchDashboardStatistic(),
                    fetchRecentActivityData(),
                    fetchTableData(),
                ]);

                toast.success("Dashboard berhasil dimuat");
            } catch (error) {
                console.error(error);

                toast.danger("Gagal memuat dashboard", {
                    description:
                        "Terjadi kesalahan saat mengambil data dashboard.",
                });
            } finally {
                setIsLoading(false);
                setRecentActivityLoading(false);
                setTableLoading(false);
            }
        };

        loadDashboard();
    }, []);

    useEffect(() => {
        fetchTableData();
    }, [currentPage, rowsPerPage]);

    return (
        <div className="grid grid-cols-6 gap-6">
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
                data={recentActivity}
                loading={recentActivityLoading}
            />
            <SummaryReportByCategoryCard
                className='col-span-6 md:col-span-3'
            />

            <div className="col-span-6">
                <CustomTableReport
                    loading={tableLoading}
                    columns={columns}
                    data={reportData}
                    totalRecords={totalRecords}
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