import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Image as ImageIcon, MessageSquare } from 'lucide-react';
import { Skeleton } from "@heroui/react";

interface AttachmentCardProps {
    title: string;
    isRejected?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
}

export default function AttachmentCard({ isRejected, title, loading = false, children }: AttachmentCardProps) {
    if (loading) {
        return (
            <Card className='w-full p-0 flex flex-col self-start items-center rounded-lg shadow-md ring-0'>
                <CardHeader className='flex flex-row items-center gap-2 px-6 py-4 bg-foreground/10 w-full rounded-t-md'>
                    <Skeleton className='w-[21px] h-[21px] rounded-md' />
                    <Skeleton className='w-32 h-4 rounded-sm' />
                </CardHeader>
                <CardContent className='px-6 pt-6 w-full h-full flex flex-col items-center gap-6 pb-8'>
                    <Skeleton className='w-full sm:w-64 h-64 rounded-md' />
                    <Skeleton className='w-full sm:w-64 h-12 rounded-md' />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className='w-full p-0 flex flex-col self-start items-center rounded-lg shadow-md ring-0'>
            <CardHeader className='flex flex-row items-center gap-2 px-6 py-4 bg-foreground/10 w-full rounded-t-md'>
                {isRejected ? (
                    <MessageSquare size={21} className='text-destructive' />
                ) : (
                    <ImageIcon size={21} />
                )}
                <p className='uppercase font-semibold text-sm tracking-[1.4px]'>
                    {title}
                </p>
            </CardHeader>
            <CardContent className='px-6 pt-6 w-full h-full flex flex-col items-center gap-6 pb-8'>
                {children}
            </CardContent>
        </Card>
    );
}