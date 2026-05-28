import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try{
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    
        const categoryGroups = await prisma.report.groupBy({
            by: ["category"],
            _count: { category: true },
            orderBy: { _count: { category: "desc" } },
        });
    
        const maxCount = await prisma.report.count();
        const categories = categoryGroups.map((item) => ({
            name: item.category,
            count: item._count.category,
            value: Math.round((item._count.category / maxCount) * 100),
        }));
    
        return NextResponse.json({ categories });
    }catch (error) {
        console.error("Dashboard statistic error:", error);

        return NextResponse.json({error: "Internal Server Error",},{ status: 500 });
    }
}