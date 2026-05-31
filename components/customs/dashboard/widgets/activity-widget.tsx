'use client';

import { Button, Card } from '@heroui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { FileText, Clock, PenTool, CheckCircle, XCircle, Trash2, MapPin, User } from 'lucide-react';

export interface ActivityItem {
    id: string;
    title: string;
    description: string | null;
    type: string;
    createdAt: string;
}
interface ActivityWidgetProps {
    items: ActivityItem[];
    isLoading: boolean;
}

const getActivityConfig = (type: string) => {
    switch (type) {
        case 'REPORT_CREATED':
            return { icon: <FileText size={16} />, bg: 'bg-[#004C3F1A]', text: 'text-[#0A6F66]' };
        case 'REPORT_VERIFIED':
            return { icon: <CheckCircle size={16} />, bg: 'bg-[#004C3F1A]', text: 'text-[#0A6F66]' };
        case 'REPORT_IN_PROGRESS':
            return { icon: <PenTool size={16} />, bg: 'bg-[#004C3F1A]', text: 'text-[#0A6F66]' };
        case 'REPORT_RESOLVED':
            return { icon: <CheckCircle size={16} />, bg: 'bg-[#A7E9D1]', text: 'text-[#0A6F66]' };
        case 'REPORT_REJECTED':
            return { icon: <XCircle size={16} />, bg: 'bg-red-100', text: 'text-danger' };
        case 'REPORT_CANCELED':
            return { icon: <Trash2 size={16} />, bg: 'bg-red-100', text: 'text-danger' };
        case 'ROOM_UPDATED':
            return { icon: <MapPin size={16} />, bg: 'bg-[#004C3F1A]', text: 'text-[#0A6F66]' };
        case 'PROFILE_UPDATED':
            return { icon: <User size={16} />, bg: 'bg-[#004C3F1A]', text: 'text-[#0A6F66]' };
        default:
            return { icon: <Clock size={16} />, bg: 'bg-[#004C3F1A]', text: 'text-[#0A6F66]' };
    }
};

export default function ActivityWidget({ items, isLoading }: ActivityWidgetProps) {
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
                        <h3 className='font-semibold text-base text-[#0A6F66]'>Aktivitas Terbaru</h3>
                        <div className='h-2 w-2 rounded-full bg-[#0A6F66]' />
                    </div>

                    <div className='flex flex-col gap-5'>
                        {isLoading ? (
                            <div className="text-center text-sm text-zinc-400 py-4 animate-pulse">Memuat aktivitas...</div>
                        ) : items.length === 0 ? (
                            <div className="text-center text-sm text-zinc-400 py-4">Belum ada aktivitas.</div>
                        ) : (
                            items.map((activity: ActivityItem) => {
                                const config = getActivityConfig(activity.type);

                                return (
                                    <div key={activity.id} className='flex gap-4 items-start'>
                                        <div className={`mt-1 h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${config.bg} ${config.text}`}>
                                            {config.icon}
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='text-[13px] font-semibold text-[#181C1C] leading-snug'>
                                                {activity.title}
                                            </div>
                                            <div className='text-[12px] font-medium text-zinc-500 leading-snug'>
                                                {activity.description}
                                            </div>
                                            <span className='text-[10px] font-normal uppercase tracking-wider text-muted-foreground mt-0.5'>
                                                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true, locale: localeId })}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        )}
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