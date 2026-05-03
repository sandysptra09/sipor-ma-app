'use client';

import { Card } from '@heroui/react';
import { motion } from 'framer-motion';

interface StatCardProps {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    value: string;
    label: string;
    delay?: number;
}

export default function StatCard({ icon, iconBg, iconColor, value, label, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
        >
            <Card className='border-2 border-transparent bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary'>
                <Card.Content className='flex flex-col gap-6 p-4'>

                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                        {icon}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <h3 className='text-4xl font-bold tracking-tight text-primary md:text-5xl'>
                            {value}
                        </h3>
                        <p className='mt-2 text-xs font-semibold uppercase tracking-wider text-foreground'>
                            {label}
                        </p>
                    </div>

                    <div className='mt-2 h-1 w-[80%] rounded-full bg-primary' />

                </Card.Content>
            </Card>
        </motion.div>
    );
}