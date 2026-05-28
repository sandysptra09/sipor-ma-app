import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

import {
    Status,
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
    },

    VERIFIED: {
        auditTitle: 'Verifikasi Admin',
        auditDescription:
            'Laporan telah diverifikasi oleh admin dan siap diproses.',
        activityType: ActivityLog_type.REPORT_VERIFIED,
        activityTitle: 'Memverifikasi Laporan',
    },

    IN_PROGRESS: {
        auditTitle: 'Proses Perbaikan',
        auditDescription:
            'Tim teknisi sedang melakukan proses penanganan laporan.',
        activityType: ActivityLog_type.REPORT_UPDATED,
        activityTitle: 'Mengubah Status Laporan',
    },

    RESOLVED: {
        auditTitle: 'Selesai',
        auditDescription:
            'Laporan telah selesai ditangani dan dinyatakan selesai.',
        activityType: ActivityLog_type.REPORT_RESOLVED,
        activityTitle: 'Menyelesaikan Laporan',
    },

    REJECTED: {
        auditTitle: 'Laporan Ditolak',
        auditDescription:
            'Laporan ditolak oleh admin karena tidak memenuhi kriteria.',
        activityType: ActivityLog_type.REPORT_REJECTED,
        activityTitle: 'Menolak Laporan',
    },
} as const;

export async function PATCH(
    request: NextRequest,
    { params }: Params
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    message: 'Unauthorized',
                },
                {
                    status: 401,
                }
            );
        }

        const { reportNumber } = await params;

        const decodedReportNumber =
            decodeURIComponent(reportNumber);

        const body = await request.json();

        const {
            status,
            note,
        }: {
            status: Status;
            note?: string;
        } = body;

        const allowedStatus = Object.values(Status);

        if (!allowedStatus.includes(status)) {
            return NextResponse.json(
                {
                    message: 'Status tidak valid',
                },
                {
                    status: 400,
                }
            );
        }

        const config = STATUS_CONFIG[status];

        const updatedReport = await prisma.$transaction(
            async (tx) => {

                /**
                 * 1. Update Report
                 */
                const report = await tx.report.update({
                    where: {
                        reportNumber:
                            decodedReportNumber,
                    },
                    data: {
                        status,
                        adminId: session.user.id,
                    },
                });

                /**
                 * 2. Create Audit Trail
                 * Untuk timeline detail report
                 */
                await tx.auditLog.create({
                    data: {
                        reportId: report.id,

                        status,

                        note:
                            note ||
                            config.auditDescription,
                    },
                });

                /**
                 * 3. Create Activity Log
                 * Untuk card aktivitas terakhir admin
                 */
                await tx.activityLog.create({
                    data: {
                        id: crypto.randomUUID(),

                        userId: session.user.id,

                        reportId: report.id,

                        type: config.activityType,

                        title: `${config.activityTitle} ${report.reportNumber}`,

                        description:
                            note ||
                            config.auditDescription,

                        metadata: {
                            reportNumber:
                                report.reportNumber,

                            status,

                            roomCode:
                                report.roomCode,

                            location:
                                report.location,
                        },
                    },
                });

                return report;
            }
        );

        return NextResponse.json(
            {
                message:
                    'Status report berhasil diperbarui',

                data: updatedReport,
            },
            {
                status: 200,
            }
        );
    } catch (error) {

        console.error(
            'UPDATE REPORT STATUS ERROR:',
            error
        );

        return NextResponse.json(
            {
                message:
                    'Terjadi kesalahan server',
            },
            {
                status: 500,
            }
        );
    }
}