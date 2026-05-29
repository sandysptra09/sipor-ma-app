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
        
        const whereCondition = isAdmin 
            ? { reportId: { not: null } } 
            : { userId: session.user.id, reportId: { not: null } };

        const recentActivities = await prisma.activityLog.findMany({
            where: whereCondition,
            distinct: ['reportId'],  
            take: 3, 
            orderBy: {
                createdAt: 'desc',  
            },
            select: {
                id: true,
                type: true,
                createdAt: true,
                Report: {
                    select: {
                        reportNumber:true,
                        title: true,
                        roomCode: true,
                        description: true,       
                        rejectionReason: true,   
                        resolvedNote: true,      
                        user: {
                            select: {
                                name: true, 
                            },
                        },
                    },
                },
            },
        });

        const formattedData = recentActivities.map(log => {
            let displayDescription = '';

            if (log.type === 'REPORT_REJECTED') {
                displayDescription = log.Report?.rejectionReason || 'Tidak ada alasan penolakan disertakan.';
            } 
            else if (log.type === 'REPORT_RESOLVED') {
                displayDescription = log.Report?.resolvedNote || 'Laporan telah diselesaikan.';
            } 
            else {
                displayDescription = log.Report?.description || 'Tidak ada deskripsi.';
            }

            return {
                id: log.id,
                reportNumber:log.Report?.reportNumber,
                type: log.type,
                createdAt: log.createdAt,
                description: displayDescription,
                reportTitle: log.Report?.title,
                room: log.Report?.roomCode,
                reporterName: log.Report?.user?.name || 'Tidak diketahui',
            };
        });

        return NextResponse.json(
            { 
                message: 'Berhasil mengambil aktivitas terbaru', 
                data: formattedData 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching recent activities:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan internal pada server' },
            { status: 500 }
        );
    }
}