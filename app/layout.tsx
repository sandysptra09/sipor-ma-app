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
  title: 'SIPOR-MA | Lapor Sarana Sat-Set',
  description: 'Sistem Informasi Pelaporan Sarana Kampus Mahasiswa',
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
