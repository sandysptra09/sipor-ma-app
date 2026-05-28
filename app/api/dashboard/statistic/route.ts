import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function GET(req: NextRequest) {

    try{
        const userId = req.nextUrl.searchParams.get("userId");
    
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }
    
        const [total, proses, selesai] = await Promise.all([
            prisma.report.count({ where: { userId } }),
            prisma.report.count({ where: { userId, status: "IN_PROGRESS" } }),
            prisma.report.count({ where: { userId, status: "RESOLVED" } }),
        ]);
    
        const chipText = `${total} laporan masuk`;
    
        return NextResponse.json({ total, chipText, proses, selesai });
    }catch (error) {
        console.error("Dashboard statistic error:", error);
    
        return NextResponse.json({error: "Internal Server Error",},{ status: 500 });
    }
    


    

}