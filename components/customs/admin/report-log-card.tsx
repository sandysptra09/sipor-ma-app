import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { LogItem } from '@/components/customs/admin/log-item'
import {
    Inbox,
    ClipboardCheck,
    Wrench,
    CheckCircle2,
    FileText,
    CircleX
} from "lucide-react"
import { Skeleton } from "@heroui/react"

export interface ReportLog {
    id?: string
    reportId?: string
    status: 'PENDING' | 'VERIFIED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED' | string
    note: string
    createdAt: string
}

interface ReportLogCardProps {
    logs?: ReportLog[]
    loading?: boolean
}

const getStatusTitle = (status: string) => {
    switch (status) {
        case 'PENDING':
            return 'Laporan Diterima'
        case 'VERIFIED':
            return 'Laporan Diverifikasi'
        case 'IN_PROGRESS':
            return 'Ditugaskan ke Tim Teknis'
        case 'RESOLVED':
            return 'Kerusakan Telah Diperbaiki'
        case 'REJECTED':
            return 'Laporan Ditolak'
        default:
            return status
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'PENDING':
            return Inbox
        case 'VERIFIED':
            return ClipboardCheck
        case 'IN_PROGRESS':
            return Wrench
        case 'RESOLVED':
            return CheckCircle2
        case 'REJECTED':
            return CircleX
        default:
            return FileText
    }
}

const formatDateTime = (isoString?: string) => {
    if (!isoString) return { date: '-', time: '-' };

    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const time = dateObj.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return { date, time };
}

export function ReportLogCard({ logs = [], loading = false }: ReportLogCardProps) {
    if (loading) {
        return (
            <Card className='w-full p-0 flex flex-col self-start items-center rounded-lg shadow-md gap-0 ring-0'>
                <CardHeader className='mb-0 flex items-center gap-1 px-6 py-4 bg-foreground/10 w-full rounded-t-md'>
                    <Skeleton className='w-24 h-5 rounded-md' />
                </CardHeader>
                <CardContent className='p-8 w-full h-full flex flex-col items-start gap-8 pb-8'>
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="flex w-full gap-4">
                            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton className="w-48 h-5 rounded-md" />
                                <Skeleton className="w-full max-w-[250px] h-4 rounded-md" />
                                <div className="flex gap-2 mt-1">
                                    <Skeleton className="w-16 h-3 rounded-md" />
                                    <Skeleton className="w-12 h-3 rounded-md" />
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className='w-full p-0 flex flex-col self-start items-center rounded-lg shadow-md gap-0 ring-0'>
            <CardHeader className='mb-0 flex items-center gap-1 px-6 py-4 bg-foreground/10 w-full rounded-t-md'>
                <p className='uppercase font-semibold text-sm tracking-[1.4px]'>
                    Log Laporan
                </p>
            </CardHeader>
            <CardContent className='p-8 w-full h-full flex flex-col items-start gap-8 pb-8'>

                {logs && logs.length > 0 ? (
                    logs.map((log, index) => {
                        const { date, time } = formatDateTime(log?.createdAt);

                        const dynamicColor = index === 0
                            ? "text-emerald-600 bg-emerald-100"
                            : "";

                        return (
                            <LogItem
                                key={log?.id || `log-${index}`}
                                icon={getStatusIcon(log?.status)}
                                iconClassName={dynamicColor}
                                title={getStatusTitle(log?.status)}
                                description={log?.note || '-'}
                                date={date}
                                time={time}
                            />
                        )
                    })
                ) : (
                    <div className="flex items-center justify-center w-full py-4">
                        <p className="text-sm text-slate-500 italic">Belum ada riwayat log.</p>
                    </div>
                )}

            </CardContent>
        </Card>
    )
}