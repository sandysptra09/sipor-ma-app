import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
        }

        const activities = await prisma.activityLog.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        });

        return NextResponse.json(activities, { status: 200 });

    } catch (error) {
        console.error('[GET_ACTIVITIES_ERROR]', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan sistem saat mengambil aktivitas.' },
            { status: 500 }
        );
    }
}
