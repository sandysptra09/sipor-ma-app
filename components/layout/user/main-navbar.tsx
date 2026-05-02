'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function MainNavbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Pusat Bantuan', href: '/help-center' },
    ];

    const closeMenu = () => setIsMobileMenuOpen(false);

    // const isAuthPage = pathname === '/login' || pathname === '/sign-up';
    // const isAdminPage = pathname?.startsWith('/admin');

    // if (isAuthPage || isAdminPage) {
    //     return null;
    // }

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md shadow-sm'>
            <div className='mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8'>

                <div className='flex items-center gap-4'>
                    <button
                        className='flex text-foreground md:hidden'
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label='Toggle Menu'
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href='/' className='flex items-center gap-2' onClick={closeMenu}>
                        <Image
                            src='/assets/images/siporma-icon.svg'
                            alt='Logo SIPOR-MA'
                            width={32}
                            height={32}
                            className='h-7 w-7 object-contain md:h-8 md:w-8'
                        />
                        <span className='font-heading text-lg font-bold tracking-wider text-primary md:text-xl'>
                            SIPOR-MA
                        </span>
                    </Link>
                </div>

                <nav className='hidden items-center gap-8 md:flex'>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId='active-nav-underline'
                                        className='absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className='flex items-center gap-3'>

                    <Button
                        variant='ghost'
                        onClick={() => router.push('/sign-up')}
                        className='rounded-md bg-background border-2 border-transparent px-6 font-semibold text-primary transition-all hover:border-primary'
                    >
                        Register
                    </Button>

                    <Button
                        variant='primary'
                        onClick={() => router.push('/sign-up')}
                        className='hidden rounded-md bg-primary px-6 font-semibold text-white md:flex'
                    >
                        Lapor Sekarang
                    </Button>

                </div>

            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='overflow-hidden border-b bg-background md:hidden'
                    >
                        <div className='flex flex-col gap-4 px-6 py-6'>
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={closeMenu}
                                        className={`text-base font-medium ${isActive ? 'text-primary' : 'text-foreground'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <div className='mt-2 border-t pt-4 flex flex-col gap-3'>
                                <Button
                                    variant='ghost'
                                    className='w-full rounded-md bg-background border-2 border-transparent px-6 font-semibold text-primary transition-all hover:border-primary'
                                    onClick={() => {
                                        closeMenu();
                                        router.push('/sign-up');
                                    }}
                                >
                                    Register
                                </Button>
                                <Button
                                    variant='primary'
                                    className='w-full rounded-md bg-primary font-semibold text-white'
                                    onClick={() => {
                                        closeMenu();
                                        router.push('/login');
                                    }}
                                >
                                    Lapor Sekarang
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}