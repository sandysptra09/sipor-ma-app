import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { generateText, Output } from 'ai'; 
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { generateReportNumber } from '@/lib/generate-report-number';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized. Silakan login terlebih dahulu.' },
                { status: 401 }
            );
        }

        const { roomCode, description, imageUrl } = await req.json();

        if (!roomCode || !description || !imageUrl) {
            return NextResponse.json(
                { message: 'Data tidak lengkap! Pastikan foto dan deskripsi terisi.' },
                { status: 400 }
            );
        }

        const roomData = await prisma.room.findUnique({
            where: { code: roomCode }
        });

       if (!roomData) {
            return NextResponse.json(
                { message: 'Kode ruangan tidak valid atau tidak terdaftar.' },
                { status: 400 }
            );
        }

        const fullLocation = `${roomData.building} - ${roomData.name} - ${roomData.code}`;

        const { output: aiResult } = await generateText({
            model: google('gemini-3.1-flash-lite'),
            system: 'Kamu adalah sistem analisis untuk aplikasi pelaporan fasilitas kampus SIPOR-MA. Analisis laporan kerusakan yang diberikan. Jika laporan tidak pantas (NSFW), prank, atau bukan fasilitas kampus, set isSafe ke false.',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: `Deskripsi kerusakan dari mahasiswa: ${description}` },
                        { type: 'image', image: imageUrl },
                    ],
                },
            ],

            output: Output.object({
                schema: z.object({
                    isSafe: z.boolean().describe('True jika laporan valid. False jika mengandung unsur prank, NSFW, atau bukan fasilitas.'),
                    category: z.string().describe('Kategori fasilitas. Contoh: AC, Kelistrikan, Furnitur & Interior, Sanitasi & Air, Infrastruktur Jalan.'),
                    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe('Tingkat urgensi. HIGH untuk hal krusial seperti listrik mati/server down.'),
                    titleSuggestion: z.string().describe("Saran judul singkat max 5 kata untuk database, misal: 'Proyektor Lab RPL 1 Mati'"),
                    reasoning: z.string().describe("Alasan singkat kenapa AI memilih kategori dan prioritas tersebut.")
                })
            }),
        });

        if (!aiResult.isSafe) {
            return NextResponse.json(
                { message: 'Laporan ditolak! Sistem AI kami mendeteksi gambar tidak valid, prank, atau tidak pantas.' },
                { status: 400 }
            );
        }

        const newReportNumber = await generateReportNumber();

        const newReport = await prisma.report.create({
            data: {
                reportNumber: newReportNumber,
                title: aiResult.titleSuggestion,
                description: description,
                location: fullLocation,     
                category: aiResult.category,
                priority: aiResult.priority,
                imageBefore: imageUrl,
                roomCode: roomCode,
                userId: session.user.id,
                status: 'PENDING',
                isVerified: true,
            }
        });

        // await pusherServer.trigger('admin-channel', 'new-report', {
        //     message: `Laporan baru: ${aiResult.titleSuggestion} di ruangan ${roomCode}`,
        // });

        return NextResponse.json({
            message: 'Laporan berhasil dianalisa dan dikirim!',
            data: newReport
        }, { status: 200 });

    } catch (error) {
        console.error('AI Analysis Error:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan sistem saat memproses laporan.' },
            { status: 500 }
        );
    }
}