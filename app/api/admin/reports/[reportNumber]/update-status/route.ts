import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { Status } from '@/lib/generated/prisma/client';

interface Params {
    params: Promise<{
        reportNumber: string;
    }>;
}

export async function PATCH(
    request: NextRequest,
    { params }: Params
) {
    try {

        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { reportNumber } = await params;

        const decodedReportNumber =
            decodeURIComponent(reportNumber);

        const body = await request.json();

        const { status, note } = body;

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

        const updatedReport = await prisma.report.update({
            where: {
                reportNumber: decodedReportNumber,
            },

            data: {
                status,
                adminId: session.user.id,
            },
        });

        await prisma.auditLog.create({
            data: {
                reportId: updatedReport.id,
                status,
                note,
            },
        });

        return NextResponse.json(
            {
                message: 'Status report berhasil diperbarui',
                data: updatedReport,
            },
            {
                status: 200,
            }
        );

    } catch (error) {

        console.error('UPDATE REPORT STATUS ERROR:', error);

        return NextResponse.json(
            {
                message: 'Terjadi kesalahan server',
            },
            {
                status: 500,
            }
        );
    }
}