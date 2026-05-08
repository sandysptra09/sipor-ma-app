import React from 'react'
import Sidebar from '@/components/customs/privacy-policy/sidebar/sidebar'
import PrivacyContent from '@/components/customs/privacy-policy/main-content/privacy-content'

export default function PrivacyPolicyPage() {
    return (
        <div className='min-h-screen w-full bg-background py-10 md:py-12'>
            <div className='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:px-8'>
                <div className='hidden lg:block lg:w-70 self-start sticky top-48'>
                    <Sidebar />
                </div>

                <div className='w-full flex-1'>
                    <h1 className='mb-4 text-4xl font-heading font-bold text-primary'>
                        Kebijakan
                        <span className='text-black'> Privasi</span>
                    </h1>
                    <PrivacyContent />
                </div>
            </div>
        </div>
    )
}
