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
    TriangleAlert,
    BellDot, 
    Bell     
} from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns'
import { cn } from "@/lib/utils";

type ReportItemType = 'RESOLVED' | 'IN_PROGRESS' | 'REJECTED' | 'VERIFIED' | 'PENDING' | 'CANCELED';

interface ReportItemProps {
    id: string | number;
    type?: ReportItemType;
    user: string;
    title: string;
    location: string;
    datetime: Date | string | number;
    description: string;
    icon?: React.ReactNode;
    className?: string;
    isRead?: boolean;
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
    className,
    isRead
}: ReportItemProps) {

    let activeStyleKey: string;

    if (isRead !== undefined) {
        activeStyleKey = isRead === false ? 'UNREAD_NOTIF' : 'READ_NOTIF';
    } else {
        activeStyleKey = type || 'PENDING'; 
    }

    const STYLE_MAP = {
        RESOLVED: { icon: <Check size={20} />, badge: 'selesai', theme: 'text-primary bg-primary/20' },
        IN_PROGRESS: { icon: <Hammer size={20} />, badge: 'diproses', theme: 'text-blue-500 bg-blue-500/20' },
        REJECTED: { icon: <TriangleAlert size={20} />, badge: 'ditolak', theme: 'text-red-600 bg-red-500/20' },
        CANCELED: { icon: <TriangleAlert size={20} />, badge: 'dibatalkan', theme: 'text-red-600 bg-red-500/20' },
        VERIFIED: { icon: <BadgeCheck size={20} />, badge: 'diverifikasi', theme: 'text-amber-500 bg-amber-500/20' },
        PENDING: { icon: <ClipboardClock size={20} />, badge: 'pending', theme: 'text-gray-500 bg-gray-500/20' },

        UNREAD_NOTIF: { icon: <BellDot size={20} />, badge: 'baru', theme: 'text-primary bg-primary/20' },
        READ_NOTIF: { icon: <Bell size={20} />, badge: 'dibaca', theme: 'text-gray-400 bg-gray-100' }
    };

    const typeStyle = STYLE_MAP[activeStyleKey as keyof typeof STYLE_MAP];

    const timeAgo = datetime
        ? formatDistanceToNowStrict(new Date(datetime), { addSuffix: true })
        : "";

    const handleMarkAsRead = () => {
        if (isRead === false && typeof window !== 'undefined') {
            fetch('/api/admin/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isRead: true })
            }).catch(error => console.error('Gagal update status read:', error));
        }
    };

    return (
        <Link
            href={`/admin/report-management/${id}`}
            onClick={handleMarkAsRead}
            className="block transition-transform active:scale-[0.98] border-b-2 border-gray-100 last:border-0"
        >
            <Card className={cn(
                "flex flex-row items-start px-2 py-4 gap-5 rounded-none shadow-none ring-0 border-0 transition-colors",
                isRead === false ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-background",
                className
            )}>
                <div className={cn("hidden md:flex p-3 rounded-lg shrink-0", typeStyle.theme)}>
                    {icon ? icon : typeStyle.icon}
                </div>

                <CardContent className="p-0 w-full flex flex-col gap-1 min-w-0">
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

                    <p className="text-foreground/80 text-[14px] leading-relaxed line-clamp-2">
                        {description}
                    </p>

                    <div className="flex items-center text-xs gap-2 mt-1">
                        {isRead === undefined && (
                            <span
                                className={cn(
                                    "uppercase inline-block px-[11px] py-1 font-semibold text-[10px] rounded-[2px]",
                                    typeStyle.theme
                                )}
                            >
                                {typeStyle.badge}
                            </span>
                        )}
                        <p className="text-foreground/80">Pelapor : {user}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}