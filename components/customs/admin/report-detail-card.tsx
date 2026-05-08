// components/customs/admin/report-detail-card.tsx

import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

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
    return (
        <Card className='p-8 shadow-md ring-0 rounded-lg'>
            <CardHeader className='p-0 flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <span className='uppercase bg-primary/10 text-primary font-semibold text-xs inline px-3 py-1 rounded-sm'>
                        {category}
                    </span>
                    <p className='text-foreground/40'>Diajukan: {submittedAt}</p>
                </div>
                <CardAction className='uppercase p-2.5 rounded-xl bg-foreground/20 font-semibold border-2 text-xs'>
                    {reporterInitial}
                </CardAction>
            </CardHeader>
            <CardContent className='p-0 gap-3'>
                <p className='font-semibold text-lg font-sans'>Deskripsi Keluhan</p>
                <p className='leading-6.5'>{description}</p>
            </CardContent>
            <CardFooter className='bg-foreground/5 p-6 grid grid-cols-2 gap-6 items-start rounded-[8px]'>
                <div className='flex flex-col gap-1'>
                    <p className='uppercase text-[10px] tracking-[1px] font-semibold text-foreground/40'>Lokasi Spesifik</p>
                    <p className='text-[16px] leading-6 text-[#181C1C]'>{location}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='uppercase text-[10px] tracking-[1px] font-semibold text-foreground/40'>Pelapor</p>
                    <p className='text-[16px] leading-6 text-[#181C1C]'>{reporter}</p>
                </div>
            </CardFooter>
        </Card>
    )
}