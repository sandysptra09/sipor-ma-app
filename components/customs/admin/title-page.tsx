'use client';

import { Button } from '@/components/ui/button';
import React from 'react'

interface TitlePageProps {
    title: string;
    desc: string;
    isReport?: boolean;
    verificationAction?: () => void;
    rejectAction?: () => void;
    processAction?: () => void;
    completedAction?: () => void;
}

export default function TitlePage({ title, desc, isReport = false, verificationAction, rejectAction, processAction, completedAction }: TitlePageProps) {
    return (
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex flex-col gap-1 items-center lg:items-start'>
                <h1 className='text-3xl sm:text-4xl font-bold font-heading'>{title}</h1>
                <p className='text-foreground text-center'>{desc}</p>
            </div>

            {isReport && completedAction ? (
                <div className='flex gap-2 justify-center'>
                    <Button className='w-fit sm:w-auto px-5' onClick={completedAction}>
                        Selesaikan Laporan
                    </Button>
                </div>
            ) : isReport && processAction ? (
                <div className='flex flex-col sm:flex-row items-center md:justify-center gap-2'>
                    <Button className='w-full md:w-fit sm:w-auto px-5 bg-white text-primary border-2 border-primary hover:bg-primary/20' onClick={processAction}>
                        Tandai Sedang Diproses
                    </Button>
                </div>
            ) : isReport ? (
                <div className='flex flex-col sm:flex-row items-center md:justify-center gap-2'>
                    <Button className='w-full md:w-fit sm:w-auto px-5' onClick={verificationAction}>
                        Verifikasi Laporan
                    </Button>
                    <Button className='w-full md:w-fit sm:w-auto px-5 bg-destructive hover:bg-destructive/80' onClick={rejectAction}>
                        Tolak Laporan
                    </Button>
                </div>
            ) : null}
        </div>
    )
}