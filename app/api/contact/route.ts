import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ message: 'Semua field wajib diisi!' }, { status: 400 });
        }

        const emailResult = await sendContactEmail({ name, email, message });

        if (!emailResult.success) {
            return NextResponse.json({ message: 'Gagal mengirim pesan, coba lagi nanti.' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Pesan berhasil dikirim!' }, { status: 200 });
    } catch (error) {
        console.error('[CONTACT API ERROR]', error);
        return NextResponse.json({ message: 'Terjadi kesalahan server internal.' }, { status: 500 });
    }
}