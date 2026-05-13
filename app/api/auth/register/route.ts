import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, nim_nip, password } = body;

        if (!email && !nim_nip) {
            return NextResponse.json(
                { message: 'Email atau NIM wajib diisi' }, 
                { status: 400 }
            );
        }
        if (!password || password.length < 8) {
            return NextResponse.json(
                { message: 'Password minimal 8 karakter' }, 
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email || undefined },
                    { nim_nip: nim_nip || undefined }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'Email atau NIM sudah terdaftar' }, 
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                nim_nip,
                password: hashedPassword,
                role: 'STUDENT', 
            }
        });

        return NextResponse.json({
            message: 'Registrasi berhasil',
            user: {
                id: newUser.id,
                name: newUser.name,
                role: newUser.role
            }
        }, { status: 201 });

    } catch (error) {
        console.error('[REGISTER_ERROR]', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan pada server' }, 
            { status: 500 }
        );
    }
}