'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import TitlePage from '@/components/customs/admin/title-page';
import { CheckCircle, Mail, UserCheck, Wrench } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { MessageSquare } from 'lucide-react';
import { LogItem } from '@/components/customs/admin/log-item';
import AttachmentCard from '@/components/customs/admin/attachment-card';
import ImgMeja from '@/public/assets/images/meja.jpeg';
import { useSearchParams } from 'next/navigation';
import { ReportDetailCard } from '@/components/customs/admin/report-detail-card';
import { ReportLogCard } from '@/components/customs/admin/report-log-card';
import { ConfirmationModal } from '@/components/customs/admin/confirmation-modal';
import { RejectionModal } from '@/components/customs/admin/rejection-modal';
import { UploadProofModal } from '@/components/customs/admin/upload-proof-modal';
import { api } from '@/lib/axios';
import { downloadImage } from '@/lib/helpers/downloadImg';



const logs = [
    {
        icon: CheckCircle,
        title: "Laporan Diverifikasi",
        description: "Status diubah dari 'Menunggu' ke 'Diverifikasi'",
        actor: "Sistem Otomatis",
        date: "24 Okt",
        time: "09:46",
        iconClassName: "bg-primary/20 text-primary",
    },
    {
        icon: UserCheck,
        title: "Ditugaskan ke Tim Teknis",
        description: "Tiket diteruskan ke Departemen Pemeliharaan Bangunan",
        actor: "Admin Utama",
        date: "24 Okt",
        time: "10:15",
        iconClassName: "bg-foreground/20",
    },
    {
        icon: Mail,
        title: "Pesan Terkirim",
        description: "Konfirmasi Feedback dikirim ke pelapor",
        actor: "Admin Utama",
        date: "24 Okt",
        time: "11:30",
        iconClassName: "bg-foreground/20",
    },
];


