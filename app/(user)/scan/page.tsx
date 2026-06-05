import ScanToReportContent from "@/components/customs/scan-to-report/scan-to-report-content";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Scan QR Ruangan',
    description: 'Pindai QR Code di ruangan kampus untuk membuat laporan kerusakan fasilitas secara instan dan otomatis.',
};

export default function ScanPage() {
    return (
        <div className='w-full bg-background py-10 md:py-14 min-h-[70vh] flex flex-col justify-center'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <ScanToReportContent />

            </div>
        </div>
    )
}
