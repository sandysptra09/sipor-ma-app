'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { CheckCircle, Wrench, MessageSquare } from 'lucide-react';
import { Button } from '@heroui/react';

import TitlePage from '@/components/customs/admin/title-page';
import AttachmentCard from '@/components/customs/admin/attachment-card';
import { ReportDetailCard } from '@/components/customs/admin/report-detail-card';
import { ReportLogCard } from '@/components/customs/admin/report-log-card';
import { ConfirmationModal } from '@/components/customs/admin/confirmation-modal';
import { RejectionModal } from '@/components/customs/admin/rejection-modal';
import { UploadProofModal } from '@/components/customs/admin/upload-proof-modal';

import ImgMeja from '@/public/assets/images/meja.jpeg';
import { api } from '@/lib/axios';
import { downloadImage } from '@/lib/helpers/downloadImg';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from "@heroui/react";


export default function ReportDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    const [modal, setModal] = useState<'verify' | 'process' | 'rejected' | 'upload' | null>(null);
    const [reportDetail, setReportDetail] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const { startUpload } = useUploadThing('imageUploader');

    const fetchDetailReport = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/reports/${params.reportNumber}`);
            setReportDetail(res?.data?.data);
            toast.success(res?.data?.message ?? "Detail laporan berhasil dimuat")
        } catch (error) {
            console.error('Gagal mengambil data detail laporan:', error);
            toast.danger("Detail laporan gagal dimuat")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params?.reportNumber) {
            fetchDetailReport();
        }
    }, [params?.reportNumber]);

    const handleUpdateStatus = async (newStatus: string, note?: string, file?: File | null) => {
        setIsUpdating(true);

        try {
            let imageUrl: string | undefined = undefined;

            if (file) {
                const uploadResult = await startUpload([file]);

                if (!uploadResult || uploadResult.length === 0) {
                    throw new Error("Gagal mengunggah gambar bukti perbaikan ke server");
                }

                imageUrl = uploadResult[0].ufsUrl || uploadResult[0].url;
            }

            const payload = {
                status: newStatus,
                note: note,
                imageUrl: imageUrl
            };

            const res = await api.patch(`/admin/reports/${params.reportNumber}/update-status`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            setModal(null);

            toast.success(res?.data?.message ?? "Detail laporan berhasil dimuat")

            await fetchDetailReport();


        } catch (error: any) {
            console.error('Gagal memperbarui status laporan:', error);
            toast.danger("Status laporan gagal diperbarui")
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {reportDetail?.status === 'PENDING' ? (
                <TitlePage loading={loading} title={reportDetail?.title} desc='' isReport verificationAction={() => setModal('verify')} rejectAction={() => setModal('rejected')} />
            ) : reportDetail?.status === 'VERIFIED' ? (
                <TitlePage loading={loading} title={reportDetail?.title} desc='' isReport processAction={() => setModal('process')} />
            ) : reportDetail?.status === 'IN_PROGRESS' ? (
                <TitlePage loading={loading} title={reportDetail?.title} desc='' isReport completedAction={() => setModal('upload')} />
            ) : (
                <TitlePage loading={loading} title={reportDetail?.title} desc='' />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-5">
                    <ReportDetailCard
                        loading={loading}
                        category={reportDetail?.category}
                        submittedAt={reportDetail?.createdAt}
                        reporterInitial={reportDetail?.user?.name}
                        description={reportDetail?.description}
                        location={reportDetail?.location}
                        reporter={`${reportDetail?.user?.name} (${reportDetail?.user?.role === 'STUDENT'
                            ? 'Mahasiswa'
                            : 'Admin'
                            } - ${reportDetail?.user?.nim_nip || '-'})`}
                    />
                    <ReportLogCard loading={loading} logs={reportDetail?.logs} />
                </div>

                <div className="col-span-1 flex flex-col gap-5">
                    <AttachmentCard loading={loading} title='Bukti foto (PROOF)'>
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
                        <AttachmentCard loading={loading} title='Bukti Perbaikan'>
                            <Image
                                alt='Lampiran Sesudah'
                                src={reportDetail?.imageAfter || ImgMeja}
                                width={500}
                                height={500}
                                className='w-full sm:max-w-64 rounded-md object-cover'
                            />
                            <div className='w-full flex flex-col gap-1 mt-2'>
                                <div className='w-full justify-start items-center flex gap-2'>
                                    <MessageSquare size={21} className='text-primary' />
                                    <p className='uppercase font-semibold text-sm tracking-[1.4px]'>Pesan Perbaikan</p>
                                </div>
                                <p className='text-foreground text-sm w-full'>
                                    {reportDetail?.resolvedNote || 'Perbaikan telah selesai dilakukan.'}
                                </p>
                            </div>
                        </AttachmentCard>
                    )}

                    {reportDetail?.status === 'REJECTED' && (
                        <AttachmentCard loading={loading} isRejected title='Pesan Penolakan'>
                            <p className='text-foreground text-sm w-full'>
                                {reportDetail?.rejectionReason || 'Laporan ditolak.'}
                            </p>
                        </AttachmentCard>
                    )}

                    {reportDetail?.status === 'CANCELED' && (
                        <AttachmentCard loading={loading} isRejected title='Pesan Pembatalan'>
                            <p className='text-foreground text-sm w-full'>
                                {reportDetail?.logs[0]?.note || 'Laporan ditolak.'}
                            </p>
                        </AttachmentCard>
                    )}
                </div>
            </div>

            {/* Modals */}
            <ConfirmationModal
                open={modal === 'verify'}
                onClose={() => !isUpdating && setModal(null)}
                onConfirm={() => handleUpdateStatus('VERIFIED')}
                title="Verifikasi Laporan"
                description="Pastikan data pelapor serta foto valid, anda yakin untuk verifikasi laporan ini?"
                confirmLabel={isUpdating ? "Memproses..." : "Verifikasi"}
                icon={CheckCircle}
                variant="primary"
            />

            <ConfirmationModal
                open={modal === 'process'}
                onClose={() => !isUpdating && setModal(null)}
                onConfirm={() => handleUpdateStatus('IN_PROGRESS')}
                title="Proses Laporan"
                description="Apakah anda yakin ingin mengubah status laporan menjadi diproses?"
                confirmLabel={isUpdating ? "Memproses..." : "Ya, Proses"}
                icon={Wrench}
                variant="primary"
            />

            <RejectionModal
                open={modal === 'rejected'}
                onClose={() => !isUpdating && setModal(null)}
                onConfirm={(message) => handleUpdateStatus('REJECTED', message)}
            />

            <UploadProofModal
                open={modal === 'upload'}
                onClose={() => !isUpdating && setModal(null)}
                isLoading={isUpdating}
                onConfirm={(file, message) => handleUpdateStatus('RESOLVED', message, file)}
            />
        </div>
    );
}