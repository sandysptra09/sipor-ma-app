'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AuthBanner() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <div className='absolute inset-0 z-0 bg-background'>
                <Image
                    src='/assets/images/auth-banner.png'
                    alt='Auth Banner'
                    fill
                    className={`object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    priority
                    sizes='(max-width: 1024px) 100vw, 50vw'
                    onLoad={() => setIsLoaded(true)}
                />
                <div
                    className={`absolute inset-0 bg-primary/60 mix-blend-multiply transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            <div className='relative z-10 flex h-10 items-center gap-3 text-xl font-bold tracking-wider text-white'>

                <div className={`absolute inset-0 flex items-center gap-3 transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className='h-10 w-10 animate-pulse rounded-lg bg-zinc-300' />
                    <div className='h-6 w-32 animate-pulse rounded-md bg-zinc-300' />
                </div>

                <div className={`flex items-center gap-3 transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1.5'>
                        <Image
                            src='/assets/icons/siporma-icon.svg'
                            alt='Logo SIPOR-MA'
                            width={28}
                            height={28}
                            className='object-contain'
                        />
                    </div>
                    <span>SIPOR-MA</span>
                </div>
            </div>

            <div className='relative z-10 flex flex-1 flex-col justify-center'>

                <div className={`absolute inset-0 flex flex-col justify-center gap-6 transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className='flex flex-col gap-2'>
                        <div className='h-12 w-3/4 animate-pulse rounded-xl bg-zinc-300' />
                        <div className='h-12 w-2/3 animate-pulse rounded-xl bg-zinc-300' />
                        <div className='h-12 w-1/2 animate-pulse rounded-xl bg-zinc-300' />
                    </div>
                    <div className='h-20 w-full max-w-md animate-pulse rounded-xl bg-zinc-300' />
                </div>

                <div className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <h1 className='mb-6 text-5xl font-heading font-medium leading-[1.15] text-white'>
                        Fasilitas Kampus <br />
                        Bermasalah? <br />
                        <span className='text-secondary'>Lapor</span> Sat-Set <br />
                        Saja.
                    </h1>
                    <p className='max-w-md font-sans text-base leading-relaxed text-gray-100'>
                        SIPOR-MA adalah jembatan digital untuk memodernisasi pelaporan sarana kampus. Melalui SIPOR-MA, kamu bisa lapor kerusakan dengan cepat, pilih kategori yang lengkap, dan pantau progres perbaikan secara real-time.
                    </p>
                </div>
            </div>
        </>
    );
}