import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth'; 
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'; 

export async function PATCH(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { oldPassword, newPassword } = body;

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user?.password) {
            return NextResponse.json({ message: 'User tidak memiliki password (login via Google/OAuth)' }, { status: 400 });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ message: 'Password lama salah!' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Password berhasil diubah' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
    }
}