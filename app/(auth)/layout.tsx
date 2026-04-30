import Image from 'next/image';
import { Wrench } from 'lucide-react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman auth');

    return (
        <div className='flex h-screen w-full overflow-hidden bg-white'>

            <div className='relative hidden h-full w-full flex-col p-12 lg:flex lg:w-1/2'>
                <div className='absolute inset-0 z-0'>
                    <Image
                        src='/assets/images/auth-banner.png'
                        alt='Background Kampus'
                        fill
                        className='object-cover'
                        priority
                        sizes='(max-width: 1024px) 100vw, 50vw'
                    />
                    <div className='absolute inset-0 bg-primary/60 mix-blend-multiply' />
                </div>

                <div className='relative z-10 flex items-center gap-3 text-xl font-bold tracking-wider text-white'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1.5'>
                        <Image
                            src='/assets/icons/siporma-icon.svg'
                            alt='Logo SIPOR-MA'
                            width={28}
                            height={28}
                            className='object-contain'
                        />
                    </div>
                    SIPOR-MA
                </div>

                <div className='relative z-10 flex flex-1 flex-col justify-center'>
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

            <div className='flex h-full w-full flex-col overflow-y-auto bg-background lg:w-1/2'>

                <div className='flex min-h-full w-full flex-col px-6 lg:px-12'>

                    <div className='mx-auto my-auto w-full max-w-110 py-12'>
                        {children}
                    </div>

                </div>

            </div>

        </div>
    );
}