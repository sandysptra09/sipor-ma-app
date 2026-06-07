'use client';

import { Tabs, Accordion } from '@heroui/react';
import { User, Settings, Megaphone, ChevronDown } from "lucide-react";
import { useSearchParams } from 'next/navigation';

const faqData = {
    reporting: [
        {
            title: "Bagaimana cara melaporkan kerusakan fasilitas?",
            content: "Sangat mudah! Anda cukup masuk ke akun Anda, buka menu 'Lapor Kerusakan' dari menu dropdown akun, disini anda akan diarahkan ke halaman Scan QR. Setelah itu arahkan kamera ke kode QR yang tertempel di pintu/dinding ruangan. Jika kamera bermasalah, Anda juga bisa memasukkan kode ruangan secara manual."
        },
        {
            title: "Apakah wajib mengunggah foto bukti kerusakan?",
            content: "Ya, sistem pelaporan terbaru SIPOR-MA mewajibkan minimal 1 foto bukti kerusakan. Hal ini bertujuan agar sistem kecerdasan buatan (AI) kami dapat langsung mendeteksi jenis kerusakan serta menentukan tingkat prioritasnya."
        },
        {
            title: "Bagaimana sistem mengetahui lokasi pasti kerusakan?",
            content: "Sistem kami sudah terintegrasi secara cerdas dengan database Sarpras. Begitu Anda berhasil memindai QR Code ruangan, detail lokasi mulai dari nama gedung, nomor lantai, hingga nama ruangan akan otomatis terisi secara realtime."
        },
        {
            title: "Mengapa laporan saya ditolak otomatis oleh sistem?",
            content: "Sistem AI kami dilengkapi dengan pelindung otomatis (Gatekeeper). Jika foto yang Anda unggah terdeteksi tidak jelas, buram, berisi foto random (seperti selfie/hewan), atau mengandung unsur prank/NSFW, sistem akan otomatis menolak laporan tersebut demi keamanan data."
        },
        {
            title: "Apakah saya bisa mengedit laporan setelah terkirim?",
            content: "Laporan yang sudah dikirim langsung masuk ke tahap pemrosesan database dan tidak bisa diedit. Jika terjadi kesalahan fatal pada deskripsi, Anda disarankan untuk membatalkan laporan dari riwayat akun Anda dan membuat laporan baru yang benar."
        }
    ],
    maintenance: [
        {
            title: "Bagaimana alur proses perbaikan fasilitas berjalan?",
            content: "Alur pelaporan terdiri dari beberapa tahap: PENDING (menunggu antrean), VERIFIED (disetujui oleh AI/Admin), IN_PROGRESS (teknisi sedang bekerja di lokasi), hingga RESOLVED (perbaikan selesai dilakukan)."
        },
        {
            title: "Bagaimana tingkat prioritas perbaikan ditentukan?",
            content: "Tingkat prioritas (LOW, MEDIUM, HIGH) dianalisis pertama kali oleh AI Gemini berdasarkan foto bukti kerusakan. Kerusakan krusial yang mengganggu kegiatan belajar mengajar (seperti mati listrik total atau server down) akan otomatis dikategorikan sebagai HIGH."
        },
        {
            title: "Berapa lama durasi penanganan perbaikan?",
            content: "Tim Sarpras berkomitmen menyelesaikan masalah secepat mungkin. Untuk kategori prioritas HIGH, tindakan perbaikan umumnya diupayakan dalam kurun waktu kurang dari 24 jam setelah laporan diverifikasi."
        },
        {
            title: "Bagaimana saya tahu jika laporan saya sedang dikerjakan?",
            content: "Setiap kali teknisi mengubah status laporan Anda (misalnya dari VERIFIED menjadi IN_PROGRESS), sistem kami akan mengirimkan notifikasi instan secara realtime ke akun Anda sehingga Anda bisa memantaunya kapan saja."
        },
        {
            title: "Siapa yang bertanggung jawab melakukan perbaikan?",
            content: "Perbaikan dilakukan oleh tim teknisi internal unit Sarana dan Prasarana (Sarpras) kampus, atau melalui vendor pihak ketiga yang ditunjuk khusus untuk menangani kerusakan spesifik berskala besar."
        }
    ],
    account: [
        {
            title: "Siapa saja yang memiliki akses untuk membuat laporan?",
            content: "Aplikasi SIPOR-MA dapat digunakan oleh seluruh civitas akademika kampus yang aktif, termasuk mahasiswa, dosen, serta staf karyawan yang memiliki hak akses login resmi."
        },
        {
            title: "Bagaimana jika saya lupa kata sandi akun saya?",
            content: "Anda dapat mengeklik tombol 'Lupa Password' pada halaman login utama. Sistem akan mengirimkan instruksi beserta tautan rahasia untuk mengatur ulang kata sandi baru ke alamat email institusi Anda yang terdaftar."
        },
        {
            title: "Apakah saya bisa login menggunakan Akun Google?",
            content: "Ya! Sistem login SIPOR-MA sudah mendukung integrasi OAuth yang aman. Anda bisa langsung masuk menggunakan akun email institusi resmi Anda yang terhubung dengan layanan Google tanpa perlu mengetik kata sandi secara manual."
        },
        {
            title: "Mengapa saya mendapatkan pesan error 'Unauthorized'?",
            content: "Pesan ini muncul jika sesi login Anda telah berakhir demi keamanan data, atau Anda mencoba mengakses fitur pelaporan tanpa masuk ke akun terlebih dahulu. Silakan lakukan login ulang untuk menyegarkan sesi Anda."
        },
        {
            title: "Di mana saya bisa merubah data profil dan foto akun?",
            content: "Anda dapat memperbarui nama tampilan, nomor kontak, serta foto profil Anda kapan saja dengan mengunjungi halaman 'Pengaturan Profil' yang dapat diakses melalui menu dropdown akun di dashboard Anda."
        }
    ]
};

