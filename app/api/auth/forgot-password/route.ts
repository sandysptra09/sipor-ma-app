import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email wajib diisi' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { message: 'Jika email terdaftar, tautan reset akan dikirimkan.' },
                { status: 200 }
            );
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 Jam dari sekarang

        await prisma.passwordResetToken.deleteMany({
            where: { email: user.email as string },
        });

        await prisma.passwordResetToken.create({
            data: {
                email: user.email as string,
                token,
                expires,
            },
        });

        const emailResult = await sendPasswordResetEmail({
            to: user.email as string,
            name: user.name || 'Mahasiswa',
            token,
        });

        if (!emailResult.success) {
            return NextResponse.json(
                { error: 'Gagal mengirim email. Silakan coba lagi nanti.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Tautan reset kata sandi telah dikirim ke email Anda.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('[FORGOT_PASSWORD_ERROR]', error);
        return NextResponse.json(
            { error: 'Terjadi kesalahan pada server.' },
            { status: 500 }
        );
    }
}