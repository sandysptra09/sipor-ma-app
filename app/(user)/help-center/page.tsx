import CtaBanner from '@/components/customs/landing/banners/cta-banner';
import HelpCenterTabs from '@/components/customs/help-center/tabs/help-center-tabs';
import HelpCenterSearch from '@/components/customs/help-center/help-center-search';
import { Suspense } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pusat Bantuan',
    description: 'Temukan panduan penggunaan, FAQ, dan informasi lengkap mengenai cara melapor di aplikasi SIPOR-MA.',
};

export default function HelpCenterPage() {

    return (
        <div>
            <div className='bg-[#E7F4F3]'>
                <div className='flex py-10 md:py-14 flex-col items-center gap-5 px-4'>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#181C1C] text-center leading-tight max-w-3xl">
                        Bagaimana kami bisa{" "}
                        <span className="text-primary">
                            membantu anda?
                        </span>
                    </h1>

                    <div className='text-center max-w-xl'>
                        <p className='text-sm sm:text-base text-gray-600'>
                            Temukan panduan penggunaan, solusi teknis, dan jawaban atas
                            pertanyaan umum seputar sistem pelaporan sarana prasarana.
                        </p>
                    </div>

                    <Suspense fallback={<div className="w-full max-w-2xl relative mt-2 h-12 bg-gray-100 rounded-xl animate-pulse"></div>}>
                        <HelpCenterSearch />
                    </Suspense>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-center">
                        <span className="text-gray-400 font-medium">
                            Populer:
                        </span>

                        <a href="#" className="text-primary font-medium">
                            Lupa Password
                        </a>

                        <a href="#" className="text-primary font-medium">
                            Status Perbaikan
                        </a>

                        <a href="#" className="text-primary font-medium">
                            Upload Foto Kerusakan
                        </a>
                    </div>
                </div>
            </div>

            <HelpCenterTabs />

            <div className='w-full bg-background py-10 md:py-14 min-h-[70vh] flex flex-col justify-center'>
                <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                    <CtaBanner />

                </div>
            </div>

        </div>
    )
}
