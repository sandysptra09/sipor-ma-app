import CtaBanner from '@/components/customs/landing/banners/cta-banner';
import HelpCenterTabs from '@/components/customs/help-center/tabs/help-center-tabs';

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

                    <div className="w-full max-w-2xl relative mt-2">
                        <input
                            type="text"
                            placeholder="Cari topik bantuan atau kata kunci..."
                            className="w-full rounded-xl border bg-card px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                        />

                        <svg
                            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </div>

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
