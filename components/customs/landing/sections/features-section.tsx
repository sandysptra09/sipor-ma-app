'use client';

import { Megaphone, MessageSquareDiff, PackageOpen } from 'lucide-react';
import FeatureCard from '../cards/feature-card';

export default function FeaturesSection() {
    return (
        <section className='w-full bg-card py-20 lg:py-28'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <div className='mx-auto mb-16 flex max-w-3xl flex-col items-center gap-4 text-center'>
                    <h2 className='font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl'>
                        Kelola Laporan Fasilitas dengan Mudah
                    </h2>
                    <p className='text-sm font-normal leading-relaxed text-foreground md:text-base'>
                        Sistem terintegrasi untuk melaporkan, meninjau, dan menyelesaikan permasalahan fasilitas secara cepat, transparan, dan efisien.
                    </p>
                </div>

                <div className='grid grid-cols-1 items-stretch gap-8 md:grid-cols-3'>

                    <FeatureCard
                        icon={<Megaphone size={24} strokeWidth={2} />}
                        title='Report'
                        description='Laporkan permasalahan fasilitas di lingkungan akademik secara mudah dan cepat. Setiap laporan akan diverifikasi dan diteruskan ke unit terkait untuk segera ditindaklanjuti.'
                        href='/scan'
                        delay={0.1}
                    />

                    <FeatureCard
                        icon={<MessageSquareDiff size={24} strokeWidth={2} />}
                        title='Review'
                        description='Tinjau dan pantau setiap laporan fasilitas yang masuk. Berikan penilaian kelayakan dan prioritas penanganan untuk memastikan efisiensi respons.'
                        href='/dashboard'
                        delay={0.2}
                    />

                    <FeatureCard
                        icon={<PackageOpen size={24} strokeWidth={2} />}
                        title='Resolve'
                        description='Selesaikan permasalahan fasilitas dengan alur kerja yang terstruktur. Catat progres penyelesaian dan dokumentasikan hasil perbaikan secara transparan.'
                        href='/progres'
                        delay={0.3}
                    />

                </div>

            </div>
        </section>
    );
}