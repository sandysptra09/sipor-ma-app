import prisma from '@/lib/prisma';

export async function generateReportNumber(): Promise<string> {

    const currentYear = new Date().getFullYear().toString();
    const prefix = `#SPM-${currentYear}-`;

    const lastReport = await prisma.report.findFirst({
        where: {
            reportNumber: {
                startsWith: prefix,
            }
        },
        orderBy: {
            reportNumber: 'desc'
        }
    });

    if (!lastReport) {
        return `${prefix}001`;
    }

    const lastSequenceStr = lastReport.reportNumber.replace(prefix, ''); 
    const nextSequenceNum = parseInt(lastSequenceStr, 10) + 1;           
    
    const nextSequenceStr = nextSequenceNum.toString().padStart(3, '0');

    return `${prefix}${nextSequenceStr}`; 
}