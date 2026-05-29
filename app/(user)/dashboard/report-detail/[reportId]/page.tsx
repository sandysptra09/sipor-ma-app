"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@heroui/react"; 

import AuditItem from '@/components/customs/report-detail/audit-trail';
import ReportCardReporter from '@/components/customs/report-detail/transparancy-card-reporter';
import ReportCardSarpras from '@/components/customs/report-detail/transparancy-card-sapras';
import InformasiLaporan from '@/components/customs/report-detail/informasi-laporan';
import { ArrowLeft, FileText, History, Loader2 } from "lucide-react";

export default function ReportDetailPage() {
    const params = useParams();
    const router = useRouter();
    
    const [report, setReport] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReportDetail = async () => {
            try {
                const res = await fetch(`/api/reports/${params.reportId}`);
                if (!res.ok) throw new Error("Gagal mengambil data");
                
                const data = await res.json();
                setReport(data);
            } catch (error) {
                console.error("Error:", error);
                router.push('/dashboard'); 
            } finally {
                setIsLoading(false);
            }
        };

        if (params.reportId) {
            fetchReportDetail();
        }
    }, [params.reportId, router]);

    // SKELETON
    if (isLoading) {
        return (
            <div className='w-full bg-card py-8 lg:py-10 pt-10'>
                <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-5'>
                        <Skeleton className="h-5 w-48 rounded-md" />
                    </div>

                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>
                        <Skeleton className="h-10 w-3/4 sm:w-1/2 rounded-lg" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6 mt-6'>
                        <div className='flex-[2.8]'>
                            <div className='flex flex-col md:flex-row gap-6'>
                                <div className="w-full md:w-1/2 h-80 rounded-2xl overflow-hidden shadow-sm">
                                   <Skeleton className="h-full w-full" />
                                </div>
                                <div className="w-full md:w-1/2 h-80 rounded-2xl overflow-hidden shadow-sm">
                                   <Skeleton className="h-full w-full" />
                                </div>
                            </div>

                            <div className='mt-5'>
                                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-6">
                                    <Skeleton className="h-6 w-40 rounded-md" />
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex gap-4">
                                                <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-4 w-1/3 rounded" />
                                                    <Skeleton className="h-3 w-3/4 rounded" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex-[1.2] flex flex-col gap-5'>
                            <div className="bg-white p-5 rounded-lg shadow-md w-full space-y-5">
                                <Skeleton className="h-5 w-32 rounded" />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <Skeleton className="h-8 w-8 rounded shrink-0" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-3 w-1/2 rounded" />
                                                <Skeleton className="h-3 w-3/4 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="w-full h-40 rounded-lg overflow-hidden">
                                <Skeleton className="h-full w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full bg-card py-8 lg:py-10 pt-10'>
            <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
                <div className='mb-5 overflow-x-auto'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Riwayat Laporan</BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-primary font-bold whitespace-nowrap'>
                                    Detail {report?.reportNumber}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>
                    <h1 className='text-primary font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight'>
                        Detail Dokumentasi Perbaikan
                    </h1>
                    
                    <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                        report?.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        report?.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        report?.status === 'RESOLVED' ? 'bg-[#A7E9D1] text-[#0A6F66]' :
                        'bg-teal-100 text-primary' 
                    }`}>
                        {report?.status.replace('_', ' ')}
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-6 mt-6'>
                    {/* Kolom Kiri */}
                    <div className='flex-[2.8]'>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <ReportCardReporter
                                image={report?.imageBefore || "https://mahesasyawala.github.io/siporma/assets/images/before-repair.png"}
                                state="SEBELUM"
                                content={report?.description || "Deskripsi tidak tersedia."}
                                reporter={report?.user?.name || "Mahasiswa"}
                                timestamp={new Date(report?.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            />

                            {/* teks dan gambar menyesuaikan */}
                            <ReportCardSarpras
                                
                                image={report?.imageAfter || "https://placehold.co/600x400/f4f4f5/a1a1aa?text=Belum+Ada+Dokumentasi"}
                                state="SESUDAH"
                                
                                content={report?.imageAfter ? "Semua komponen sepenuhnya diganti dan kembali berfungsi dengan baik." : "Laporan masih dalam antrean. Menunggu tindak lanjut dan dokumentasi perbaikan dari tim Sarpras."}
                                sarpras={report?.admin?.name || "Menunggu Admin"}
                                
                                timestamp={report?.imageAfter ? new Date(report?.updatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-"}
                            />
                        </div>

                        <div className='mt-5'>
                            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="bg-primary p-2 rounded-lg text-white">
                                        <History size={15} />
                                    </div>
                                    <h2 className="font-bold text-primary/80 text-sm sm:text-base">
                                        Audit Trail Laporan
                                    </h2>
                                </div>

                                <div>
                                    {report?.logs && report.logs.length > 0 ? (
                                        report.logs.map((log: any, index: number) => (
                                            <AuditItem
                                                key={log.id}
                                                title={`Status: ${log.status.replace('_', ' ')}`}
                                                description={log.note || "Sistem mencatat perubahan status pada laporan."}
                                                timestamp={new Date(log.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                isCompleted={true}
                                                isLast={index === report.logs.length - 1}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">Belum ada riwayat proses.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan */}
                    <div className='flex-[1.2] flex flex-col gap-5'>
                        <div>
                            <InformasiLaporan
                                id={report?.reportNumber}
                                location={report?.roomCode}
                                category={report?.category}
                                priority={report?.priority}
                            />
                        </div>

                        <div className='bg-primary text-white p-5 rounded-lg flex flex-col gap-3'>
                            <div className='text-lg font-semibold'>
                                <p>Bantuan Teknis?</p>
                            </div>
                            <div className='text-sm leading-relaxed'>
                                Jika fasilitas kembali bermasalah dalam 7 hari, Anda dapat mengajukan klaim perbaikan ulang secara gratis.
                            </div>
                            <div className='p-2 text-primary text-center text-sm font-medium bg-teal-50 w-full rounded-md hover:bg-teal-100 transition-colors'>
                                <Link href='/helpdesk' className='block w-full'>
                                    Hubungi Helpdesk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-between pt-10'>
                    <div className='w-full sm:w-auto'>
                        <Link href='/dashboard'>
                            <div className='p-3 px-6 sm:px-10 text-primary justify-center items-center text-sm font-medium bg-teal-50 border border-primary rounded-md flex gap-3 hover:bg-teal-100 transition-colors'>
                                <ArrowLeft size={15} />
                                Kembali ke Dashboard
                            </div>
                        </Link>
                    </div>

                    <div className='w-full sm:w-auto'>
                        <button className='w-full py-3 px-6 sm:px-10 text-white justify-center items-center text-sm font-medium bg-primary rounded-md flex gap-3 hover:bg-primary/90 transition-colors'>
                            <FileText size={15} />
                            Unduh Bukti Laporan(PDF)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}