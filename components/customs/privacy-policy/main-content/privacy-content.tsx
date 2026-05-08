import React from 'react'
import TitleLastUpdate from './title-last-update'
import PrivacySection from "./section/privacy-section";
import PrivacyPoint from "./section/privacy-point";
import InfoCard from './cards/info-card';
import HighlightCard from './cards/highlight-card';
import ContentParagraph from './section/content-paragraph';
import ContactInfo from './contacts/contact-info';
import SectionActionLink from './section/section-action-link';
import InformationUsageCard from './cards/information-usage-card';
import { Calendar, ShieldCheck, Lock, } from 'lucide-react';

export default function PrivacyContent() {
  return (
    <div className="flex flex-col gap-10">
        <TitleLastUpdate label='Terakhir diperbarui' date='31 Maret 2026' startIcon={<Calendar size={18} />} />
        <div className="h-1 w-16 rounded-full bg-primary" />

        <ContentParagraph text="Selamat datang di SIPOR-MA. Kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan sistem pelaporan fasilitas kami." />
        <ContentParagraph text="Dengan mengakses layanan kami, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini. Transparansi adalah fondasi dari kepercayaan institusional kami." />

        <PrivacySection id='pengumpulan' title="Pengumpulan Data">
            <p className="text-sm leading-relaxed text-gray-600">
                Kami mengumpulkan informasi yang diperlukan untuk memberikan layanan pelaporan yang efisien dan akurat. Data yang kami kumpulkan meliputi:
            </p>

            <PrivacyPoint text="Informasi Identitas: Nama lengkap, NIP/Identitas Pegawai, dan alamat email institusi." />
            <PrivacyPoint text="Data Pelaporan: Foto kerusakan, lokasi fasilitas, dan deskripsi detail masalah teknis." />
            <PrivacyPoint text="Informasi Teknis: Alamat IP, jenis perangkat, dan log aktivitas sistem untuk tujuan audit keamanan." />
        </PrivacySection>

        <InformationUsageCard id='penggunaan'
        title="Penggunaan Informasi"
        description="Informasi yang dikumpulkan digunakan secara eksklusif untuk kepentingan pemeliharaan fasilitas dan integritas operasional SIPOR-MA:"
        items={[
            "Memproses dan menindaklanjuti laporan kerusakan fasilitas.",
            "Mengirimkan notifikasi status perbaikan secara real-time.",
            "Melakukan analisis statistik untuk perencanaan anggaran pemeliharaan.",
            "Memastikan kepatuhan terhadap standar keamanan gedung dan aset.",
        ]}
/>

        <PrivacySection id='keamanan' title="Keamanan Data">

            <div className="grid gap-4 md:grid-cols-2">
                <InfoCard
                title="Enkripsi End-to-End"
                description="Semua transmisi data dilindungi menggunakan protokol SSL/TLS standar industri untuk mencegah penyadapan data oleh pihak ketiga.."
                startIcon={<ShieldCheck size={18} />}
                />
                <InfoCard
                title="Kontrol Akses Ketat"
                description="Hanya personel yang berwenang dengan hak akses spesifik yang dapat melihat data identitas pelapor dan detail teknis laporan."
                startIcon={<Lock size={18} />}
                />
            </div>
        </PrivacySection>

        <PrivacySection id='hak' title="Hak Pengguna">
            <ContentParagraph text="Anda memiliki hak penuh atas data Anda, termasuk hak untuk mengakses, mengoreksi, atau meminta penghapusan data pribadi Anda dari sistem kami setelah laporan dianggap selesai secara administratif."/>
            <SectionActionLink label="Pelajari lebih lanjut tentang prosedur permintaan data" href="#"/>
        </PrivacySection>

        <HighlightCard id='perubahan' title="Perubahan Kebijakan" description="Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik operasional atau peraturan hukum. Kami akan memberitahu Anda tentang perubahan signifikan melalui email atau notifikasi sistem di dalam dashboard SIPOR-MA."/>

        <ContactInfo/>
    </div>
  )
}
