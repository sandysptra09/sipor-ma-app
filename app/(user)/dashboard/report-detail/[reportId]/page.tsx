import React from 'react'
import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AuditItem from '@/components/customs/report-detail/audit-trail'
import ReportCardReporter from '@/components/customs/report-detail/transparancy-card-reporter';
import ReportCardSarpras from '@/components/customs/report-detail/transparancy-card-sapras';
import InformasiLaporan from '@/components/customs/report-detail/informasi-laporan';
import { ArrowLeft, FileText, History } from "lucide-react";

const stepLaporan = [
    { title: "Laporan Terkirim", description: "Sistem menerima laporan dan memberikan nomor antrean otomatis kepada pelapor.", timestamp: "12 Okt 2024, 09:15" },
    { title: "Verifikasi Admin", description: "Laporan dinyatakan valid oleh tim Sarpras. Koordinasi awal dengan vendor sparepart dimulai.", timestamp: "12 Okt 2024, 11:30" },
    { title: "Penugasan Tim", description: "Tim lapangan ditugaskan ke lokasi (Gedung Baru Lt. 4) dengan membawa peralatan reparasi standar.", timestamp: "13 Okt 2024, 08:00" },
    { title: "Proses Perbaikan", description: "Teknisi sedang melakukan penanganan fisik di unit AC. Penggantian motor kipas internal dilakukan.", timestamp: "12 Okt 2024, 09:15" },
    { title: "Selesai", description: "Masalah teratasi sepenuhnya, pengujian beban listrik berhasil, dan dokumentasi penyelesaian diunggah ke sistem.", timestamp: "14 Okt 2024, 10:00", isCompleted: true },
];



export default function ReportDetailPage() {
    return (
        <div className='w-full bg-card py-8 lg:py-10 pt-10'>
            <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
                <div className='mb-5 overflow-x-auto'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    Riwayat Laporan
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-primary font-bold whitespace-nowrap'>
                                    Detail #REP-2026-001
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>
                    <h1 className='text-primary font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight'>
                        Detail Dokumentasi Perbaikan
                    </h1>

                    {/* <p className='text-primary font-bold text-sm sm:text-base'>
                        selesai
                    </p> */}
                </div>

                {/* div bungkus */}
                <div className='flex flex-col lg:flex-row gap-6 mt-6'>
                    {/* div kiri */}
                    <div className='flex-[2.8]'>
                        {/* div card */}
                        <div className='flex flex-col md:flex-row gap-6'>
                            <ReportCardReporter
                                image="https://mahesasyawala.github.io/siporma/assets/images/before-repair.png"
                                state="SEBELUM"
                                content="AC di Ruang 006 mati total dan berbunyi bising sejak pagi tadi. Mohon segera diperbaiki karena suhu ruangan sangat panas."
                                reporter="Nama Siswa"
                                timestamp="12 Okt 2024, 09:15"
                            />

                            <ReportCardSarpras
                                image="https://mahesasyawala.github.io/siporma/assets/images/after-repair.png"
                                state="SESUDAH"
                                content="Semua komponen sepenuhnya diganti dan kembali berfungsi dengan baik. Filter udara juga sudah dibersihkan"
                                sarpras="Budi Santoso"
                                timestamp="12 Okt 2024, 09:15"
                            />
                        </div>

                        {/* audit */}
                        <div className='mt-5'>
                            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="bg-primary p-2 rounded-lg text-white">
                                        {<History size={15} />}
                                    </div>

                                    <h2 className="font-bold text-primary/80 text-sm sm:text-base">
                                        Audit Trail Laporan
                                    </h2>
                                </div>

                                <div>
                                    {stepLaporan.map((item, index) => (
                                        <AuditItem
                                            key={index}
                                            {...item}
                                            isLast={index === stepLaporan.length - 1}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* div kanan */}
                    <div className='flex-[1.2] flex flex-col gap-5'>
                        {/* report information */}
                        <div>
                            <InformasiLaporan
                                id='#REP-2026-001'
                                location='Gedung Biru Lt. 5, Ruang 314'
                                category='AC'
                                priority='Tinggi'
                            />
                        </div>

                        <div className='bg-primary text-white p-5 rounded-lg flex flex-col gap-3'>
                            <div className='text-lg font-semibold'>
                                <p>Bantuan Teknis?</p>
                            </div>

                            <div className='text-sm leading-relaxed'>
                                Jika fasilitas kembali bermasalah dalam 7
                                hari, Anda dapat mengajukan klaim
                                perbaikan ulang secara gratis.
                            </div>

                            <div className='p-2 text-primary text-center text-sm font-medium bg-teal-50 w-full rounded-md'>
                                <Link href=''>
                                    Hubungi Helpdesk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* button */}
                <div className='flex flex-col sm:flex-row gap-4 justify-between pt-10'>
                    <div className='w-full sm:w-auto'>
                        <div className='p-3 px-6 sm:px-10 text-primary justify-center items-center text-sm font-medium bg-teal-50 border border-primary rounded-md flex gap-3'>
                            <div>
                                {<ArrowLeft size={15} />}
                            </div>

                            <Link href=''>
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className='w-full sm:w-auto'>
                        <div className='py-3 px-6 sm:px-10 text-white justify-center items-center text-sm font-medium bg-primary rounded-md flex gap-3'>
                            <div>
                                {<FileText size={15} />}
                            </div>

                            <Link href=''>
                                Unduh Bukti Laporan(PDF)
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
