'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';

export default function CtaBanner() {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}

            className='relative w-full overflow-hidden rounded-[2rem] bg-primary px-8 py-14 shadow-xl md:px-16 md:py-20'
        >
            <div className='absolute bottom-[-50%] right-[-20%] top-[0%] z-0 w-[60%] skew-x-20 bg-black/5' />

            <div className='relative z-10 flex max-w-2xl flex-col items-start text-left'>
                <h2 className='font-heading text-2xl font-extrabold leading-tight text-white md:text-4xl'>
                    Siap Melaporkan <br /> Kerusakan?
                </h2>
                <p className='mt-5 text-base font-normal leading-relaxed text-white/90 md:text-lg'>
                    Bantu kami menjaga standar fasilitas akademik terbaik. Setiap laporan Anda sangat berarti bagi kemajuan kita bersama.
                </p>

                <Button
                    size='lg'
                    className='mt-8 rounded-lg bg-white px-8 font-bold text-primary shadow-sm transition-transform hover:scale-105'
                    onPress={() => router.push('/login')}
                >
                    Mulai Laporan Baru
                </Button>
            </div>
        </motion.div>
    );
}