import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'SIPOR-MA | Sistem Pelaporan Fasilitas Kampus',
    template: '%s | SIPOR-MA',
  },
  description: 'Sistem Pelaporan Fasilitas Kampus terintegrasi AI untuk mahasiswa dan staf Sarpras.',
  authors: [
    { name: 'Sandy Saputra' },
    { name: 'Mahesa Syawal A' },
    { name: 'Ihsan Fathin Mohammed' },
    { name: 'Ikhsanul Richi Fauzi' },
  ],
  creator: 'Tim Developer SIPOR-MA',
  publisher: 'Universitas Pendidikan Indonesia - Program Studi Rekayasa Perangkat Lunak',
  keywords: ['SIPOR-MA', 'Pelaporan Kampus', 'Fasilitas', 'Sarpras', 'Sarana Prasarana', 'Analisis Laporan Kampus', 'Transparansi Kampus',],
  openGraph: {
    title: 'SIPOR-MA | Sistem Pelaporan Fasilitas',
    description: 'Laporkan kerusakan fasilitas kampusmu dengan cepat dan transparan.',
    url: 'https://www.sipor-ma.web.id',
    siteName: 'SIPOR-MA',
    images: [
      {
        url: '/assets/images/siporma-og.png',
        width: 1200,
        height: 630,
        alt: 'SIPOR-MA Preview Image',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='id'
      className={cn(
        'h-full',
        'antialiased',
        poppins.variable,
        plusJakartaSans.variable,
        'font-sans',
      )}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
