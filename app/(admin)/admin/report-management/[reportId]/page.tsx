'use client';

import React, { useState } from 'react';

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
    const searchParams = useSearchParams()
    const status = searchParams.get('status')
    const [modal, setModal] = useState<'verify' | 'process' | 'rejected' | 'upload' | null>(null)

    return (
        <div className="flex flex-col gap-5">

            {status == 'pending' ? (
                <TitlePage title='Meja Dosen' desc='' isReport verificationAction={() => setModal('verify')} rejectAction={() => setModal('rejected')} />
            ) : status == 'verified' ? (
                <TitlePage title='Meja Dosen' desc='' isReport processAction={() => setModal('process')} />
            ) : status == 'process' ? (
                <TitlePage title='Meja Dosen' desc='' isReport completedAction={() => setModal('upload')} />
            ) : (
                <TitlePage title='Meja Dosen' desc='' />
            )}

            {/* Grid utama: 1 kolom di mobile, 3 kolom di lg ke atas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Kiri: full width di mobile, 2/3 di lg */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-5">
                    <ReportDetailCard
                        category="furniture"
                        submittedAt="24 Okt 2023, 09:45 WIB"
                        reporterInitial="BS"
                        description="Terjadi kerusakan cukup parah pada bagian kaki meja dosen di ruang Lab Fisika Dasar. Salah satu kaki meja patah sehingga menyebabkan meja menjadi tidak stabil dan berpotensi roboh saat digunakan. Kerusakan diduga akibat beban berlebih dan usia pemakaian yang sudah lama. Perlu penanganan segera untuk mencegah risiko kecelakaan serta memastikan keamanan dan kenyamanan dalam kegiatan perkuliahan."
                        location="Gedung Baru, 04,005"
                        reporter="Budi Setiawan (Mahasiswa - 20210082)"
                    />
                    <ReportLogCard logs={logs} />
                </div>

                {/* Kanan: full width di mobile, 1/3 di lg */}
                <div className="col-span-1 flex flex-col gap-5">
                    <AttachmentCard title='Bukti foto (PROOF)'>
                        <Image
                            alt='meja'
                            src={ImgMeja}
                            className='w-full max-w-full sm:max-w-64 rounded-md'
                        />
                        <Button className='w-full sm:max-w-64 bg-background hover:bg-primary/20 text-primary font-semibold border-2 border-dashed rounded-md border-primary py-3 text-xs leading-4'>
                            Unduh Lampiran Original
                        </Button>
                    </AttachmentCard>

                    {status == 'completed' && (
                        <AttachmentCard title='Bukti Perbaikan'>
                            <Image
                                alt='meja'
                                src={ImgMeja}
                                className='w-full sm:max-w-64 rounded-md'
                            />
                            <div className='w-full flex flex-col gap-1'>
                                <div className='w-full justify-start items-center flex gap-2'>
                                    <MessageSquare size={21} className='text-primary' />
                                    <p className='uppercase font-semibold text-sm tracking-[1.4px]'>Pesan Perbaikan</p>
                                </div>
                                <p className='text-foreground text-sm'>Meja Telah diganti Dengan yang baru</p>
                            </div>
                        </AttachmentCard>
                    )}

                    {status == 'rejected' && (
                        <AttachmentCard isRejected title='Pesan Penolakan'>
                            <p className='text-foreground text-sm'>Laporan tidak valid ruangan yang anda maksud adalah WC</p>
                        </AttachmentCard>
                    )}
                </div>
            </div>

            {/* Modals */}
            <ConfirmationModal
                open={modal === 'verify'}
                onClose={() => setModal(null)}
                onConfirm={() => console.log('verify')}
                title="Verifikasi Laporan"
                description="Pastikan data pelapor serta foto valid, anda yakin untuk verifikasi laporan ini?"
                confirmLabel="Verifikasi"
                icon={CheckCircle}
                variant="primary"
            />
            <ConfirmationModal
                open={modal === 'process'}
                onClose={() => setModal(null)}
                onConfirm={() => console.log('process')}
                title="Proses Laporan"
                description="Apakah anda yakin ingin mengubah status laporan menjadi diproses?"
                confirmLabel="Ya, Proses"
                icon={Wrench}
                variant="primary"
            />
            <RejectionModal
                open={modal === 'rejected'}
                onClose={() => setModal(null)}
                onConfirm={(message) => {
                    console.log('pesan penolakan:', message)
                    setModal(null)
                }}
            />
            <UploadProofModal
                open={modal === 'upload'}
                onClose={() => setModal(null)}
                onConfirm={(file, message) => {
                    console.log('file:', file)
                    console.log('pesan:', message)
                    setModal(null)
                }}
            />
        </div>
    )
}