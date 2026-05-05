import React from 'react'
import { Card } from "@heroui/react";
import Link from 'next/link';
import { Archive, CircleCheckBig, InboxIcon, Wrench } from 'lucide-react';

// type 
type ReportStatus = 'incoming' | 'in-progress' | 'completed';

// interface SummaryCardReport
interface SummaryCardReportProps {
  className?: string;
  title: string;
  subTitle: string;
  count: number;
  type: ReportStatus;
  loading: boolean;
  description?: React.ReactNode;
}

export default function SummaryCardReport({ className, title, count, type, loading, description }: SummaryCardReportProps) {

  const statusStyle = {
    incoming: {
      title: "text-[color-mix(in_srgb,var(--primary),black_20%)]",
      subTitle: "text-primary",
      iconBg: "bg-primary/10 text-[color-mix(in_srgb,var(--primary),black_20%)]",
      icon: <InboxIcon />,
    },
    'in-progress': {
      title: "text-[#B45309]",
      subTitle: "text-[#FBBF24]",
      iconBg: "bg-[#FBBF24]/10 text-[#B45309]",
      icon: <Wrench />,
    },
    completed: {
      title: "text-[color-mix(in_srgb,var(--primary),black_20%)]",
      subTitle: "text-primary",
      iconBg: "bg-primary/10 text-[color-mix(in_srgb,var(--primary),black_20%)]",
      icon: <CircleCheckBig />,
    },
  }[type];

  return (
    <Card className={`rounded-lg p-5 ${type === 'in-progress' ? 'border-l-4 border-[#FBBF24]' : ""}  ${className ? className : ''}`}>
      <div className="flex justify-between items-start gap-4">
        <div className='flex flex-col gap-1'>
          <Card.Title className="text-sm">{title ? title : 'Laporan Masuk'}</Card.Title>
          <p className={`text-4xl font-bold font-heading ${statusStyle.title}`}>{count}</p>
          <div className={`text-xs font-semibold flex items-center gap-1 ${statusStyle.subTitle}`}>
            {description}
          </div>
        </div>
        <div className={`flex-shrink-0 flex justify-center items-center rounded-lg ${statusStyle.iconBg} w-12 h-12`}>
          {statusStyle.icon}
        </div>
      </div>
    </Card>
  );
}
