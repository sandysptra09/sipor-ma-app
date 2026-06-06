import ReportDetailClient from './report-detail-client';

import { Metadata } from 'next';

type Props = {
    params: Promise<{ reportId: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const reportId = resolvedParams.reportId.toUpperCase();

    return {
        title: `Laporan ${reportId}`,
        description: `Pantau status dan detail perbaikan untuk laporan fasilitas dengan nomor ${reportId} di SIPOR-MA.`,
    };
}

export default function ReportDetailPage() {
    return <ReportDetailClient />
}