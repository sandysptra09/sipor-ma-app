'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Camera, LayoutDashboard, MessageCircleQuestion, LayoutGrid } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function MobileFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === '/chat-assistant') return null;

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        {
            id: 'help',
            icon: <MessageCircleQuestion size={20} />,
            label: 'Pusat Bantuan',
            onClick: () => { router.push('/help-center'); setIsOpen(false); },
            pos: { x: 0, y: -75 }
        },
        {
            id: 'scan',
            icon: <Camera size={20} />,
            label: 'Lapor/Scan QR',
            onClick: () => { router.push('/scan'); setIsOpen(false); },
            pos: { x: -55, y: -55 }
        },
        {
            id: 'dashboard',
            icon: <LayoutDashboard size={20} />,
            label: 'Dashboard',
            onClick: () => { router.push('/dashboard'); setIsOpen(false); },
            pos: { x: -75, y: 0 }
        },
    ];

    return (
        <div className='fixed bottom-6 right-6 z-100 md:hidden'>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-black/20 z-[-1]'
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div className='relative flex items-center justify-center'>
                <AnimatePresence>
                    {isOpen && menuItems.map((item, index) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                            animate={{ opacity: 1, x: item.pos.x, y: item.pos.y, scale: 1 }}
                            exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: index * 0.05
                            }}
                            onClick={item.onClick}
                            className='absolute flex items-center justify-center w-12 h-12 rounded-full bg-[#0A6F66] text-white shadow-lg border-2 border-white/20 hover:bg-[#085a53] transition-colors'
                            aria-label={item.label}
                        >
                            {item.icon}
                        </motion.button>
                    ))}
                </AnimatePresence>

                <motion.button
                    onClick={toggleMenu}
                    className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl transition-colors ${isOpen ? 'bg-[#A7E9D1] text-[#0A6F66]' : 'bg-[#0A6F66]'}`}
                    whileTap={{ scale: 0.9 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    aria-label='Menu Tindakan'
                >
                    {isOpen ? <X size={28} /> : <Plus size={28} />}
                </motion.button>
            </div>

        </div>
    );
}