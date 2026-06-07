import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

interface Params {
    params: Promise<{
        reportNumber: string;
    }>;
}

export async function GET(
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

        const decodedReportNumber = decodeURIComponent(reportNumber);

        const report = await prisma.report.findUnique({
            where: {
                reportNumber: decodedReportNumber,
            },

            include: {
                user: {
                    select: {
                        name: true,
                        nim_nip: true,
                        role:true,
                        image:true
                    },
                },

                admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },

                logs: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },

                notifications: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        if (!report) {
            return NextResponse.json(
                {
                    message: 'Report tidak ditemukan',
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                message: 'Berhasil mengambil detail laporan',
                data: report,
            },
            {
                status: 200,
            }
        );

    } catch (error) {

        console.error('GET REPORT DETAIL ERROR:', error);

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