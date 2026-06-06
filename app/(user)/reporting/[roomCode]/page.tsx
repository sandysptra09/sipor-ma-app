import ReportingContent from "@/components/customs/scan-to-report/reporting-content";

import { Metadata } from "next";

type Props = {
    params: Promise<{ roomCode: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const roomCode = resolvedParams.roomCode.toUpperCase();

    return {
        title: `Lapor Kerusakan Ruang ${roomCode}`,
        description: `Formulir pelaporan kerusakan fasilitas untuk ruangan ${roomCode} menggunakan sistem AI SIPOR-MA.`,
    };
}

export default async function ReportingPage({
    params
}: {
    params: Promise<{ roomCode: string }>
}) {
    const resolvedParams = await params;

    return (
        <div className='min-h-screen w-full bg-background py-10 md:py-12'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <ReportingContent roomCode={resolvedParams.roomCode} />

            </div>
        </div>
    )
}
