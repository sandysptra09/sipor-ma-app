import React from 'react'
import { Card, Skeleton } from "@heroui/react";
import ReportItem from './report-item';

type ReportItemType = 'RESOLVED' | 'IN_PROGRESS' | 'REJECTED' | 'VERIFIED' | 'PENDING' | 'CANCELED';

export interface ActivityData {
    id: string;
    reportNumber: string;
    type: ReportItemType;
    createdAt: string;
    description: string;
    reportTitle: string;
    room: string;
    reporterName: string;
}

interface RecentActivityCardProps {
    className?: string;
    data?: ActivityData[];
    loading?: boolean;
}

export default function RecentActivityCard({ 
    className = '', 
    data = [], 
    loading = false 
}: RecentActivityCardProps) {
    
    return (
        <Card className={`p-8 rounded-lg shadow-sm ${className}`}>
            <Card.Header>
                <Card.Title className='text-lg font-bold font-heading'>Aktivitas Terbaru</Card.Title>
            </Card.Header>
            <Card.Content className='flex flex-col gap-2'>
                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex gap-4 items-start border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                                <Skeleton className="flex rounded-full w-10 h-10 shrink-0" />
                                <div className="w-full flex flex-col gap-2 mt-1">
                                    <Skeleton className="h-4 w-3/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                    <Skeleton className="h-3 w-2/5 rounded-lg mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex justify-center items-center py-6 text-default-400 text-sm">
                        Belum ada aktivitas terbaru.
                    </div>
                ) : (
                    data.map((report) => (
                        <ReportItem
                            key={report.id}
                            id={encodeURIComponent(report.reportNumber)} 
                            className='border-t-0 border-r-0 border-l-0 border-b rounded-none last:border-b-0'
                            user={report.reporterName}
                            title={report.reportTitle || 'Tanpa Judul'}
                            location={report.room || 'Lokasi tidak diketahui'}
                            type={report.type || 'PENDING'} 
                            description={report.description}
                            datetime={report.createdAt}
                        />
                    ))
                )}
            </Card.Content>
            <Card.Footer />
        </Card>
    )
}