export default function ReportDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const [modal, setModal] = useState<'verify' | 'process' | 'rejected' | 'upload' | null>(null);

    const [reportDetail, setReportDetail] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false); 

    // Fetch detail laporan
    const fetchDetailReport = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/reports/${params.reportNumber}`);
            setReportDetail(res?.data?.data);
        } catch (error) {
            console.error('Gagal mengambil data detail laporan:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params?.reportNumber) {
            fetchDetailReport();
        }
    }, [params?.reportNumber]);

    // Fungsi utama untuk update status ke API
    const handleUpdateStatus = async (newStatus: string, note?: string, file?: File | null) => {
        setIsUpdating(true);
        try {
            let payload: any;
            let headers = {};
    
            // Jika ada file (dari UploadProofModal), gunakan FormData
            if (file) {
                const formData = new FormData();
                formData.append('status', newStatus);
                if (note) formData.append('note', note);
                formData.append('file', file);
                
                payload = formData;
                headers = { 'Content-Type': 'multipart/form-data' };
            } else {
                // Jika tidak ada file (Verifikasi / Proses / Tolak), gunakan JSON biasa
                payload = { status: newStatus, note };
                headers = { 'Content-Type': 'application/json' };
            }
    
            await api.patch(`/admin/reports/${params.reportNumber}/update-status`, payload, {
                headers
            });
            
            setModal(null);
            await fetchDetailReport();
        } catch (error) {
            console.error('Gagal memperbarui status laporan:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {reportDetail?.status === 'PENDING' ? (
                <TitlePage title={reportDetail?.title} desc='' isReport verificationAction={() => setModal('verify')} rejectAction={() => setModal('rejected')} />
            ) : reportDetail?.status === 'VERIFIED' ? (
                <TitlePage title={reportDetail?.title} desc='' isReport processAction={() => setModal('process')} />
            ) : reportDetail?.status === 'IN_PROGRESS' ? (
                <TitlePage title={reportDetail?.title} desc='' isReport completedAction={() => setModal('upload')} />
            ) : (
                <TitlePage title={reportDetail?.title} desc='' />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-5">
                    <ReportDetailCard
                        category={reportDetail?.category}
                        submittedAt={reportDetail?.createdAt}
                        reporterInitial="BS"
                        description={reportDetail?.description}
                        location={reportDetail?.location}
                        reporter="Budi Setiawan (Mahasiswa - 20210082)"
                    />
                    <ReportLogCard logs={logs} /> 
                </div>

                <div className="col-span-1 flex flex-col gap-5">
                    <AttachmentCard title='Bukti foto (PROOF)'>
                        <Image
                            alt='Lampiran Sebelum'
                            src={reportDetail?.imageBefore || ImgMeja}
                            width={500}
                            height={500}
                            className='w-full max-w-full sm:max-w-64 rounded-md object-cover'
                        />
                        <Button
                            onPress={() =>
                                downloadImage(
                                    reportDetail?.imageBefore,
                                    `${reportDetail?.reportNumber?.replace('#', '')}.jpg`
                                )
                            }
                            className='w-full sm:max-w-64 bg-background hover:bg-primary/20 text-primary font-semibold border-2 border-dashed rounded-md border-primary py-3 text-xs leading-4'>
                            Unduh Lampiran Original
                        </Button>
                    </AttachmentCard>

                    {reportDetail?.status === 'RESOLVED' && (
                        <AttachmentCard title='Bukti Perbaikan'>
                            <Image
                                alt='Lampiran Sesudah'
                                src={reportDetail?.imageAfter || ImgMeja} // Disambungkan dengan data API jika ada
                                width={500}
                                height={500}
                                className='w-full sm:max-w-64 rounded-md'
                            />
                            <div className='w-full flex flex-col gap-1'>
                                <div className='w-full justify-start items-center flex gap-2'>
                                    <MessageSquare size={21} className='text-primary' />
                                    <p className='uppercase font-semibold text-sm tracking-[1.4px]'>Pesan Perbaikan</p>
                                </div>
                                <p className='text-foreground text-sm'>
                                    {/* Ambil catatan dari log terakhir / yang berstatus RESOLVED */}
                                    {reportDetail?.auditLogs?.find((log: any) => log.status === 'RESOLVED')?.note || 'Perbaikan telah selesai dilakukan.'}
                                </p>
                            </div>
                        </AttachmentCard>
                    )}

                    {reportDetail?.status === 'REJECTED' && (
                        <AttachmentCard isRejected title='Pesan Penolakan'>
                            <p className='text-foreground text-sm'>
                                {/* Ambil pesan penolakan dari data balikan API */}
                                {reportDetail?.auditLogs?.find((log: any) => log.status === 'REJECTED')?.note || 'Laporan ditolak.'}
                            </p>
                        </AttachmentCard>
                    )}
                </div>
            </div>

            {/* Modals Terintegrasi dengan Handle API */}
            <ConfirmationModal
                open={modal === 'verify'}
                onClose={() => setModal(null)}
                onConfirm={() => handleUpdateStatus('VERIFIED')}
                title="Verifikasi Laporan"
                description="Pastikan data pelapor serta foto valid, anda yakin untuk verifikasi laporan ini?"
                confirmLabel={isUpdating ? "Memproses..." : "Verifikasi"}
                icon={CheckCircle}
                variant="primary"
            />

            <ConfirmationModal
                open={modal === 'process'}
                onClose={() => setModal(null)}
                onConfirm={() => handleUpdateStatus('IN_PROGRESS')}
                title="Proses Laporan"
                description="Apakah anda yakin ingin mengubah status laporan menjadi diproses?"
                confirmLabel={isUpdating ? "Memproses..." : "Ya, Proses"}
                icon={Wrench}
                variant="primary"
            />

            <RejectionModal
                open={modal === 'rejected'}
                onClose={() => setModal(null)}
                onConfirm={(message) => handleUpdateStatus('REJECTED', message)}
            />

            <UploadProofModal
                open={modal === 'upload'}
                onClose={() => setModal(null)}
                isLoading={isUpdating} // Kirim state loading
                onConfirm={(file, message) => handleUpdateStatus('RESOLVED', message, file)}
            />
        </div>
    );
}