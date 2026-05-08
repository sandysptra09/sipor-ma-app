"use client";
import HelpCard from '@/components/customs/help-center/help-card';
import { User, Settings, Megaphone, ChevronDown } from "lucide-react";
import React, { useState } from 'react'
import { Accordion } from '@heroui/react';
import { text } from 'framer-motion/client';
import CtaBanner from '@/components/customs/landing/banners/cta-banner';

const items = [
    {
        title: "Bagaimana cara melaporkan kerusakan?",
        content:
            "Untuk melaporkan kerusakan, masuk ke akun Anda lalu pilih menu pelaporan. Isi detail kerusakan, lokasi, dan unggah foto pendukung sebelum mengirim laporan.",
    },
    {
        title: "Apa saja yang harus disertakan dalam laporan?",
        content:
            "Laporan sebaiknya mencakup deskripsi kerusakan, lokasi fasilitas, foto pendukung, serta informasi tambahan agar proses verifikasi lebih cepat.",
    },
    {
        title: "Apakah saya harus login untuk melapor?",
        content:
            "Ya, Anda diwajibkan untuk login terlebih dahulu sebelum mengirim laporan. Hal ini bertujuan agar laporan dapat tersimpan dengan baik dan Anda bisa memantau status serta mendapatkan notifikasi perkembangan.",
    },
    {
        title: "Apakah laporan bisa dikirim tanpa foto?",
        content:
            "Bisa, namun sangat disarankan untuk menyertakan foto agar tim teknis lebih mudah memahami kondisi kerusakan yang dilaporkan.",
    },
    {
        title: "Bagaimana jika saya salah mengisi laporan?",
        content:
            "Anda dapat menghubungi admin atau membuat laporan baru dengan informasi yang benar apabila terjadi kesalahan pengisian data.",
    },
    {
        title: "Di mana saya bisa melihat laporan saya?",
        content:
            "Semua laporan yang pernah Anda kirim dapat dilihat melalui halaman Riwayat Laporan pada dashboard akun Anda.",
    },
];


export default function HelpCenterPage() {
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
    return (
        <div>
            <div className='bg-[#E7F4F3]'>
                <div className='flex py-10 md:py-14 flex-col items-center gap-5 px-4'>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#181C1C] text-center leading-tight max-w-3xl">
                        Bagaimana kami bisa{" "}
                        <span className="text-primary">
                            membantu anda?
                        </span>
                    </h1>

                    <div className='text-center max-w-xl'>
                        <p className='text-sm sm:text-base text-gray-600'>
                            Temukan panduan penggunaan, solusi teknis, dan jawaban atas
                            pertanyaan umum seputar sistem pelaporan sarana prasarana.
                        </p>
                    </div>

                    <div className="w-full max-w-2xl relative mt-2">
                        <input
                            type="text"
                            placeholder="Cari topik bantuan atau kata kunci..."
                            className="w-full rounded-xl border bg-card px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                        />

                        <svg
                            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-center">
                        <span className="text-gray-400 font-medium">
                            Populer:
                        </span>

                        <a href="#" className="text-primary font-medium">
                            Lupa Password
                        </a>

                        <a href="#" className="text-primary font-medium">
                            Status Perbaikan
                        </a>

                        <a href="#" className="text-primary font-medium">
                            Upload Foto Kerusakan
                        </a>
                    </div>
                </div>
            </div>

            <div className='w-full bg-card py-8 lg:py-12'>
                <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>

                    <div className='flex flex-wrap justify-center gap-4'>
                        <HelpCard
                            icon={<Megaphone size={24} />}
                            text="Cara melapor"
                        />

                        <HelpCard
                            icon={<Settings size={24} />}
                            text="Tentang Perbaikan"
                        />

                        <HelpCard
                            icon={<User size={24} />}
                            text="Akun & Login"
                        />
                    </div>

                    <div className='w-full max-w-4xl mx-auto mt-8'>
                        <Accordion
                            className="w-full border border-primary/20 rounded-xl overflow-hidden"
                            variant="surface"
                        >
                            {items.map((item, index) => (
                                <Accordion.Item key={index}>
                                    <Accordion.Heading>
                                        <Accordion.Trigger className='text-primary px-4 py-4 text-left text-sm sm:text-base'>
                                            {item.title}

                                            <Accordion.Indicator className='text-primary'>
                                                <ChevronDown />
                                            </Accordion.Indicator>
                                        </Accordion.Trigger>
                                    </Accordion.Heading>

                                    <Accordion.Panel>
                                        <Accordion.Body className='text-[#181C1C] px-4 pb-4 text-sm sm:text-base leading-relaxed'>
                                            {item.content}
                                        </Accordion.Body>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>

            <div className='w-full bg-background py-10 md:py-14 min-h-[70vh] flex flex-col justify-center'>
                <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                    <CtaBanner />

                </div>
            </div>

        </div>
    )
}
