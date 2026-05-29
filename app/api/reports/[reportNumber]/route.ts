import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma"; 

const formatReportNumber = (rawId: string) => {
    let cleanId = decodeURIComponent(rawId).toUpperCase();
    if (!cleanId.startsWith('#')) {
        cleanId = `#${cleanId}`;
    }
    return cleanId;
};

export async function GET(req: Request, context: { params: Promise<{ reportNumber: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
        }

        const params = await context.params;
        const searchNumber = formatReportNumber(params.reportNumber);

        const report = await prisma.report.findUnique({
            where: { 
                reportNumber: searchNumber 
            },
            include: {
                logs: {
                    orderBy: { createdAt: 'asc' } 
                }, 
                user: { select: { name: true } }, 
                admin: { select: { name: true } } 
            }
        });

        if (!report) {
            return NextResponse.json({ message: "Laporan tidak ditemukan" }, { status: 404 });
        }

        if (report.userId !== session.user.id) {
             return NextResponse.json({ message: "Anda tidak memiliki akses ke laporan ini" }, { status: 403 });
        }

        return NextResponse.json(report, { status: 200 });
    } catch (error) {
        console.error('[GET_REPORT_ERROR]', error);
        return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
    }
}