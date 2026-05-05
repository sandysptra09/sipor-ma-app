'use client';

import Link from 'next/link';
import { Card } from '@heroui/react';
import { motion } from 'framer-motion';
import FeatureModal from '../modals/feature-modal';

interface ModalStep {
    title: string;
    description: string;
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    delay?: number;
    modalSubtitle: string;
    modalFullDescription: string;
    modalSteps: ModalStep[];
}

export default function FeatureCard({ icon, title, description, href, delay = 0, modalFullDescription, modalSubtitle, modalSteps
}: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
            className='h-full'
        >

            <Card className='h-full border-0 border-solid border-l-4 border-l-primary bg-background rounded-xl shadow-sm transition-all hover:shadow-md'>
                <Card.Content className='flex h-full flex-col gap-6 p-6'>

                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f1] text-primary'>
                        {icon}
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-2xl font-semibold text-[#181C1C]'>
                            {title}
                        </h3>
                        <p className='text-sm font-normal leading-relaxed text-muted-foreground'>
                            {description}
                        </p>
                    </div>

                    <div className='mt-auto pt-4'>
                        <FeatureModal
                            title={title}
                            href={href}
                            subtitle={modalSubtitle}
                            fullDescription={modalFullDescription}
                            steps={modalSteps}
                        />
                    </div>

                </Card.Content>
            </Card>
        </motion.div>
    );
}