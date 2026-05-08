import React from 'react'
import { Card } from "@heroui/react";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import ReportItem from './report-item';
import { Accessibility } from 'lucide-react';


interface RecentActivityCardProps {
    className?: string,
}

const dummyReports = [
    {
        id: 5,
        user: 'Mahesa',
        title: 'Proyektor Error',
        location: 'Ruang Meeting Utama',
        type: 'rejected',
        description: 'Laporan ditolak karena kabel HDMI hanya kendor, tidak ada kerusakan hardware.',
        datetime: '2024-10-24T09:46:00', 
    },
    {
        id: 4,
        user: 'Rina Wijaya',
        title: 'Kursi Patah',
        location: 'Ruang Kelas A3',
        type: 'completed',
        description: 'Kursi sudah diganti dengan yang baru oleh tim sarana prasarana.',
        datetime: '2024-05-15',
    },
    {
        id: 3,
        user: 'Budi Setiadi',
        title: 'Keran Bocor',
        location: 'Toilet Pria Lt. 1',
        type: 'process',
        description: 'Air terus mengalir meskipun keran sudah ditutup rapat. Boros air!',
        datetime: '2024-05-15T10:00:00',
    },
];

export default function RecentActivityCard({ className = '', }: RecentActivityCardProps) {
    return (
        <Card className={`p-8 rounded-lg shadow-md ${className}`}>
            <Card.Header>
                <Card.Title className='text-lg font-bold font-heading'>Aktivitas Terbaru</Card.Title>
            </Card.Header>
            <Card.Content className='flex flex-col gap-2'>
                {dummyReports.map((report) => (
                    <ReportItem
                        key={report.id}
                        id={report.id} 
                        className='border-t-0 border-r-0 border-l-0 border-b rounded-none last:border-b-0'
                        user={report.user}
                        title={report.title}
                        location={report.location}
                        type={report.type as any} 
                        description={report.description}
                        datetime={report.datetime}
                    />
                ))}
            </Card.Content>
            <Card.Footer />
        </Card>
    )
}
