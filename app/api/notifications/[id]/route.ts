import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
        }

        const params = await context.params;

        const updatedNotif = await prisma.notification.update({
            where: { id: params.id },
            data: { isRead: true }
        });

        return NextResponse.json(updatedNotif, { status: 200 });
    } catch (error) {
        console.error('Error updating notification:', error);
        return NextResponse.json(
            { message: 'Gagal memperbarui status notifikasi' },
            { status: 500 }
        );
    }
}