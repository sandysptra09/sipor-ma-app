'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ReportingForm from './forms/reporting-form';
import ReportStepsCard from './cards/report-steps-card';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

interface ReportingContentProps {
    roomCode: string;
}

export default function ReportingContent({ roomCode }: ReportingContentProps) {
    const router = useRouter();

    const [fullLocation, setFullLocation] = useState<string>(roomCode);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const res = await api.get(`/rooms/${roomCode}`);
                const data = res.data.data;

                setFullLocation(`${data.building} - ${data.name} - ${data.code}`);
            } catch (error) {
                console.error('Gagal mengambil data ruangan:', error);
            } finally {
                setIsLoadingLocation(false);
            }
        };

        fetchRoomData();
    }, [roomCode]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex flex-col w-full max-w-3xl mx-auto gap-6'
        >
            <div className='flex items-center gap-4 w-full'>
                <div className='flex flex-col'>
                    <h1 className='font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl'>
                        Detail Laporan
                    </h1>
                    <p className='mt-2 w-full md:max-w-2xl text-sm font-normal leading-relaxed text-foreground md:text-base'>
                        Sistem AI akan menganalisa laporan berdasarkan foto yang Anda unggah.
                    </p>
                </div>
            </div>

            <ReportingForm
                roomCode={roomCode}
                fullLocation={fullLocation}
                isLoadingLocation={isLoadingLocation}
            />

            <ReportStepsCard />

        </motion.div>
    );
}