'use client';

import Image from 'next/image';
import { Card, Chip, ProgressBar } from '@heroui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export type ReportStatus = 'PENDING' | 'PROSES' | 'SELESAI' | 'DITOLAK';

export interface ReportCardProps {
    id: string;
    title: string;
    date: string;
    status: ReportStatus;
    imageSrc: string;
    messageIcon?: ReactNode;
    messageText: string;
    actionIcon?: ReactNode;
    actionText: string;
    actionType?: 'neutral' | 'danger' | 'primary';
    delay?: number;
    roomCode?: string;
    onCancelClick?: (id: string) => void;
}

export default function ReportCard({
    id,
    title,
    date,
    status,
    imageSrc,
    messageIcon,
    messageText,
    actionIcon,
    actionText,
    actionType = 'neutral',
    delay = 0,
    roomCode,
    onCancelClick,
}: ReportCardProps) {

    const router = useRouter();

    const statusConfig = {
        PENDING: {
            chipBg: 'bg-red-100',
            chipText: 'text-destructive',
            label: 'PENDING',
            progressValue: 15,
        },
        PROSES: {
            chipBg: 'bg-[#e6f4f1]',
            chipText: 'text-[#0A6F66]',
            label: 'SEDANG DIPROSES',
            progressValue: 50,
        },
        SELESAI: {
            chipBg: 'bg-[#A7E9D1]',
            chipText: 'text-[#0A6F66]',
            label: 'SELESAI',
            progressValue: 100,
        },
        DITOLAK: {
            chipBg: 'bg-red-100',
            chipText: 'text-destructive',
            label: 'DITOLAK',
            progressValue: 100,
        }
    };

    const config = statusConfig[status];

    const actionTextColor =
        actionType === 'danger' ? 'text-destructive font-semibold' :
            actionType === 'primary' ? 'text-[#004C3F] font-semibold' :
                'text-foreground font-medium';

    const cleanReportId = id.replace('#', '').toLowerCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
        >
            <Card
                onClick={() => router.push(`/dashboard/report-detail/${cleanReportId}`)}
                className='w-full bg-white border-none rounded-2xl cursor-pointer transition-all duration-200 hover:bg-zinc-50 hover:shadow-sm'
            >

                <Card.Content className='p-2'>

                    <div className='flex flex-col sm:flex-row justify-between items-start gap-4'>
                        <div className='flex items-center gap-5'>
                            <div className='relative h-14 w-14 md:h-16 md:w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100'>
                                <Image
                                    src={imageSrc}
                                    alt={title}
                                    fill
                                    className='object-cover'
                                    sizes='(max-width: 768px) 56px, 64px'
                                    unoptimized
                                />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='text-sm md:text-lg font-semibold text-[#181C1C]'>{title} {roomCode}</h3>
                                <p className='text-xs font-normal text-muted-foreground uppercase tracking-wider'>
                                    ID: {id} • {date}
                                </p>
                            </div>
                        </div>

                        <Chip className={`rounded-full px-3 py-1 border-none ${config.chipBg}`}>
                            <Chip.Label className={`font-semibold text-xs tracking-wider ${config.chipText}`}>
                                {config.label}
                            </Chip.Label>
                        </Chip>
                    </div>

                    <div className='mt-6'>
                        <div className='flex justify-between text-[10px] font-semibold tracking-wider mb-1'>
                            <span className={status === 'PENDING' || status === 'PROSES' || status === 'SELESAI' ? 'text-[#0A6F66]' : 'text-zinc-400'}>
                                PENDING
                            </span>
                            <span className={status === 'PROSES' || status === 'SELESAI' ? 'text-[#0A6F66] text-center' : 'text-zinc-400 text-center'}>
                                SEDANG DIPROSES
                            </span>
                            <span className={status === 'SELESAI' ? 'text-[#0A6F66] text-right' : status === 'DITOLAK' ? 'text-destructive text-right' : 'text-zinc-400 text-right'}>
                                {status === 'DITOLAK' ? 'DITOLAK' : 'SELESAI'}
                            </span>
                        </div>

                        <ProgressBar
                            aria-label={`Progress laporan: ${config.label}`}
                            value={config.progressValue}
                            className='w-full'
                        >
                            <ProgressBar.Track className='h-2 bg-zinc-200/60 rounded-full border-none'>
                                <ProgressBar.Fill className={`${status === 'DITOLAK' ? 'bg-destructive' : 'bg-[#0A6F66]'} rounded-full`} />
                            </ProgressBar.Track>
                        </ProgressBar>
                    </div>

                    <div className='mt-4 md:mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                        <div className='flex items-center gap-2 text-[13px] text-[#181C1C] font-medium'>
                            {messageIcon && <span className='text-primary'>{messageIcon}</span>}
                            <span>{messageText}</span>
                        </div>

                        {actionText === 'Batalkan Laporan' ? (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onCancelClick) onCancelClick(id);
                                }}
                                className={`flex items-center gap-2 text-[12px] md:text-[13px] cursor-pointer ${actionTextColor} hover:opacity-70 transition-opacity`}
                            >
                                {actionIcon}
                                {actionText}
                            </div>
                        ) : (
                            <Link
                                href={`/dashboard/report-detail/${cleanReportId}`}
                                className={`flex items-center gap-2 text-[12px] md:text-[13px] ${actionTextColor} hover:opacity-70 transition-opacity`}
                            >
                                {actionIcon}
                                {actionText}
                            </Link>
                        )}
                    </div>

                </Card.Content>
            </Card>
        </motion.div>
    );
}