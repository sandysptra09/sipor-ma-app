'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { Skeleton } from '@heroui/react'

const chartData = [
    { month: 'Januari', incoming: 45, completed: 30 },
    { month: 'Februari', incoming: 52, completed: 48 },
    { month: 'Maret', incoming: 38, completed: 35 },
    { month: 'April', incoming: 65, completed: 50 },
    { month: 'Mei', incoming: 48, completed: 45 },
    { month: 'Juni', incoming: 55, completed: 52 },
    { month: 'Juli', incoming: 60, completed: 55 },
    { month: 'Agustus', incoming: 50, completed: 40 },
]

const chartConfig = {
    incoming: {
        label: 'Laporan Masuk',
        color: '#FFB300',
    },
    completed: {
        label: 'Selesai Diperbaiki',
        color: '#10b981',
    },
} satisfies ChartConfig

interface ChartStatisticProps {
    loading?: boolean;
}

export default function ChartStatistic({ loading }: ChartStatisticProps) {

    if (loading) {
        return (
            <div className='flex flex-col gap-4 p-6 bg-white border rounded-xl shadow-sm w-full'>
                <div className='space-y-2'>
                    <Skeleton className="h-6 w-62.5 rounded-lg" />
                    <Skeleton className="h-4 w-87.5 max-w-full rounded-lg" />
                </div>
                <Skeleton className="min-h-87.5 w-full mt-4 rounded-xl" />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4 p-6 bg-white border rounded-xl shadow-sm'>
            <div className='space-y-1'>
                <h2 className='text-xl font-semibold tracking-tight'>Statistik Laporan Bulanan</h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Menampilkan perbandingan laporan masuk dan selesai dari Januari - Agustus 2026.
                </p>
            </div>

            <ChartContainer config={chartConfig} className='min-h-87.5 w-full mt-4'>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray='3 3' />
                    <XAxis
                        dataKey='month'
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />

                    <Bar dataKey='incoming' fill='var(--color-incoming)' radius={[4, 4, 0, 0]} />
                    <Bar dataKey='completed' fill='var(--color-completed)' radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}