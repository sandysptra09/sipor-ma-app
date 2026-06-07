import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token, password } = body;

        if (!token || !password) {
            return NextResponse.json(
                { error: 'Token dan kata sandi baru wajib diisi.' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Kata sandi minimal harus 8 karakter.' },
                { status: 400 }
            );
        }

        const resetTokenRecord = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetTokenRecord) {
            return NextResponse.json(
                { error: 'Tautan reset tidak valid atau sudah digunakan.' },
                { status: 400 }
            );
        }

        if (new Date() > resetTokenRecord.expires) {
            await prisma.passwordResetToken.delete({
                where: { id: resetTokenRecord.id },
            });
            
            return NextResponse.json(
                { error: 'Tautan reset sudah kedaluwarsa. Silakan request tautan baru.' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: resetTokenRecord.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Akun tidak ditemukan.' },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.$transaction([
            prisma.user.update({
                where: { email: resetTokenRecord.email },
                data: { password: hashedPassword },
            }),
            prisma.passwordResetToken.delete({
                where: { id: resetTokenRecord.id },
            }),
        ]);

        return NextResponse.json(
            { message: 'Kata sandi berhasil diperbarui! Silakan login menggunakan kata sandi baru Anda.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('[RESET_PASSWORD_ERROR]', error);
        return NextResponse.json(
            { error: 'Terjadi kesalahan pada server saat memperbarui kata sandi.' },
            { status: 500 }
        );
    }
}