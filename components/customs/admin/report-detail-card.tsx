import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { getInitialName } from "@/lib/helpers/getInitialName";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Skeleton } from "@heroui/react"; 

interface ReportDetailCardProps {
    category: string
    submittedAt: string
    reporterInitial: string
    description: string
    location: string
    reporter: string
    loading?: boolean 
}

export function ReportDetailCard({
    category,
    submittedAt,
    reporterInitial,
    description,
    location,
    reporter,
    loading = false, 
}: ReportDetailCardProps) {

    if (loading) {
        return (
            <Card className='p-8 shadow-md ring-0 rounded-lg'>
                <CardHeader className='p-0 flex items-center justify-between'>
                    <div className='flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center'>
                        <Skeleton className='w-24 h-6 rounded-sm' />
                        <Skeleton className='w-40 h-4 rounded-sm' />
                    </div>
                    <Skeleton className='w-10 h-10 rounded-xl' />
                </CardHeader>
                <CardContent className='p-0 gap-3 mt-6'>
                    <Skeleton className='w-40 h-6 rounded-sm mb-4' />
                    <div className="flex flex-col gap-2">
                        <Skeleton className='w-full h-4 rounded-sm' />
                        <Skeleton className='w-full h-4 rounded-sm' />
                        <Skeleton className='w-3/4 h-4 rounded-sm' />
                    </div>
                </CardContent>
                <CardFooter className='bg-foreground/5 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start rounded-[8px] mt-6'>
                    <div className='flex flex-col gap-2'>
                        <Skeleton className='w-24 h-3 rounded-sm' />
                        <Skeleton className='w-48 h-5 rounded-sm' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Skeleton className='w-16 h-3 rounded-sm' />
                        <Skeleton className='w-56 h-5 rounded-sm' />
                    </div>
                </CardFooter>
            </Card>
        )
    }

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
                        {category || '-'}
                    </span>
                    <p className='order-first md:order-last text-foreground/40'>Diajukan: {formattedSubmittedAt}</p>
                </div>
                <CardAction className='uppercase p-2.5 rounded-xl bg-foreground/20 font-semibold border-2 text-xs'>
                    {reporterInitial ? getInitialName(reporterInitial) : '-'}
                </CardAction>
            </CardHeader>
            <CardContent className='p-0 gap-3 mt-6'>
                <p className='font-semibold text-lg font-sans'>Deskripsi Keluhan</p>
                <p className='leading-6.5'>{description || '-'}</p>
            </CardContent>
            <CardFooter className='bg-foreground/5 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start rounded-[8px] mt-6'>
                <div className='flex flex-col gap-1'>
                    <p className='uppercase text-[10px] tracking-[1px] font-semibold text-foreground/40'>Lokasi Spesifik</p>
                    <p className='text-[16px] leading-6 text-[#181C1C] font-medium'>{location || '-'}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='uppercase text-[10px] tracking-[1px] font-semibold text-foreground/40'>Pelapor</p>
                    <p className='text-[16px] leading-6 text-[#181C1C] font-medium'>{reporter || '-'}</p>
                </div>
            </CardFooter>
        </Card>
    )
}