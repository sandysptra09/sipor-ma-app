import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Image as ImageIcon, MessageSquare } from 'lucide-react'
import { Button } from '@heroui/react';

interface AttachmentCardProps {
    title: string;
    isRejected?: boolean;
    children?: React.ReactNode;
}

export default function AttachmentCard({ isRejected, title, children }: AttachmentCardProps) {
    return (
        <Card className='w-full p-0 flex self-start items-center rounded-lg shadow-md ring-0'>
            <CardHeader className='flex items-center gap-2 px-6 py-4 bg-foreground/10 w-full rounded-t-md'>
                {isRejected ? (
                    <MessageSquare size={21} className='text-destructive' />
                ) : (
                    <ImageIcon size={21} />
                )}
                <p className='uppercase font-semibold text-sm tracking-[1.4px]'>
                    {title}
                </p>
            </CardHeader>
            <CardContent className='px-6 w-full h-full flex flex-col items-center gap-6 pb-8'>
                {children}
            </CardContent>
        </Card>
    )
}
