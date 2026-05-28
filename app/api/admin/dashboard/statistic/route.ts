import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {

    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [incoming, inProgress, completed] = await Promise.all([
        prisma.report.count(),
        prisma.report.count({ where: { status: "IN_PROGRESS" } }),
        prisma.report.count({ where: { status: "RESOLVED" } }),
    ]);

    return NextResponse.json({ incoming, inProgress, completed });
}