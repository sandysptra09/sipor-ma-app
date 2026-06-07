import Link from 'next/link';
import ForgotPasswordForm from '@/components/customs/auth/forms/forgot-password-form';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lupa Kata Sandi',
    description: 'Pulihkan akses ke akun SIPOR-MA Anda dengan mengatur ulang kata sandi.',
};

export default function ForgotPasswordPage() {
    return (
        <div className='flex w-full flex-col items-center justify-center px-1 md:px-0'>

            <div className='mb-8 w-full text-center'>
                <h2 className='mb-2 text-2xl md:text-3xl font-heading font-bold text-[#181C1C]'>
                    Lupa Kata Sandi?
                </h2>
                <p className='text-xs md:text-sm text-foreground leading-relaxed'>
                    Jangan khawatir! Masukkan email institusi Anda yang terdaftar, dan sistem kami akan mengirimkan tautan aman untuk mengatur ulang kata sandi Anda.
                </p>
            </div>

            <div className='w-full'>
                <ForgotPasswordForm />
            </div>

            <div className='mt-6 w-full text-center text-sm text-muted-foreground'>
                Ingat kata sandi Anda?{' '}
                <Link href='/login' className='font-semibold text-primary transition-all hover:underline'>
                    Masuk di sini
                </Link>
            </div>

            <div className='mt-12 w-full text-center text-[10px] font-normal tracking-wider sm:text-xs'>
                <p className='mb-4 text-[#575858] uppercase tracking-widest'>© 2026 SIPOR-MA. ALL RIGHTS RESERVED.</p>
                <div className='flex flex-wrap justify-center gap-3 sm:gap-4 text-foreground uppercase'>
                    <Link href='/privacy-policy' className='transition-colors hover:text-[#0f9d85]'>Kebijakan Privasi</Link>
                    <Link href='/terms-and-conditions' className='transition-colors hover:text-[#0f9d85]'>Ketentuan Layanan</Link>
                    <Link href='/help-center' className='transition-colors hover:text-[#0f9d85]'>Pusat Bantuan</Link>
                </div>
            </div>

        </div>
    );
}