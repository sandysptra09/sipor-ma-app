import React from 'react'
import SidebarTerms from '@/components/customs/terms-and-conditions/sidebar-terms/sidebar-terms'
import TermsContent from '@/components/customs/terms-and-conditions/main-content-terms/terms-content'

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Syarat & Ketentuan',
    description: 'Baca syarat dan ketentuan penggunaan layanan platform pelaporan fasilitas SIPOR-MA.',
};


export default function TermsAndConditionsPage() {
    return (
        <div className='min-h-screen w-full bg-background py-10 md:py-12'>
            <div className='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:px-8'>
                <div className='hidden lg:block lg:w-[280px] shrink-0 self-start sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar pb-10'>
                    <SidebarTerms />
                </div>

                <div className='w-full flex-1'>
                    <h1 className='mb-4 text-4xl font-heading font-bold text-black'>
                        Syarat &
                        <span className='text-primary'> Ketentuan</span>
                    </h1>
                    <TermsContent />
                </div>
            </div>
        </div>
    )
}
