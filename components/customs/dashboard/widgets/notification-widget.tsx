'use client';

import { Button, Card } from '@heroui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface NotificationItem {
    id: string | number;
    icon: ReactNode;
    message: ReactNode;
    time: string;
}

interface NotificationWidgetProps {
    items: NotificationItem[];
}

export default function NotificationWidget({ items }: NotificationWidgetProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <Card className='w-full bg-[#F0F4F3] border border-[#EAEAED] rounded-2xl'>
                <Card.Content className='p-2'>

                    <div className='flex justify-between items-center mb-6'>
                        <h3 className='font-semibold text-base text-[#0A6F66]'>Notifikasi Baru</h3>
                        <div className='h-2 w-2 rounded-full bg-destructive' />
                    </div>

                    <div className='flex flex-col gap-5'>
                        {items.map((notif) => (
                            <div key={notif.id} className='flex gap-4 items-start'>
                                <div className='mt-1 h-8 w-8 shrink-0 rounded-full bg-[#004C3F1A] flex items-center justify-center text-[#0A6F66]'>
                                    {notif.icon}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='text-[13px] font-medium text-[#181C1C] leading-snug'>
                                        {notif.message}
                                    </div>
                                    <span className='text-[10px] font-normal uppercase tracking-wider text-muted-foreground'>
                                        {notif.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        variant='outline'
                        className='mt-6 w-full py-2.5 rounded-lg border border-[#004C3F33] text-[#0D9488] font-semibold text-[13px]'
                    >
                        Lihat Semua Aktivitas
                    </Button>

                </Card.Content>
            </Card>
        </motion.div>
    );
}