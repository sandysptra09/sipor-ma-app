'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, toast } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

import UserNotification from './user-notification';
import UserNav from './user-nav';

export default function MainNavbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const { user } = useUserStore();

    useEffect(() => {
        if (sessionStorage.getItem('showLoginToast') === 'true') {
            toast.success('Login Berhasil!', {
                description: <span className='text-zinc-600'>Selamat datang kembali {user?.name || 'User'}</span>
            });
            sessionStorage.removeItem('showLoginToast');
        }
    }, [user]);

    const navLinks = [
        {
            name: user ? 'Dashboard' : 'Beranda',
            href: user ? '/dashboard' : '/'
        },
        ...(user ? [{ name: 'Lapor Kerusakan', href: '/scan' }] : []),
        { name: 'Pusat Bantuan', href: '/help-center' },
    ];

    const closeMenu = () => setIsMobileMenuOpen(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isMobileMenuOpen]);

    return (
        <>

            <header className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm'>
                <div className='mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8'>

                    <div className='flex items-center gap-4'>
                        <button
                            className='flex text-foreground md:hidden relative'
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label='Open Menu'
                        >
                            <Menu size={24} className='cursor-pointer text-muted-foreground hover:text-primary' />
                        </button>

                        <Link href='/' className='flex items-center gap-2 relative z-60' onClick={closeMenu}>
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

                    <div className={`flex items-center relative z-60 ${user ? 'gap-1' : 'gap-3'}`}>
                        {user ? (
                            <>
                                <UserNotification />
                                <UserNav />
                            </>
                        ) : (
                            <>
                                <Button
                                    variant='ghost'
                                    onClick={() => router.push('/sign-up')}
                                    className='flex rounded-md bg-background border-2 border-transparent px-6 font-semibold text-primary transition-all hover:border-primary'
                                >
                                    Register
                                </Button>

                                <Button
                                    variant='primary'
                                    onClick={() => router.push('/login')}
                                    className='hidden rounded-md bg-primary px-6 font-semibold text-white md:flex'
                                >
                                    Lapor Sekarang
                                </Button>
                            </>
                        )}
                    </div>

                </div>
            </header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden'
                            onClick={closeMenu}
                        />

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            className='fixed inset-y-0 left-0 z-50 flex h-full w-[80%] max-w-[320px] flex-col border-r border-zinc-200 bg-white shadow-2xl md:hidden'
                        >
                            <div className='flex items-center justify-between border-b border-zinc-100 px-6 py-5'>
                                <Link href='/' className='flex items-center gap-2' onClick={closeMenu}>
                                    <Image
                                        src='/assets/images/siporma-icon.svg'
                                        alt='Logo SIPOR-MA'
                                        width={28}
                                        height={28}
                                        className='h-7 w-7 object-contain'
                                    />
                                    <span className='font-heading text-lg font-bold tracking-wider text-primary'>
                                        SIPOR-MA
                                    </span>
                                </Link>
                                <button onClick={closeMenu} className='text-zinc-400 transition-colors hover:text-primary cursor-pointer'>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className='flex flex-1 flex-col overflow-y-auto px-6 py-6'>

                                <div className='flex flex-col gap-6'>
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={closeMenu}
                                                className={`text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        );
                                    })}

                                    <Link
                                        href='/terms-and-conditions'
                                        onClick={closeMenu}
                                        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                                    >
                                        Syarat & Ketentuan
                                    </Link>
                                    <Link
                                        href='/privacy-policy'
                                        onClick={closeMenu}
                                        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                                    >
                                        Kebijakan Privasi
                                    </Link>
                                </div>

                                {!user && (
                                    <div className='mt-auto flex flex-col pt-6 border-t border-zinc-200'>
                                        <Button
                                            variant='primary'
                                            className='w-full rounded-lg bg-primary py-6 font-bold text-white shadow-md'
                                            onClick={() => {
                                                closeMenu();
                                                router.push('/login');
                                            }}
                                        >
                                            Lapor Sekarang
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}