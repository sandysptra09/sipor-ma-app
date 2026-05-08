import React from 'react'
import PrivacyPointTerms from './section-terms/privacy-point-terms';
import PrivacySectionTerms from './section-terms/privacy-section-terms';
import TermsLastUpdate from './terms-last-update';
import InformationTermsCard from './information-terms-card';
import { Calendar } from 'lucide-react';

export default function TermsContent() {
  return (
    <div className="flex flex-col gap-10">
        <TermsLastUpdate label='Terakhir diperbarui' date='31 Maret 2026' startIcon={<Calendar size={18} />} />
        <div className="h-1 w-16 rounded-full bg-primary" />

        <PrivacySectionTerms id='ketentuan' title='Ketentuan Umum'>
            <p className="text-sm leading-relaxed text-gray-600">
                Selamat datang di SIPOR-MA. Dengan mengakses dan menggunakan platform ini, Anda secara otomatis menyetujui seluruh ketentuan yang ditetapkan dalam dokumen ini.
            </p>

            <p className="text-sm leading-relaxed text-gray-600">
                Layanan kami dirancang untuk memfasilitasi transparansi dalam pelaporan kerusakan fasilitas institusi. Pengguna diwajibkan untuk:
            </p>

            <PrivacyPointTerms text="Memberikan informasi yang akurat dan sesuai dengan fakta di lapangan." />
            <PrivacyPointTerms text="Menghormati hak privasi staf dan pengguna fasilitas lainnya." />
            <PrivacyPointTerms text="Menggunakan platform hanya untuk tujuan pemeliharaan infrastruktur yang sah." />
        </PrivacySectionTerms>

        <PrivacySectionTerms id='keamanan' title='Keamanan Akun'>
            <p className="text-sm leading-relaxed text-gray-600">
                Setiap pengguna bertanggung jawab penuh atas kerahasiaan kredensial login mereka. SIPOR-MA tidak akan bertanggung jawab atas penyalahgunaan akun yang disebabkan oleh kelalaian pengguna.
            </p>

            <InformationTermsCard description="Penting: Jika Anda mencurigai adanya akses tidak sah ke akun Anda, segera hubungi tim dukungan teknis kami melalui portal bantuan."/>
        </PrivacySectionTerms>

        <PrivacySectionTerms id='prosedur' title='Prosedur Laporan'>
            <p className="text-sm leading-relaxed text-gray-600">
                Setiap laporan yang masuk akan melewati proses validasi oleh sistem kami. <span className='text-primary'>Transparasi</span> adalah inti dari sistem ini, oleh karena itu setiap perkembangan perbaikan akan dapat dipantau secara langsung oleh pelapor melalui dashboard.
            </p>

            <p className="text-sm leading-relaxed text-gray-600">
                Laporan yang dianggap palsu atau bersifat spam akan dihapus, dan akun yang bersangkutan dapat ditangguhkan sementara atau permanen.
            </p>
        </PrivacySectionTerms>

        <PrivacySectionTerms id='kebijakan' title='Kebijakan Privasi'>
            <p className="text-sm leading-relaxed text-gray-600">
                Data yang dikumpulkan melalui SIPOR-MA digunakan semata-mata untuk keperluan operasional pemeliharaan gedung. Kami tidak akan menjual atau membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan tertulis.
            </p>

            <p className="text-sm leading-relaxed text-gray-600">
                Untuk detail lebih lanjut, silakan baca <a href='privacy-policy' className='text-primary font-medium'> Kebijakan Privasi </a> kami yang terpisah.
            </p>
        </PrivacySectionTerms>

        <PrivacySectionTerms id='batasan' title='Batasan Tanggung Jawab'>
            <p className="text-sm leading-relaxed text-gray-600">
                Meskipun kami berusaha keras untuk menjaga akurasi data, SIPOR-MA tidak menjamin bahwa platform akan selalu bebas dari gangguan teknis. Kami berhak melakukan pemeliharaan rutin yang mungkin menyebabkan downtime singkat pada sistem.
            </p>
        </PrivacySectionTerms>

        <PrivacySectionTerms id='perubahan' title='Perubahan Ketentuan'>
            <p className="text-sm leading-relaxed text-gray-600">
                Kami berhak untuk mengubah atau memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini. Kami menyarankan Anda untuk meninjau halaman ini secara berkala untuk tetap mendapatkan informasi terbaru.
            </p>
        </PrivacySectionTerms>

    </div>
  )
}
