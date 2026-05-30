import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { sendNotification } from '@/lib/notification'; 

import {
    Report_status,
    ActivityLog_type,
} from '@/lib/generated/prisma/client';

interface Params {
    params: Promise<{
        reportNumber: string;
    }>;
}

const STATUS_CONFIG = {
    PENDING: {
        auditTitle: 'Laporan Terkirim',
        auditDescription:
            'Laporan berhasil dikirim dan sedang menunggu verifikasi admin.',
        activityType: ActivityLog_type.REPORT_CREATED,
        activityTitle: 'Membuat Laporan',
        notificationTitle: 'Laporan Diterima',
    },

    VERIFIED: {
        auditTitle: 'Verifikasi Admin',
        auditDescription:
            'Laporan telah diverifikasi oleh admin dan siap diproses.',
        activityType: ActivityLog_type.REPORT_VERIFIED,
        activityTitle: 'Memverifikasi Laporan',
        notificationTitle: 'Laporan Diverifikasi',
    },

    IN_PROGRESS: {
        auditTitle: 'Proses Perbaikan',
        auditDescription:
            'Tim teknisi sedang melakukan proses penanganan laporan.',
        activityType: ActivityLog_type.REPORT_IN_PROGRESS,
        activityTitle: 'Mengubah Status Laporan',
        notificationTitle: 'Laporan Diproses',
    },

    RESOLVED: {
        auditTitle: 'Selesai',
        auditDescription:
            'Laporan telah selesai ditangani dan dinyatakan selesai.',
        activityType: ActivityLog_type.REPORT_RESOLVED,
        activityTitle: 'Menyelesaikan Laporan',
        notificationTitle: 'Laporan Selesai',
    },

    REJECTED: {
        auditTitle: 'Laporan Ditolak',
        auditDescription:
            'Laporan ditolak oleh admin karena tidak memenuhi kriteria.',
        activityType: ActivityLog_type.REPORT_REJECTED,
        activityTitle: 'Menolak Laporan',
        notificationTitle: 'Laporan Ditolak',
    },

    CANCELED: {
        auditTitle: 'Laporan Dibatalkan',
        auditDescription:
            'Laporan dibatalkan oleh admin karena tidak memenuhi kriteria.',
        activityType: ActivityLog_type.REPORT_CANCELED,
        activityTitle: 'Membatalkan Laporan',
        notificationTitle: 'Laporan Dibatalkan',
    },
} as const;

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { reportNumber } = await params;
        const decodedReportNumber = decodeURIComponent(reportNumber);

        const body = await request.json();

        const { status, note, imageUrl }: { status: Report_status; note?: string; imageUrl?: string } = body;

        const allowedStatus = Object.values(Report_status);

        if (!allowedStatus.includes(status)) {
            return NextResponse.json({ message: 'Status tidak valid' }, { status: 400 });
        }

        if (status === 'REJECTED' && !note) {
            return NextResponse.json(
                { message: 'Alasan penolakan wajib diisi' },
                { status: 400 }
            );
        }

        if (status === 'RESOLVED' && !note) {
            return NextResponse.json(
                { message: 'Pesan penyelesaian wajib diisi' },
                { status: 400 }
            );
        }

        const config = STATUS_CONFIG[status];

        const updatedReport = await prisma.$transaction(async (tx) => {
            
            const updateData: any = {
                status,
                adminId: session.user.id,
            };

            if (status === 'REJECTED') {
                updateData.rejectionReason = note;
            }
            
            if (status === 'RESOLVED') {
                updateData.resolvedNote = note;
            }

            if (imageUrl) {
                updateData.imageAfter = imageUrl; 
            }

            const report = await tx.report.update({
                where: {
                    reportNumber: decodedReportNumber,
                },
                data: updateData,
            });

            await tx.auditLog.create({
                data: {
                    reportId: report.id,
                    status,
                    note: note || config.auditDescription,
                },
            });

            await tx.activityLog.create({
                data: {
                    id: crypto.randomUUID(),
                    userId: session.user.id,
                    reportId: report.id,
                    type: config.activityType,
                    title: `${config.activityTitle} ${report.reportNumber}`,
                    description: note || config.auditDescription,
                    metadata: {
                        reportNumber: report.reportNumber,
                        status,
                        roomCode: report.roomCode,
                        location: report.location,
                    },
                },
            });

            return report;
        });

        try {
            await sendNotification({
                userId: updatedReport.userId, 
                title: `📢 ${config.notificationTitle}`,
                message: `Laporan kamu (${updatedReport.reportNumber}) saat ini berstatus: ${config.auditTitle}. ${note ? `Catatan: ${note}` : ''}`,
                reportId: updatedReport.id
            });
        } catch (pushError) {
            console.error('Gagal mengirim notifikasi Pusher ke user:', pushError);
        }

        return NextResponse.json(
            { message: 'Status report berhasil diperbarui', data: updatedReport },
            { status: 200 }
        );
    } catch (error) {
        console.error('UPDATE REPORT STATUS ERROR:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}