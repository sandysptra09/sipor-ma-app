'use client';

import { Card, Chip } from '@heroui/react';
import { motion } from 'framer-motion';

export interface StatData {
    total: number;
    chipText: string;
    proses: number;
    selesai: number;
}

interface StatWidgetProps {
    data: StatData;
}

export default function StatWidget({ data }: StatWidgetProps) {

    const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className='flex flex-col gap-4'>
                <Card className='w-full bg-[#0A6F66] text-white border-none rounded-2xl shadow-sm'>
                    <Card.Content className='p-2'>
                        <p className='text-[11px] font-bold tracking-widest text-white/80 mb-3 uppercase'>
                            Total Laporan
                        </p>
                        <h3 className='text-4xl font-bold mb-4'>{data.total}</h3>
                        <Chip className='bg-white/20 w-fit border-none rounded-full px-3 py-1'>
                            <span className='text-xs font-normal text-white'>{data.chipText}</span>
                        </Chip>
                    </Card.Content>
                </Card>

                <div className='grid grid-cols-2 gap-4'>
                    <Card className='bg-[#A7E9D1] border-none rounded-2xl'>
                        <Card.Content className='p-2'>
                            <p className='text-[10px] font-bold tracking-widest text-[#0A6F66] mb-2 uppercase'>
                                Proses
                            </p>
                            <h4 className='text-2xl font-bold text-[#4C6860]'>
                                {formatNumber(data.proses)}
                            </h4>
                        </Card.Content>
                    </Card>

                    <Card className='bg-[#E7F4F3] border-none rounded-2xl'>
                        <Card.Content className='p-2'>
                            <p className='text-[10px] font-bold tracking-widest text-muted-foreground mb-2 uppercase'>
                                Selesai
                            </p>
                            <h4 className='text-2xl font-bold text-[#004C3F]'>
                                {formatNumber(data.selesai)}
                            </h4>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}