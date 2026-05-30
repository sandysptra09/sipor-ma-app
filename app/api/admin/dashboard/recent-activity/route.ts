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

        const whereCondition = { userId: session.user.id, reportId: { not: null } };

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
                report: {
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
                displayDescription =
                    log.report?.rejectionReason ||
                    'Tidak ada alasan penolakan disertakan.';
            } else if (log.type === 'REPORT_RESOLVED') {
                displayDescription =
                    log.report?.resolvedNote ||
                    'Laporan telah diselesaikan.';
            } else {
                displayDescription =
                    log.report?.description ||
                    'Tidak ada deskripsi.';
            }
        
            return {
                id: log.id,
                reportNumber: log.report?.reportNumber,
                type: log.type.replace('REPORT_', ''),
                createdAt: log.createdAt,
                description: displayDescription,
                reportTitle: log.report?.title,
                room: log.report?.roomCode,
                reporterName: log.report?.user?.name || 'Tidak diketahui',
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