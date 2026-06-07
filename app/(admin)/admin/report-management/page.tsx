"use client";

import { CustomTableReport } from '@/components/customs/admin/custom-table-report'
import React, { useEffect, useState } from 'react'
import { ReportFilter } from "@/components/customs/admin/report-filter";
import TitlePage from "@/components/customs/admin/title-page";
import { api } from "@/lib/axios";
import { columns } from "./columns";
import { toast } from "@heroui/react";

export default function ReportManagementPage() {

    const [buildingOptions, setBuildingOptions] = useState<any[]>([])
    const [reportData, setReportData] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const [loading, setLoading] = useState<boolean>(true);
    const [buildingLoading, setBuildingLoading] = useState<boolean>(false);
    const [refetch, setRefetch] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [selectedGedung, setSelectedGedung] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedPriority, setSelectedPriority] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleReset = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setSelectedGedung("");
        setSelectedStatus("");
        setSelectedPriority("");
        setSearchQuery("");
        setCurrentPage(1);
        setRefetch(prev => prev + 1);
    };

    const handleFilter = () => {
        setCurrentPage(1);
        setRefetch(prev => prev + 1);
    };

    const fetchReportsData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            params.append('page', currentPage.toString());
            params.append('limit', rowsPerPage.toString());

            if (searchQuery) {
                params.append('keyword', searchQuery);
            }
            if (selectedGedung) {
                params.append('building', selectedGedung.replace("gedung-", "gedung "));
            }
            if (selectedStatus) {
                params.append('status', selectedStatus.toUpperCase());
            }
            if (selectedPriority) {
                params.append('priority', selectedPriority.toUpperCase());
            }
            if (startDate) {
                params.append('startDate', startDate.toISOString());
            }
            if (endDate) {
                params.append('endDate', endDate.toISOString());
            }

            const res = await api.get(`/admin/reports?${params.toString()}`);

            const { data, pagination, message } = res.data;

            setReportData(data);
            setTotalRecords(pagination.totalData);

            toast.success(message ?? "Data laporan berhasil dimuat")
        } catch (error) {
            console.error('Gagal mengambil data laporan:', error);
            toast.danger("Data laporan gagal dimuat")

        } finally {
            setLoading(false);
        }
    };

    const fetchBuildingsData = async () => {
        setBuildingLoading(true);
        try {
            const res = await api.get(`/admin/options/buildings`);
            setBuildingOptions(res?.data?.data);
        } catch (error) {
            console.error('Gagal mengambil data laporan:', error);
        } finally {
            setBuildingLoading(false);
        }
    }

    useEffect(() => {
        fetchBuildingsData();
    }, []);

    useEffect(() => {
        fetchReportsData();
    }, [currentPage, rowsPerPage, refetch]);

    return (
        <div className='flex flex-col gap-8'>
            <TitlePage title="Manajemen Laporan" desc="Kelola dan pantau status pemeliharaan fasilitas kampus" />

            <ReportFilter
                loading={buildingLoading}
                buildingOptions={buildingOptions}
                startDate={startDate}
                endDate={endDate}
                selectedGedung={selectedGedung}
                selectedStatus={selectedStatus}
                selectedPriority={selectedPriority}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onGedungChange={setSelectedGedung}
                onStatusChange={setSelectedStatus}
                onPriorityChange={setSelectedPriority}
                onFilter={handleFilter}
                onReset={handleReset}
            />

            <CustomTableReport
                loading={loading}
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
    )
}