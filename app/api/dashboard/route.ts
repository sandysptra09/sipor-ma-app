import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const [
            totalReports,
            totalResolved,
            totalInProgress,
        ] = await Promise.all([
            prisma.report.count(),

            prisma.report.count({
                where: {
                    status: 'RESOLVED',
                },
            }),

            prisma.report.count({
                where: {
                    status: 'IN_PROGRESS',
                },
            }),
        ]);

        return NextResponse.json({
            data: {
                totalReports,
                totalResolved,
                totalInProgress,
            },
        });

    } catch (error) {
        return NextResponse.json(
            { message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}