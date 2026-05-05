'use client';

import { Megaphone, MessageSquareDiff, PackageOpen } from 'lucide-react';
import FeatureCard from '../cards/feature-card';

export default function FeaturesSection() {
    return (
        <section className='w-full bg-card py-20 lg:py-28'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <div className='mx-auto mb-16 flex max-w-3xl flex-col items-center gap-4 text-center'>
                    <h2 className='font-heading text-2xl font-extrabold text-[#181C1C] md:text-4xl'>
                        Kelola Laporan Fasilitas dengan Mudah
                    </h2>
                    <p className='text-sm font-normal leading-relaxed text-foreground md:text-base'>
                        Sistem terintegrasi untuk melaporkan, meninjau, dan menyelesaikan permasalahan fasilitas secara cepat, transparan, dan efisien.
                    </p>
                </div>

                <div className='grid grid-cols-1 items-stretch gap-8 md:grid-cols-3'>

                    <FeatureCard
                        icon={<Megaphone size={24} strokeWidth={2} />}
                        title='Report'
                        description='Laporkan permasalahan fasilitas di lingkungan akademik secara mudah dan cepat. Setiap laporan akan diverifikasi dan diteruskan ke unit terkait untuk segera ditindaklanjuti.'
                        href='/login'
                        delay={0.1}
                        modalSubtitle='Laporkan masalah fasilitas kampus'
                        modalFullDescription='Fitur Report memungkinkan kamu untuk melaporkan berbagai permasalahan fasilitas secara cepat, mudah, dan terstruktur. Kamu dapat menambahkan detail laporan seperti deskripsi masalah, lokasi, serta bukti pendukung agar tim dapat memahami kondisi yang terjadi dengan lebih akurat.'
                        modalSteps={[
                            { title: 'Isi formulir laporan', description: 'Lokasi, jenis kerusakan, dan foto pendukung' },
                            { title: 'Laporan diverifikasi', description: 'Tim kami merespons dalam 1x24 jam' },
                            { title: 'Pantau status real-time', description: 'Lacak perkembangan penanganan kapanpun' }
                        ]}
                    />

                    <FeatureCard
                        icon={<MessageSquareDiff size={24} strokeWidth={2} />}
                        title='Review'
                        description='Tinjau dan pantau setiap laporan fasilitas yang masuk. Berikan penilaian kelayakan dan prioritas penanganan untuk memastikan efisiensi respons.'
                        href='/login'
                        delay={0.2}
                        modalSubtitle='Tinjau & evaluasi laporan masuk'
                        modalFullDescription='Fitur Review membantu tim dalam mengelola dan meninjau setiap laporan yang masuk secara terpusat dan efisien. Di dalam fitur ini, setiap laporan dapat dianalisis berdasarkan tingkat urgensi, dampak, serta kelayakan untuk ditindaklanjuti. Proses review dilakukan secara sistematis untuk memastikan tidak ada laporan yang terlewat.'
                        modalSteps={[
                            { title: 'Filter laporan masuk', description: 'Berdasarkan kategori, status, atau tanggal' },
                            { title: 'Verifikasi & beri prioritas', description: 'Tentukan urgensi dan kelayakan laporan' },
                            { title: 'Assign ke penanggung jawab', description: 'Teruskan ke unit atau petugas yang sesuai' }
                        ]}
                    />

                    <FeatureCard
                        icon={<PackageOpen size={24} strokeWidth={2} />}
                        title='Resolve'
                        description='Selesaikan permasalahan fasilitas dengan alur kerja yang terstruktur. Catat progres penyelesaian dan dokumentasikan hasil perbaikan secara transparan.'
                        href='/login'
                        delay={0.3}
                        modalSubtitle='Selesaikan & dokumentasikan perbaikan'
                        modalFullDescription='Fitur Resolve digunakan untuk menindaklanjuti laporan yang telah ditinjau dengan proses kerja yang terstruktur dan terdokumentasi. Tim dapat mencatat setiap tahapan perbaikan, mulai dari penugasan, progres pengerjaan, hingga hasil akhir dari penyelesaian masalah.'
                        modalSteps={[
                            { title: 'Terima penugasan', description: 'Periksa detail laporan yang diassign ke kamu' },
                            { title: 'Update progres & bukti', description: 'Catat tiap tahap perbaikan dengan foto/dokumen' },
                            { title: 'Tandai selesai & tutup', description: 'Konfirmasi penyelesaian secara resmi' }
                        ]}
                    />

                </div>

            </div>
        </section>
    );
}