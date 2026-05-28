import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth'; 
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized. Silakan login terlebih dahulu.' },
                { status: 401 }
            );
        }

        const userProfile = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                nim_nip: true,
                role: true,
                image: true,
                createdAt: true,
                reports: true, 
                studyProgram:true,
                faculty:true,
                enrollmentYear:true,
                campusEmail:true,
                activityLogs: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take:3,
                },
            }
        });

        if (!userProfile) {
            return NextResponse.json({ message: 'User tidak ditemukan!' }, { status: 404 });
        }

        return NextResponse.json({ data: userProfile }, { status: 200 });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const {image } = body; 

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                ...(image && { image }),
            },
        });

        return NextResponse.json({ message: 'Profil berhasil diperbarui', data: updatedUser }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
    }
}