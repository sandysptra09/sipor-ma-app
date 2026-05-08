import React from 'react'
import SidebarTerms from '@/components/customs/terms-and-conditions/sidebar-terms/sidebar-terms'
import TermsContent from '@/components/customs/terms-and-conditions/main-content-terms/terms-content'

export default function TermsAndConditionsPage() {
    return (
        <div  className='w-full py-20 lg:py-28'>
            <div className='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:px-8'>
                <div className='hidden lg:block lg:w-[280px] self-start sticky top-48'>
                    <SidebarTerms/>
                </div>

                <div className='w-full flex-1'>
                    <h1 className='mb-4 text-4xl font-heading font-bold text-black'>
                        Syarat &
                        <span className='text-primary'> Ketentuan</span>
                    </h1>
                    <TermsContent/>
                </div>
            </div>
        </div>
    )
}
