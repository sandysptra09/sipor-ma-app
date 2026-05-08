// components/customs/admin/report-log-card.tsx

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { LogItem } from '@/components/customs/admin/log-item'
import { ComponentProps } from "react"

type LogItemProps = ComponentProps<typeof LogItem>

interface ReportLogCardProps {
    logs: LogItemProps[]
}

export function ReportLogCard({ logs }: ReportLogCardProps) {
    return (
        <Card className='w-full p-0 flex self-start items-center rounded-lg shadow-md gap-0 ring-0'>
            <CardHeader className='mb-0 flex items-center gap-1 px-6 py-4 bg-foreground/10 w-full rounded-t-md'>
                <p className='uppercase font-semibold text-sm tracking-[1.4px]'>
                    Log Laporan
                </p>
            </CardHeader>
            <CardContent className='p-8 w-full h-full flex flex-col items-start gap-8 pb-8'>
                {logs.map((log, index) => (
                    <LogItem key={index} {...log} />
                ))}
            </CardContent>
        </Card>
    )
}