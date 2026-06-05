import LandingContent from "@/components/customs/landing/landing-content";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Beranda',
  description: 'Selamat datang di SIPOR-MA. Laporkan kerusakan fasilitas kampus dengan mudah, cepat, dan transparan terintegrasi AI.',
};

export default function HomePage() {
  return (
    <>
      <LandingContent />
    </>
  );
}
