import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface ReportDetailCardProps {
    category: string
    submittedAt: string
    reporterInitial: string
    description: string
    location: string
    reporter: string
}

export function ReportDetailCard({
    category,
    submittedAt,
    reporterInitial,
    description,
    location,
    reporter,
}: ReportDetailCardProps) {

    const formattedSubmittedAt = submittedAt
    ? format(
        new Date(submittedAt),
        "dd MMM yyyy, HH:mm 'WIB'",
        {
            locale: id,
        }
    )
    : '-';

    return (
        <Card className='p-8 shadow-md ring-0 rounded-lg'>
            <CardHeader className='p-0 flex items-center justify-between'>
                <div className='flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center'>
                    <span className='order-last md:order-first uppercase bg-primary/10 text-primary font-semibold text-xs inline px-3 py-1 rounded-sm'>
                        {category}
                    </span>
                    <p className='order-first md:order-last text-foreground/40'>Diajukan: {formattedSubmittedAt}</p>
                </div>
                <CardAction className='uppercase p-2.5 rounded-xl bg-foreground/20 font-semibold border-2 text-xs'>
                    {reporterInitial}
                </CardAction>
            </CardHeader>
            <CardContent className='p-0 gap-3'>
                <p className='font-semibold text-lg font-sans'>Deskripsi Keluhan</p>
                <p className='leading-6.5'>{description}</p>
            </CardContent>
            <CardFooter className='bg-foreground/5 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start rounded-[8px]'>
                <div className='flex flex-col gap-1'>
                    <p className='uppercase text-[10px] tracking-[1px] font-semibold text-foreground/40'>Lokasi Spesifik</p>
                    <p className='text-[16px] leading-6 text-[#181C1C] font-medium'>{location}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='uppercase text-[10px] tracking-[1px] font-semibold text-foreground/40'>Pelapor</p>
                    <p className='text-[16px] leading-6 text-[#181C1C] font-medium'>{reporter}</p>
                </div>
            </CardFooter>
        </Card>
    )
}