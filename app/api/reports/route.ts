import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized. Silakan login terlebih dahulu.' },
                { status: 401 }
            );
        }

        const userReports = await prisma.report.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: 'desc', 
            },
        });

        return NextResponse.json({
            message: 'Berhasil mengambil data laporan',
            data: userReports
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching user reports:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan sistem saat mengambil data laporan.' },
            { status: 500 }
        );
    }
}