'use client';

import { motion } from 'framer-motion';

interface TimelineItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
    isLast?: boolean;
}

export default function FlowTimelineItem({ icon, title, description, delay = 0, isLast = false }: TimelineItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
            className='relative flex flex-row items-start gap-4 text-left md:flex-col md:items-center md:gap-0 md:text-center'
        >

            {!isLast && (
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: delay + 0.1 }}
                    className='absolute left-8 top-8 -bottom-12 z-0 w-0.5 origin-top bg-zinc-200 md:hidden'
                />
            )}

            <div className='relative z-10 shrink-0 rounded-full bg-background p-2'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-110 hover:shadow-lg'>
                    {icon}
                </div>
            </div>

            <div className='flex flex-col pt-2 md:pt-0'>
                <h3 className='text-xl font-bold text-[#181C1C] md:mt-3'>
                    {title}
                </h3>
                <p className='mt-2 w-full md:max-w-70 text-sm font-normal leading-relaxed text-muted-foreground md:mt-3'>
                    {description}
                </p>
            </div>
        </motion.div>
    );
}