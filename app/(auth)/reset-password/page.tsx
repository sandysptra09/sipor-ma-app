import Link from 'next/link';
import ResetPasswordForm from '@/components/customs/auth/forms/reset-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Buat Kata Sandi Baru',
    description: 'Buat kata sandi baru untuk akun SIPOR-MA Anda.',
};

type Props = {
    searchParams: Promise<{ token?: string }>
};

export default async function ResetPasswordPage({ searchParams }: Props) {

    const resolvedParams = await searchParams;
    const token = resolvedParams.token;

    return (
        <div className='flex w-full flex-col px-1 md:px-0'>

            <div className='mb-8 w-full text-center'>
                <h2 className='mb-2 text-2xl md:text-3xl font-heading font-bold text-[#181C1C]'>
                    Buat Kata Sandi Baru
                </h2>
                <p className='text-xs md:text-sm text-foreground leading-relaxed'>
                    Silakan masukkan kata sandi baru Anda. Pastikan kata sandi Anda kuat dan tidak mudah ditebak oleh orang lain.
                </p>
            </div>

            <div className='w-full'>
                <ResetPasswordForm token={token} />
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