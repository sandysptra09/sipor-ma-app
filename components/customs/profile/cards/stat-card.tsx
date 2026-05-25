'use client';

import { Card, Skeleton } from '@heroui/react';
import { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: ReactNode;
    isLoading?: boolean;
}

export default function StatCard({
    title,
    value,
    subtitle,
    icon,
    isLoading = false,
}: StatCardProps) {
    return (
        <Card className='w-full bg-white border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5 md:p-6'>

            <div className='flex flex-row items-start justify-between w-full mb-4'>
                <div className='bg-[#e6f4f1] w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0'>
                    {icon}
                </div>

                <span className='text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-foreground mt-1'>
                    {title}
                </span>
            </div>

            <div className='flex flex-col gap-1'>
                {isLoading ? (
                    <>
                        <Skeleton className='h-10 w-24 rounded-xl' />
                        <Skeleton className='h-5 w-32 rounded-lg' />
                    </>
                ) : (
                    <>
                        <h3 className='text-3xl md:text-4xl font-extrabold text-primary'>
                            {value}
                        </h3>

                        <p className='text-xs md:text-sm font-medium text-zinc-400'>
                            {subtitle}
                        </p>
                    </>
                )}
            </div>

        </Card>
    );
}