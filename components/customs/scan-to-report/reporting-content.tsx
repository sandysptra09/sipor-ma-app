'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ReportingForm from './forms/reporting-form';
import ReportStepsCard from './cards/report-steps-card';

interface ReportingContentProps {
    roomCode: string;
}

export default function ReportingContent({ roomCode }: ReportingContentProps) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col w-full max-w-3xl mx-auto gap-6"
        >
            <div className="flex items-center gap-4 w-full">
                <div className="flex flex-col">
                    <h1 className="font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl">
                        Detail Laporan
                    </h1>
                    <p className="mt-2 w-full md:max-w-2xl text-sm font-normal leading-relaxed text-foreground md:text-base">
                        Sistem AI akan menganalisa laporan berdasarkan foto yang Anda unggah.
                    </p>
                </div>
            </div>

            <ReportingForm roomCode={roomCode} />

            <ReportStepsCard />

        </motion.div>
    );
}