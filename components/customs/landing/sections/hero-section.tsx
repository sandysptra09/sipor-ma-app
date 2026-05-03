'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button, Chip } from '@heroui/react';

export default function HeroSection() {

    const router = useRouter();

    return (
        <section className='relative flex min-h-[90vh] w-full items-center overflow-hidden bg-background'>

            <div className='absolute inset-0 z-0'>
                <Image
                    src='/assets/images/hero-bg.jpeg'
                    alt='Background Hero SIPOR-MA'
                    fill
                    priority
                    className='object-cover object-center'
                />
            </div>

            <div className='absolute inset-0 z-0 w-full bg-linear-to-r from-white/90 via-white/80 to-transparent lg:w-[80%]' />

            <div className='relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 lg:px-8'>
                <div className='max-w-2xl'>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='mb-4 '
                    >
                        <Chip
                            className='bg-secondary py-1 px-2.5 md:py-2 md:px-3'
                        >
                            <div className='flex items-center gap-2'>
                                <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                <Chip.Label className='text-[10px] font-semibold uppercase tracking-widest text-primary md:text-xs'>
                                    Manajemen Fasilitas Modern
                                </Chip.Label>
                            </div>
                        </Chip>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='font-heading text-4xl font-extrabold tracking-tight text-[#181C1C] sm:text-5xl lg:text-[64px] lg:leading-[1.1]'
                    >
                        Satu Laporan Anda,<br />
                        <span className='text-primary'>Perubahan</span> bagi<br />
                        Kampus Kita.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='mt-6 max-w-xl text-base font-medium leading-relaxed text-foreground sm:text-lg'
                    >
                        Platform pelaporan fasilitas terintegrasi untuk kenyamanan
                        akademik yang berkelanjutan. Transparan, cepat, dan
                        terpercaya.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='mt-10 flex flex-col gap-4 sm:flex-row sm:items-center'
                    >
                        <Button
                            onPress={() => router.push('/login')}
                            variant='primary'
                            className='h-12 w-full rounded-md bg-primary shadow-md px-8 text-base font-semibold text-white sm:w-auto'
                        >
                            Lapor Sekarang
                        </Button>
                        <Button
                            onPress={() => router.push('/dashboard')}
                            variant='ghost'
                            className='h-12 w-full rounded-md bg-[#e6f4f1] shadow-md px-8 text-base font-semibold text-primary sm:w-auto'
                        >
                            Lihat Progres
                        </Button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}