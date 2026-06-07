import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Home } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Halaman Tidak Ditemukan',
    description: 'Maaf, halaman yang Anda cari tidak dapat ditemukan di sistem SIPOR-MA.',
};

export default function NotFound() {
    return (
        <main className='flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-16 text-center md:px-8'>

            <div className='relative mb-4 h-[clamp(200px,32vh,340px)] w-full max-w-130 sm:mb-6'>
                <Image
                    src='/assets/images/not-found.png'
                    alt='Ilustrasi halaman tidak ditemukan SIPOR-MA'
                    fill
                    priority
                    sizes='(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 520px'
                    className='object-contain'
                />
            </div>

            <h1 className='font-heading mb-3 text-2xl font-extrabold tracking-tight text-[#181C1C] md:text-4xl'>
                404 - Halaman Tidak Ditemukan
            </h1>
            <p className='mb-10 max-w-md text-sm font-normal leading-relaxed text-muted-foreground md:text-sm'>
                Maaf, sepertinya Anda tersesat. Halaman yang Anda cari mungkin sudah dihapus, dipindahkan, atau memang tidak pernah ada di sistem SIPOR-MA.
            </p>

            <div className='flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm sm:max-w-none justify-center'>
                <Link href='/dashboard' className='w-full sm:w-auto'>
                    <Button
                        variant='primary'
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-6 font-bold text-white shadow-md transition-all hover:bg-primary/90'
                    >
                        <Home size={18} />
                        Kembali ke Dashboard
                    </Button>
                </Link>
            </div>

        </main>
    );
}