import Link from 'next/link'
import SignUpForm from '@/components/customs/auth/forms/sign-up-form'

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Akun',
    description: 'Buat akun SIPOR-MA sekarang untuk berkontribusi dalam menjaga dan memperbaiki fasilitas lingkungan kampus.',
};

export default function RegisterPage() {
    return (
        <div className='flex w-full flex-col items-center justify-center px-4 md:px-0'>

            <div className='mb-8 w-full text-center'>
                <h2 className='mb-3 text-2xl md:text-3xl font-heading font-bold text-[#181C1C]'>
                    Mulai Berkontribusi
                </h2>
                <p className='mx-auto max-w-sm text-xs leading-relaxed text-foreground md:max-w-lg md:text-sm'>
                    Mulai Bergabung untuk lapor kerusakan fasilitas secara sat- <br className="hidden md:block" />set dan pantau progres perbaikannya secara real-time
                </p>
            </div>

            <div className='w-full'>
                <SignUpForm />
            </div>

            <div className='mt-12 w-full text-center text-[10px] font-normal tracking-wider sm:text-xs'>
                <p className='mb-4 text-[#575858] uppercase tracking-widest'>© 2026 SIPOR-MA. ALL RIGHTS RESERVED.</p>
                <div className='flex flex-wrap justify-center gap-3 sm:gap-4 text-foreground uppercase'>
                    <Link href='#' className='transition-colors hover:text-[#0f9d85]'>Kebijakan Privasi</Link>
                    <Link href='#' className='transition-colors hover:text-[#0f9d85]'>Ketentuan Layanan</Link>
                    <Link href='#' className='transition-colors hover:text-[#0f9d85]'>Pusat Bantuan</Link>
                </div>
            </div>

        </div>
    )
}