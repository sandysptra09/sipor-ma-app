'use client';

import { useEffect } from 'react';
import { toast } from '@heroui/react';
import Link from 'next/link'
import LoginForm from '@/components/customs/auth/forms/login-form'

export default function LoginPage() {

    useEffect(() => {
        if (sessionStorage.getItem('showRegisterToast') === 'true') {
            toast.success('Registrasi Berhasil!', {
                description: <span className='text-zinc-600'>Silakan masuk menggunakan akun baru Anda.</span>
            });
            sessionStorage.removeItem('showRegisterToast');
        }
    }, []);

    return (
        <div className='flex w-full flex-col items-center justify-center px-1 md:px-0'>

            <div className='mb-8 w-full text-center'>
                <h2 className='mb-2 text-2xl md:text-3xl font-heading font-bold text-[#181C1C]'>
                    Selamat Datang Kembali
                </h2>
                <p className='text-xs md:text-sm text-foreground'>
                    Silakan masuk untuk mengakses dasbor SIPOR-MA Anda.
                </p>
            </div>

            <div className='w-full'>
                <LoginForm />
            </div>

            <div className='mt-12 w-full text-center text-[10px] font-normal tracking-wider sm:text-xs'>
                <p className='mb-4 text-[#575858] uppercase tracking-widest'>© 2026 SIPOR-MA. ALL RIGHTS RESERVED.</p>
                <div className='flex flex-wrap justify-center gap-4 gap-3 sm:gap-4 text-foreground uppercase'>
                    <Link href='/privacy-policy' className='transition-colors hover:text-[#0f9d85]'>Kebijakan Privasi</Link>
                    <Link href='/terms-and-conditions' className='transition-colors hover:text-[#0f9d85]'>Ketentuan Layanan</Link>
                    <Link href='/help-center' className='transition-colors hover:text-[#0f9d85]'>Pusat Bantuan</Link>
                </div>
            </div>

        </div>
    )
}
