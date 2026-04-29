import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET() {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json({
            status: 'success',
            message: 'GELOO EDANN! Koneksi database Aiven dan prisma sukses nyambung coyy',
            data: users
        }, { status: 200 });

    } catch (error) {
      
        console.error('Database connection error:', error);

        return NextResponse.json({
            status: 'error',
            message: 'Aduh koneksi database Aiven dan prisma ga nyambung coyy',
            error: String(error)
        }, { status: 500 });
    }
}