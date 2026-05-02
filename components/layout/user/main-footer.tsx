'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Globe, Mail } from 'lucide-react';

export default function MainFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='relative w-full overflow-hidden bg-[#f4faf8] py-10 lg:py-16'>

            <div className='pointer-events-none absolute -bottom-10 -left-16 z-0 hidden w-70 select-none lg:block xl:-bottom-20 xl:-left-14 xl:w-85'>
                <Image
                    src='/assets/images/siporma-icon.svg'
                    alt='Background Decorative Logo'
                    width={250}
                    height={250}
                    className='object-contain opacity-90'
                />
            </div>

            <div className='relative z-10 mx-auto flex max-w-7xl flex-col px-6 md:flex-row md:items-center md:justify-between md:px-8 lg:pl-56 xl:pl-72'>

                <div className='flex flex-col gap-2'>
                    <span className='font-heading text-xl font-extrabold text-[#004C3F]'>
                        SIPOR-MA
                    </span>
                    <p className='text-xs font-medium tracking-wide text-muted-foreground'>
                        &copy; {currentYear} SIPOR-MA. ALL RIGHTS RESERVED.
                    </p>
                </div>

                <div className='my-8 h-px w-full bg-zinc-200 md:hidden' />

                <nav className='grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-8 md:gap-y-3 lg:gap-x-12'>
                    <Link
                        href='/privacy-policy'
                        className='text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary'
                    >
                        Kebijakan Privasi
                    </Link>
                    <Link
                        href='/contact'
                        className='text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary'
                    >
                        Kontak Kami
                    </Link>
                    <Link
                        href='/terms-and-conditions'
                        className='text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary'
                    >
                        Syarat & Ketentuan
                    </Link>
                    <Link
                        href='/help-center'
                        className='text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary'
                    >
                        Pusat Bantuan
                    </Link>
                </nav>

                <div className='mt-10 flex items-center gap-4 md:mt-0'>
                    <Link
                        href='/'
                        className='group flex h-11 w-11 items-center justify-center rounded-xl bg-muted transition-all hover:bg-primary/10 hover:shadow-sm'
                        aria-label='Website'
                    >
                        <Globe size={20} className='text-primary transition-transform group-hover:scale-110' />
                    </Link>
                    <Link
                        href='mailto:support@siporma.com'
                        className='group flex h-11 w-11 items-center justify-center rounded-xl bg-muted transition-all hover:bg-primary/10 hover:shadow-sm'
                        aria-label='Email'
                    >
                        <Mail size={20} className='text-primary transition-transform group-hover:scale-110' />
                    </Link>
                </div>

            </div>
        </footer>
    );
}