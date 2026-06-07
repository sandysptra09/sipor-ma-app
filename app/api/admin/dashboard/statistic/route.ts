import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const [
        totalThisMonth,
        totalLastMonth,
        inProgressTotal,
        inProgressHighPriority,
        resolvedThisMonth,
        resolvedLastMonth,
        pendingTotal
    ] = await Promise.all([
        prisma.report.count({ where: { createdAt: { gte: startOfThisMonth } } }),
        prisma.report.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
        
        prisma.report.count({ where: { status: "IN_PROGRESS" } }),
        prisma.report.count({ where: { status: "IN_PROGRESS", priority: "HIGH" } }),
        
        prisma.report.count({ where: { status: "RESOLVED", updatedAt: { gte: startOfThisMonth } } }),
        prisma.report.count({ where: { status: "RESOLVED", updatedAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
        
        prisma.report.count({ where: { status: "PENDING" } })
    ]);

    const calculateTrend = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return Math.round(((current - previous) / previous) * 100);
    };

    const incomingTrend = calculateTrend(totalThisMonth, totalLastMonth);
    const resolvedTrend = calculateTrend(resolvedThisMonth, resolvedLastMonth);

    return NextResponse.json({ 
        incoming: {
            count: totalThisMonth,
            trend: incomingTrend,
            pending: pendingTotal
        },
        inProgress: {
            count: inProgressTotal,
            highPriority: inProgressHighPriority
        },
        completed: {
            count: resolvedThisMonth,
            trend: resolvedTrend
        }
    });
}