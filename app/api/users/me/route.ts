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
        const { image, campusEmail, studyProgram, faculty, enrollmentYear } = body; 

        const htmlRegex = /[<>]/; 
        if (
            (campusEmail && htmlRegex.test(campusEmail)) ||
            (studyProgram && htmlRegex.test(studyProgram)) ||
            (faculty && htmlRegex.test(faculty))
        ) {
            return NextResponse.json(
                { message: 'Input tidak valid: Dilarang menggunakan karakter atau tag HTML.' }, 
                { status: 400 }
            );
        }

        if (campusEmail) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(campusEmail)) {
                return NextResponse.json(
                    { message: 'Format email kampus tidak valid.' }, 
                    { status: 400 }
                );
            }
        }

        let validEnrollmentYear = null;
        if (enrollmentYear !== undefined && enrollmentYear !== null && enrollmentYear !== '') {
            validEnrollmentYear = parseInt(enrollmentYear, 10);
            
            if (isNaN(validEnrollmentYear)) {
                return NextResponse.json(
                    { message: 'Tahun angkatan harus berupa angka bulat.' }, 
                    { status: 400 }
                );
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                ...(image && { image }),
                ...(campusEmail !== undefined && { campusEmail }),
                ...(studyProgram !== undefined && { studyProgram }),
                ...(faculty !== undefined && { faculty }),
                ...(enrollmentYear !== undefined && { enrollmentYear: validEnrollmentYear }),
            },
        });

        return NextResponse.json({ message: 'Profil berhasil diperbarui', data: updatedUser }, { status: 200 });

    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
    }
}