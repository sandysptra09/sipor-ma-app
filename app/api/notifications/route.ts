import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized. Silakan login terlebih dahulu.' },
                { status: 401 }
            );
        }

       
        const notifications = await prisma.notification.findMany({
            where: {
                userId: session.user.id, 
            },
            orderBy: {
                createdAt: 'desc', 
            },
        });

        return NextResponse.json(notifications, { status: 200 });

    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan sistem saat mengambil notifikasi.' },
            { status: 500 }
        );
    }
}