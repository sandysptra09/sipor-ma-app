import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth'; 
import prisma from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized. Silakan login terlebih dahulu.' },
                { status: 401 }
            );
        }

        const roomCode = params.code;

        if (!roomCode) {
            return NextResponse.json(
                { message: 'Kode ruangan tidak valid!' },
                { status: 400 }
            );
        }

        const room = await prisma.room.findUnique({
            where: {
                code: roomCode,
            },
        });

        if (!room) {
            return NextResponse.json(
                { message: 'Ruangan tidak ditemukan! Pastikan kode QR valid.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Ruangan ditemukan', data: room },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching room by code:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan pada server' },
            { status: 500 }
        );
    }
}