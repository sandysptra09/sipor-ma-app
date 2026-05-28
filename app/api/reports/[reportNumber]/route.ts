import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

// memastikan format reportNumber
const formatReportNumber = (rawId: string) => {
    let cleanId = decodeURIComponent(rawId).toUpperCase();
    if (!cleanId.startsWith('#')) {
        cleanId = `#${cleanId}`;
    }
    return cleanId;
};

// API GET 
export async function GET(req: Request, context: { params: Promise<{ reportNumber: string }> }) {
    try {
        const params = await context.params;

        const searchNumber = formatReportNumber(params.reportNumber);

        const report = await prisma.report.findUnique({
            where: { 
                reportNumber: searchNumber 
            },
            include: {
                logs: true, 
                user: true, 
                admin: true 
            }
        });

        if (!report) {
            return NextResponse.json({ message: "Laporan tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(report, { status: 200 });
    } catch (error) {
        console.error('[GET_REPORT_ERROR]', error);
        return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
    }
}

// DELETE API
export async function DELETE(req: Request, context: { params: Promise<{ reportNumber: string }> }) {
    try {
        const params = await context.params;
        const searchNumber = formatReportNumber(params.reportNumber);

        // Menghapus data berdasarkan reportNumber
        await prisma.report.delete({
            where: { reportNumber: searchNumber }
        });

        return NextResponse.json({ message: "Laporan berhasil dibatalkan dan dihapus" }, { status: 200 });
    } catch (error) {
        console.error('[DELETE_REPORT_ERROR]', error);
        return NextResponse.json({ message: "Gagal menghapus laporan" }, { status: 500 });
    }
}