export default function HelpCenterTabs() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const filterFaq = (faqs: any[]) => {
        if (!query) return faqs;
        return faqs.filter(faq => 
            faq.title.toLowerCase().includes(query) || 
            faq.content.toLowerCase().includes(query)
        );
    };

    const reportingFaq = filterFaq(faqData.reporting);
    const maintenanceFaq = filterFaq(faqData.maintenance);
    const accountFaq = filterFaq(faqData.account);

    return (
        <div className='w-full bg-card py-8 lg:py-12'>
            <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
                <Tabs defaultSelectedKey="reporting" className="w-full flex flex-col items-center">

                    <Tabs.ListContainer className="w-full flex justify-center">
                        <Tabs.List aria-label="Kategori Bantuan" className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 border-none rounded-md bg-transparent p-0 w-full sm:w-auto pb-2">

                            <Tabs.Tab
                                id='reporting'
                                className='flex items-center h-14 gap-4 bg-[#E7F4F3] px-6 py-4 border-2 border-transparent rounded-md cursor-pointer transition text-foreground font-semibold text-sm md:text-base hover:border-teal-100 data-[selected=true]:border-secondary'
                            >
                                <div className='bg-secondary/40 p-2 rounded-lg' >
                                    <Megaphone size={20} />
                                </div>
                                <span className='whitespace-nowrap'>Cara Melapor</span>
                                <Tabs.Indicator className='hidden' />
                            </Tabs.Tab>

                            <Tabs.Tab
                                id='maintenance'
                                className='flex items-center h-14 gap-4 bg-[#E7F4F3] px-6 py-4 border-2 border-transparent rounded-md cursor-pointer transition text-foreground font-semibold text-sm md:text-base hover:border-teal-100 data-[selected=true]:border-secondary'
                            >
                                <div className='bg-secondary/40 p-2 rounded-lg' >
                                    <Settings size={20} />
                                </div>
                                <span className='whitespace-nowrap'>Tentang Perbaikan</span>
                                <Tabs.Indicator className='hidden' />
                            </Tabs.Tab>

                            <Tabs.Tab
                                id='account'
                                className='flex items-center h-14 gap-4 bg-[#E7F4F3] px-6 py-4 border-2 border-transparent rounded-md cursor-pointer transition text-foreground font-semibold text-sm md:text-base hover:border-teal-100 data-[selected=true]:border-secondary'
                            >
                                <div className='bg-secondary/40 p-2 rounded-lg' >
                                    <User size={20} />
                                </div>
                                <span>Akun & Login</span>
                                <Tabs.Indicator className='hidden' />
                            </Tabs.Tab>

                        </Tabs.List>
                    </Tabs.ListContainer>

                    <Tabs.Panel id="reporting" className='w-full max-w-4xl mx-auto mt-8 transition-all'>
                        <Accordion className="w-full border border-primary/20 rounded-xl overflow-hidden" variant="surface">
                            {reportingFaq.length > 0 ? reportingFaq.map((item, index) => (
                                <Accordion.Item key={index}>
                                    <Accordion.Heading>
                                        <Accordion.Trigger className='text-primary font-semibold px-5 py-4 text-left text-sm sm:text-base'>
                                            {item.title}
                                            <Accordion.Indicator className='text-primary'><ChevronDown /></Accordion.Indicator>
                                        </Accordion.Trigger>
                                    </Accordion.Heading>
                                    <Accordion.Panel>
                                        <Accordion.Body className='text-[#181C1C] px-5 pb-4 text-xs md:text-sm leading-relaxed font-normal'>
                                            {item.content}
                                        </Accordion.Body>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            )) : <div className="p-4 text-center text-gray-500">Tidak ada hasil ditemukan.</div>}
                        </Accordion>
                    </Tabs.Panel>

                    <Tabs.Panel id="maintenance" className='w-full max-w-4xl mx-auto mt-8 transition-all'>
                        <Accordion className="w-full border border-primary/20 rounded-xl overflow-hidden" variant="surface">
                            {maintenanceFaq.length > 0 ? maintenanceFaq.map((item, index) => (
                                <Accordion.Item key={index}>
                                    <Accordion.Heading>
                                        <Accordion.Trigger className='text-primary font-semibold px-5 py-4 text-left text-sm sm:text-base'>
                                            {item.title}
                                            <Accordion.Indicator className='text-primary'><ChevronDown /></Accordion.Indicator>
                                        </Accordion.Trigger>
                                    </Accordion.Heading>
                                    <Accordion.Panel>
                                        <Accordion.Body className='text-[#181C1C] px-5 pb-4 text-xs md:text-sm leading-relaxed font-normal'>
                                            {item.content}
                                        </Accordion.Body>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            )) : <div className="p-4 text-center text-gray-500">Tidak ada hasil ditemukan.</div>}
                        </Accordion>
                    </Tabs.Panel>

                    <Tabs.Panel id="account" className='w-full max-w-4xl mx-auto mt-8 transition-all'>
                        <Accordion className="w-full border border-primary/20 rounded-xl overflow-hidden" variant="surface">
                            {accountFaq.length > 0 ? accountFaq.map((item, index) => (
                                <Accordion.Item key={index}>
                                    <Accordion.Heading>
                                        <Accordion.Trigger className='text-primary font-semibold px-5 py-4 text-left text-sm sm:text-base'>
                                            {item.title}
                                            <Accordion.Indicator className='text-primary'><ChevronDown /></Accordion.Indicator>
                                        </Accordion.Trigger>
                                    </Accordion.Heading>
                                    <Accordion.Panel>
                                        <Accordion.Body className='text-[#181C1C] px-5 pb-4 text-xs md:text-sm leading-relaxed font-normal'>
                                            {item.content}
                                        </Accordion.Body>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            )) : <div className="p-4 text-center text-gray-500">Tidak ada hasil ditemukan.</div>}
                        </Accordion>
                    </Tabs.Panel>

                </Tabs>
            </div>
        </div>
    );
}