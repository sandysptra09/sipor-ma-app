"use client";

import React from 'react';
import Link from 'next/link'; 
import {
    Card,
    CardContent
} from "@/components/ui/card";
import {
    BadgeCheck,
    Check,
    ClipboardClock,
    Hammer,
    TriangleAlert
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";

type ReportItemType = 'success' | 'process' | 'rejected' | 'verification' | 'pending';

interface ReportItemProps {
    id: string | number;
    type: ReportItemType;
    user: string;
    title: string;
    location: string;
    datetime: Date | string | number;
    description: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function ReportItem({
    id,
    type,
    title,
    location,
    datetime,
    description,
    icon,
    user,
    className
}: ReportItemProps) {

    const typeStyle = {
        success: {
            icon: <Check size={20} />,
            badge: 'selesai',
            theme: 'text-primary bg-primary/20',
        },
        process: {
            icon: <Hammer size={20} />,
            badge: 'diproses',
            theme: 'text-blue-500 bg-blue-500/20',
        },
        rejected: {
            icon: <TriangleAlert size={20} />,
            badge: 'ditolak',
            theme: 'text-red-600 bg-red-500/20',
        },
        verification: {
            icon: <BadgeCheck size={20} />,
            badge: 'diverifikasi',
            theme: 'text-amber-500 bg-amber-500/20',
        },
        pending: {
            icon: <ClipboardClock size={20} />,
            badge: 'pending',
            theme: 'text-gray-500 bg-gray-500/20',
        }
    }[type];

    const timeAgo = datetime
        ? formatDistanceToNow(new Date(datetime), {
            addSuffix: true,
        })
        : "";

    return (
        <Link href={`/admin/reports/${id}`} className="block transition-transform active:scale-[0.98] border-b border-b-2 border-gray-100 last:border-0">
            <Card className={cn("flex flex-row items-start px-2 py-4 gap-5 rounded-none shadow-none ring-0 border-0 hover:bg-background", className)}>
                {/* Icon Container */}
                <div className={cn("p-3 rounded-lg shrink-0", typeStyle.theme)}>
                    {icon ? icon : typeStyle.icon}
                </div>

                {/* Content Container */}
                <CardContent className="p-0 w-full flex flex-col gap-1 min-w-0">
                    {/* Title and Time Container */}
                    <div className="w-full flex flex-row justify-between items-start gap-4">
                        <h3
                            className="text-foreground font-semibold text-[16px] truncate min-w-0"
                            title={`${title} - ${location}`}
                        >
                            {title} - {location}
                        </h3>

                        <span className="text-gray-500 text-[11px] font-normal whitespace-nowrap shrink-0 pt-0.5">
                            {timeAgo}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/80 text-[14px] leading-relaxed line-clamp-2">
                        {description}
                    </p>

                    {/* Badge and User */}
                    <div className="flex items-center text-xs gap-2 mt-1">
                        <span className={cn(
                            "uppercase inline-block px-[11px] py-1 font-semibold text-[10px] rounded-[2px]",
                            typeStyle.theme
                        )}>
                            {typeStyle.badge}
                        </span>
                        <p className="text-foreground/80">Pelapor : {user}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}