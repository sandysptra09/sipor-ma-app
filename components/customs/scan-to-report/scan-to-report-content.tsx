'use client';

import { motion } from 'framer-motion';
import ScannerWidget from './widgets/scanner-widget';
import FallbackWidget from './widgets/fallback-widget';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '@/lib/axios';
import { toast } from '@heroui/react';

export default function ScanToReportContent() {

    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(false);

    const handleScanSuccess = async (qrText: string) => {
        if (!qrText || isVerifying) return;

        setIsVerifying(true);

        const loadingId = toast('Memverifikasi ruangan...', {
            isLoading: true,
            timeout: 0,
        });

        try {
            const res = await api.get(`/rooms/${qrText}`);
            toast.close(loadingId);

            setTimeout(() => {
                toast.success(`Ruangan ditemukan: ${res.data.data.name}`);
                setTimeout(() => {
                    sessionStorage.setItem('isReportingAuthorized', 'true');
                    router.push(`/reporting/${qrText}`);
                }, 1500);
            }, 100);

        } catch (error: any) {
            toast.close(loadingId);

            setTimeout(() => {
                if (error.response?.status === 404) {
                    toast.danger('Ruangan tidak ditemukan! Cek kembali kode ruangan.');
                } else {
                    toast.danger('Gagal menghubungi server. Coba lagi nanti.');
                }
                setIsVerifying(false);
            }, 100);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex flex-col gap-6 md:gap-8 w-full mx-auto'
        >
            <div className='flex flex-col w-full gap-1'>
                <h1 className='font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl'>
                    Scan QR Ruangan
                </h1>
                <p className='mt-2 w-full md:max-w-2xl text-sm font-normal leading-relaxed text-foreground md:text-base'>
                    Arahkan kamera ke QR Code yang terdapat di pintu atau dinding ruangan. Anda juga dapat menggunakan opsi manual untuk memulai laporan.
                </p>
            </div>

            <div className='flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-16 items-start w-full'>

                <div className='flex flex-col w-full md:col-span-5 lg:col-span-5'>
                    <ScannerWidget onScan={handleScanSuccess} />
                </div>

                <div className='flex flex-col w-full md:col-span-7 lg:col-span-7 md:pt-4'>
                    <FallbackWidget onSuccess={handleScanSuccess} />
                </div>

            </div>

        </motion.div>
    );
}