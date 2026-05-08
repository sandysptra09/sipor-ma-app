import React from 'react';
import { Card, ProgressBar } from '@heroui/react';
import { Dot } from 'lucide-react';

interface SummaryReportByCategoryCardProps {
  className?: string;
}

const categoryData = [
  { name: 'AC (Air Conditioner)', count: 412, value: 85 },
  { name: 'Kelistrikan', count: 298, value: 65 },
  { name: 'Furniture & Interior', count: 185, value: 40 },
  { name: 'Sanitasi & Air', count: 245, value: 55 },
  { name: 'Infrastruktur Jalan', count: 332, value: 75 },
];

export default function SummaryReportByCategoryCard({ className }: SummaryReportByCategoryCardProps) {
  return (
    <Card className={`p-8 rounded-lg shadow-md ring-0 ${className}`}>
      {/* Header Section */}
      <div className='flex flex-row items-center justify-between mb-8'>
        <div className='flex flex-col'>
          <h3 className='text-lg font-semibold text-foreground'>Kategori Kerusakan</h3>
          <p className='text-sm text-muted-foreground '>
            Distribusi laporan berdasarkan jenis fasilitas.
          </p>
        </div>

        <div className='flex items-center'>
        <Dot size={60} className="text-[color-mix(in_srgb,var(--primary),black_20%)] -mx-4 -my-4" />
          <p className='text-sm font-semibold text-foreground/80'>Aktif</p>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col gap-6'>
        {categoryData.map((item, index) => (
          <div key={index} className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-foreground">{item.name}</span>
              <span className="text-sm text-muted-foreground font-medium">{item.count} Laporan</span>
            </div>

            <ProgressBar className="w-full" size='lg' value={item.value}>
              <ProgressBar.Track>
                <ProgressBar.Fill className='bg-[color-mix(in_srgb,var(--primary),black_20%)]' />
              </ProgressBar.Track>
            </ProgressBar>
          </div>
        ))}
      </div>
    </Card>
  );
}