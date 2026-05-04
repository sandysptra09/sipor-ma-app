'use client';

import { Tabs } from '@heroui/react';
import { FileSpreadsheet, FileCheck } from 'lucide-react';
import { MdOutlineEngineering } from 'react-icons/md';
import StatCard from '../cards/stat-card';

export default function TransparencyDashboardSection() {
    return (
        <section className='w-full bg-background py-14 lg:py-20'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <Tabs>

                    <div className='mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>

                        <div className='max-w-2xl'>
                            <h2 className='font-heading text-3xl font-extrabold text-[#181C1C] md:text-4xl'>
                                Dashboard Transparansi
                            </h2>
                            <p className='mt-4 text-sm font-normal leading-relaxed text-foreground md:text-base'>
                                Pantau kinerja perbaikan fasilitas secara real-time. Kami berkomitmen pada keterbukaan data setiap langkah.
                            </p>
                        </div>

                        <div className='shrink-0'>
                            <Tabs.ListContainer className='rounded-lg bg-zinc-200/60 p-1'>
                                <Tabs.List aria-label='Filter Waktu Statistik' className='flex'>

                                    <Tabs.Tab id='bulan' className='group relative flex h-10 cursor-pointer items-center justify-center px-4 outline-none'>
                                        <span className='relative z-10 text-xs font-bold tracking-wider text-muted-foreground transition-colors group-data-[selected=true]:text-primary'>
                                            BULAN INI
                                        </span>
                                        <Tabs.Indicator className='absolute inset-0 rounded-md bg-white shadow-sm' />
                                    </Tabs.Tab>

                                    <Tabs.Tab id='tahun' className='group relative flex h-10 cursor-pointer items-center justify-center px-4 outline-none'>
                                        <span className='relative z-10 text-xs font-bold tracking-wider text-muted-foreground transition-colors group-data-[selected=true]:text-primary'>
                                            TAHUNAN
                                        </span>
                                        <Tabs.Indicator className='absolute inset-0 rounded-md bg-white shadow-sm' />
                                    </Tabs.Tab>

                                </Tabs.List>
                            </Tabs.ListContainer>
                        </div>
                    </div>

                    <Tabs.Panel id='bulan'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                            <StatCard icon={<FileSpreadsheet size={24} strokeWidth={2.5} />} iconBg='bg-[#e6f4f1]' iconColor='text-primary' value='1,284' label='Laporan Diterima' delay={0.1} />
                            <StatCard icon={<FileCheck size={24} strokeWidth={2.5} />} iconBg='bg-primary' iconColor='text-white' value='852' label='Selesai' delay={0.2} />
                            <StatCard icon={<MdOutlineEngineering size={24} />} iconBg='bg-[#e6f4f1]' iconColor='text-primary' value='432' label='Dalam Perbaikan' delay={0.3} />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id='tahun'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                            <StatCard icon={<FileSpreadsheet size={24} strokeWidth={2.5} />} iconBg='bg-[#e6f4f1]' iconColor='text-primary' value='15,420' label='Total Laporan' delay={0.1} />
                            <StatCard icon={<FileCheck size={24} strokeWidth={2.5} />} iconBg='bg-primary' iconColor='text-white' value='10,214' label='Total Selesai' delay={0.2} />
                            <StatCard icon={<MdOutlineEngineering size={24} />} iconBg='bg-[#e6f4f1]' iconColor='text-primary' value='5,206' label='Total Perbaikan' delay={0.3} />
                        </div>
                    </Tabs.Panel>

                </Tabs>
            </div>
        </section>
    );
}