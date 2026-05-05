'use client';

import { Camera } from 'lucide-react';
import { LuClipboardList, LuChartNoAxesCombined } from 'react-icons/lu';
import { motion } from 'framer-motion';
import FlowTimelineItem from '../timelines/flow-timeline';

export default function WorkflowSection() {
    return (
        <section className='w-full bg-background py-20 lg:py-28'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className='mx-auto mb-20 flex flex-col items-center text-center'
                >
                    <h2 className='font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl'>
                        Alur Pelaporan Presisi
                    </h2>

                    <div className='mt-6 h-1 w-16 rounded-full bg-primary' />
                </motion.div>

                <div className='relative mx-auto max-w-5xl'>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
                        className='absolute left-0 right-0 top-8 hidden h-0.5 bg-zinc-200 md:block'
                    />

                    <div className='grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8'>

                        <FlowTimelineItem
                            icon={<Camera size={24} strokeWidth={2} />}
                            title='Scan & Foto'
                            description='Lakukan scan QR di ruangan, lokasi terisi otomatis (Auto-lookup). Ambil foto kerusakan secara langsung sebagai bukti visual.'
                            delay={0.1}
                        />

                        <FlowTimelineItem
                            icon={<LuClipboardList size={24} strokeWidth={2} />}
                            title='Form Cerdas (AI)'
                            description='Ketik deskripsi singkat. Sistem AI akan otomatis memvalidasi foto dan menentukan kategori serta prioritas laporan secara objektif.'
                            delay={0.2}
                        />

                        <FlowTimelineItem
                            icon={<LuChartNoAxesCombined size={24} strokeWidth={2} />}
                            title='Pantau Real-time'
                            description='Laporan terkirim ke Admin via notifikasi real-time. Dapatkan update perkembangan perbaikan hingga status selesai tanpa perlu refresh.'
                            delay={0.3}
                            isLast={true}
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}