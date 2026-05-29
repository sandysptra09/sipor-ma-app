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

        const isAdmin = session.user.role === 'ADMIN'; 
        if (!isAdmin) {
            return NextResponse.json(
                { message: 'Forbidden. Akses ditolak.' },
                { status: 403 }
            );
        }

        const adminId = session.user.id;

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        
        const skip = (page - 1) * limit;

        const whereCondition = { userId: adminId };

        const totalRecords = await prisma.notification.count({
            where: whereCondition,
        });

        const recentNotifications = await prisma.notification.findMany({
            where: whereCondition,
            skip: skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',  
            },
            include: {
                report: {
                    select: {
                        reportNumber: true,
                        title: true,
                        roomCode: true,
                        status: true,
                        user: {
                            select: {
                                name: true, 
                            },
                        },
                    },
                },
            },
        });

        const formattedData = recentNotifications.map(notif => {

            return {
                id: notif.id,
                reportNumber: notif.report?.reportNumber, 
                type: notif.report?.status,
                datetime: notif.createdAt,
                description: notif.message, 
                title: notif.title,         
                location: notif.report?.roomCode || 'Tidak diketahui',
                user: notif.report?.user?.name || 'Tidak diketahui',
                isRead: notif.isRead 
            };
        });

        return NextResponse.json(
            { 
                message: 'Berhasil mengambil notifikasi terbaru', 
                data: formattedData,
                meta: {
                    totalRecords,
                    totalPages: Math.ceil(totalRecords / limit),
                    currentPage: page,
                    rowsPerPage: limit
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching admin notifications:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan internal pada server' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized. Silakan login terlebih dahulu.' },
                { status: 401 }
            );
        }

        const adminId = session.user.id;

        const body = await request.json();
        const { id, isRead } = body;

        if (!id) {
            return NextResponse.json(
                { message: 'ID Notifikasi (id) wajib disertakan dalam request body.' },
                { status: 400 }
            );
        }

        const existingNotification = await prisma.notification.findUnique({
            where: { id: id }
        });

        if (!existingNotification) {
            return NextResponse.json(
                { message: 'Notifikasi tidak ditemukan.' },
                { status: 404 }
            );
        }

        if (existingNotification.userId !== adminId) {
            return NextResponse.json(
                { message: 'Forbidden. Anda tidak memiliki akses ke notifikasi ini.' },
                { status: 403 }
            );
        }

        const updatedStatus = typeof isRead === 'boolean' ? isRead : true;

        const updatedNotification = await prisma.notification.update({
            where: { id: id },
            data: { isRead: updatedStatus }
        });

        return NextResponse.json(
            { 
                message: 'Status notifikasi berhasil diperbarui', 
                data: updatedNotification 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating notification status:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan internal pada server saat memperbarui notifikasi.' },
            { status: 500 }
        );
    }
}