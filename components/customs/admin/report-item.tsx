import React from 'react'
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { BadgeCheck, Check, ClipboardClock, Hammer, InboxIcon, TriangleAlert } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type ReportItemType = 'success' | 'process' | 'rejected' | 'verification' | 'pending';

interface ReportItemProps {
    type: ReportItemType;
    key: string | number;
    user: string;
    title: string;
    location: string;
    datetime: Date | string | number;
    description: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function ReportItem({ key, type, title, location, datetime, description, icon, user, className }: ReportItemProps) {

    const typeStyle = {
        success: {
            icon: <Check />,
            badge: 'selesai',
            theme: 'text-primary bg-primary/20',
        },
        process: {
            icon: <Hammer />,
            badge: 'diproses',
            theme: 'text-blue-500 bg-blue-500/20',
        },
        rejected: {
            icon: <TriangleAlert />,
            badge: 'ditolak',
            theme: 'text-red-600 bg-red-500/20',
        },
        verification: {
            icon: <BadgeCheck />,
            badge: 'diverifikasi',
            theme: 'text-amber-500 bg-amber-500/20',
        },
        pending: {
            icon: <ClipboardClock />,
            badge: 'pending',
            theme: 'text-gray-500 bg-gray-500/20',
        }
    }[type];

    const timeAgo = datetime
        ? formatDistanceToNow(new Date(datetime))
        : "";

    return (
        <Item key={key} variant="outline" className={`flex items-start gap-5 ${className}`}>
            <div
                className={`p-3 rounded-lg ${typeStyle.theme}`}
            >
                {icon ? icon : typeStyle.icon}
            </div>
            <ItemContent>
                <ItemTitle className={`w-full flex justify-between text-foreground font-semibold text-[16px] `}>
                    {title} - {location}
                    <p className='text-gray-500 text-xs font-normal text-right'> {timeAgo}</p>
                </ItemTitle>
                <ItemDescription className='text-foreground/80'>
                    {description}
                </ItemDescription>
                <div className='flex items-center text-xs gap-2 '>
                    <span className={`uppercase inline-block px-[11px] py-1 font-semibold text-[10px] rounded-[2px] ${typeStyle.theme}`}>{typeStyle.badge}</span>
                    <p className='text-foreground/80'>Pelapor : {user}</p>
                </div>
            </ItemContent>
        </Item>
    )
}
