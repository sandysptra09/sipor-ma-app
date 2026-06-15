'use client';

import Link from 'next/link';
import { Camera } from 'lucide-react';
import { Skeleton } from '@heroui/react';

interface ScanShortcutWidgetProps {
    loading?: boolean;
}

export default function ScanShortcutWidget({ loading }: ScanShortcutWidgetProps) {

    if (loading) {
        return (
            <div className='hidden lg:flex w-full'>
                <div className='w-full p-5 rounded-2xl flex items-center justify-between shadow-sm border border-zinc-100 bg-white dark:bg-zinc-900 dark:border-zinc-800'>
                    <div className='flex flex-col gap-3 w-full'>
                        <Skeleton className='h-6 w-3/5 rounded-lg' />
                        <Skeleton className='h-4 w-2/5 rounded-lg' />
                    </div>
                    <Skeleton className='h-12 w-12 rounded-full shrink-0 ml-4' />
                </div>
            </div>
        );
    }

    return (
        <div className='hidden lg:flex w-full'>
            <Link
                href='/scan'
                className='w-full group relative overflow-hidden bg-[#0A6F66] hover:bg-[#085a53] text-white p-5 rounded-2xl flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md'
            >
                <div className='absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer' />

                <div className='flex flex-col relative z-10'>
                    <span className='font-semibold text-lg'>Buat Laporan Baru</span>
                    <span className='text-white/80 text-sm'>Scan QR code ruangan</span>
                </div>

                <div className='bg-white/20 p-3 rounded-full relative z-10 group-hover:scale-110 transition-transform duration-300'>
                    <Camera size={24} className='text-white' />
                </div>
            </Link>
        </div>
    );
}