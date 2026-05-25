import React from 'react';
import { Card, Skeleton } from '@heroui/react';
import { ActivityLogData } from '@/app/(admin)/admin/profile/intefaces'; 

interface LogActivityItemsCardProps {
  logs?: ActivityLogData[];
  isLoading: boolean;
}

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} detik yang lalu`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} hari yang lalu`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} bulan yang lalu`;
};

export default function LogActivityItemsCard({ logs = [], isLoading }: LogActivityItemsCardProps) {
  
  if (isLoading) {
    return (
      <Card className="w-full bg-white shadow-sm border-none rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-32 h-6 rounded-lg" />
        </div>
        <div className="flex flex-col">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 py-3">
              <Skeleton className="mt-1.5 w-2 h-2 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="w-3/4 h-4 rounded-lg" />
                <Skeleton className="w-1/2 h-3 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-sm border-none rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <h3 className="font-bold text-base text-[#181C1C]">Aktivitas Terakhir</h3>
      </div>

      {/* Activity List */}
      <div className="flex flex-col">
        {logs.length === 0 ? (
          <p className="text-sm text-gray-400 py-4">Belum ada aktivitas tercatat.</p>
        ) : (
          logs.map((item, index) => (
            <div key={item.id} className="flex items-start gap-3 py-3">
              {/* Dot indicator */}
              <span className="mt-1.5 w-2 h-2 rounded-full bg-primary/30 shrink-0" />

              {/* Content */}
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-[#181C1C]">{item.title}</span>
                <span className="text-xs text-gray-400">
                  {timeAgo(item.createdAt)} – {item.type.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}