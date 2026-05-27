import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { streamText, convertToModelMessages, tool, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import prisma from '@/lib/prisma';
import { z } from 'zod';

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

        const { messages, sessionId } = await req.json();

        if (!messages || messages.length === 0) {
            return NextResponse.json(
                { message: 'Pesan tidak boleh kosong.' },
                { status: 400 }
            );
        }

        if (!sessionId) {
            return NextResponse.json(
                { message: 'Session ID tidak ditemukan.' },
                { status: 400 }
            );
        }

        const lastUserMessage = messages[messages.length - 1];

        let extractedContent = lastUserMessage.content;

        if (!extractedContent && lastUserMessage.parts && lastUserMessage.parts.length > 0) {
            extractedContent = lastUserMessage.parts
                .filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join(' ');
        }

        if (!extractedContent || extractedContent.trim() === '') {
            return NextResponse.json(
                { message: 'Teks pesan tidak valid atau kosong.' },
                { status: 400 }
            );
        }

        let chatSession = await prisma.chatSession.findUnique({
            where: { id: sessionId }
        });

        if (!chatSession) {
            chatSession = await prisma.chatSession.create({
                data: {
                    id: sessionId,
                    userId: session.user.id,
                }
            });
        }

        await prisma.message.create({
            data: {
                sessionId: chatSession.id,
                role: 'USER',
                content: extractedContent,
            }
        });

        const result = streamText({
            model: google('gemini-3.1-flash-lite'),
            system: 'Kamu adalah SIPOR-Assistant, asisten AI ramah dan cerdas dari aplikasi SIPOR-MA. Tugasmu membantu mahasiswa melaporkan kerusakan fasilitas kampus atau memberikan informasi seputar SOP perbaikan fasilitas dengan jawaban yang singkat, padat, ramah, dan jelas. JIKA user ingin melaporkan kerusakan BARU, GUNAKAN tool checkDuplicateFacility terlebih dahulu untuk memastikan tidak ada yang melaporkan hal serupa. JIKA user menanyakan status atau mencari laporan yang sudah mereka buat sebelumnya, GUNAKAN tool checkReportStatus. PENTING: SETELAH KAMU MENGGUNAKAN TOOL DAN MENDAPATKAN DATA, KAMU WAJIB MEMBALAS DENGAN TEKS PENJELASAN KEPADA USER BERDASARKAN DATA TERSEBUT. Jangan cuma diam! Jangan menjawab hal di luar fasilitas kampus.',

            messages: await convertToModelMessages(messages),

            stopWhen: stepCountIs(5),
            
            tools: {
                checkReportStatus: tool({
                    description: 'Mencari dan mengecek status laporan kerusakan fasilitas milik pengguna berdasarkan kode laporan, lokasi, atau kata kunci kerusakan. Gunakan ini saat user menanyakan kabar laporan mereka.',
                    inputSchema: z.object({
                        kodeLaporan: z.string().optional().describe('Kode laporan spesifik jika disebutkan user (contoh: SPM-2026-001)'),
                        lokasi: z.string().optional().describe('Lokasi gedung, lantai, atau ruangan (contoh: gedung baru, lantai 2, lab komputer)'),
                        keyword: z.string().optional().describe('Kata kunci masalah atau fasilitas (contoh: AC bocor, proyektor mati, kursi rusak/patah.)'),
                    }),

                    execute: async ({ kodeLaporan, lokasi, keyword }) => {
                        console.log('AI MENGGUNAKAN TOOL PENCARIAN:', { kodeLaporan, lokasi, keyword });

                        try {
                            const whereClause: any = {
                                userId: session.user.id,
                            };

                            if (kodeLaporan) whereClause.reportNumber = { contains: kodeLaporan };
                            if (lokasi) whereClause.location = { contains: lokasi };
                            if (keyword) {
                                whereClause.OR = [
                                    { title: { contains: keyword } },
                                    { description: { contains: keyword } },
                                    { category: { contains: keyword } },
                                ];
                            }

                            const laporan = await prisma.report.findMany({
                                where: whereClause,
                                orderBy: { createdAt: 'desc' },
                                take: 3,
                                select: {
                                    reportNumber: true,
                                    title: true,
                                    location: true,
                                    status: true,
                                    createdAt: true
                                }
                            });

                            if (laporan.length === 0) {
                                return { result: 'Tidak ada laporan yang ditemukan dengan kriteria tersebut.' };
                            }
                            return { result: 'Data ditemukan', data: laporan };

                        } catch (error) {
                            console.error('Error Tool checkReportStatus:', error);
                            return { result: 'Terjadi kesalahan sistem saat mengambil data dari database.' };
                        }
                    }
                }),

                checkDuplicateFacility: tool({
                    description: 'Mengecek apakah fasilitas yang ingin dilaporkan user SUDAH PERNAH dilaporkan oleh orang lain dan masih dalam proses perbaikan. Wajib digunakan sebelum merespon user yang berniat membuat laporan baru.',
                    inputSchema: z.object({
                        lokasi: z.string().optional().describe('Lokasi gedung, lantai, atau ruangan yang disebut user (contoh: gedung E lantai 2)'),
                        keyword: z.string().describe('Fasilitas utama yang rusak (contoh: AC, proyektor, kursi, meja, keran)'),
                    }),

                    execute: async ({ lokasi, keyword }) => {
                        console.log('AI MENGECEK DUPLIKASI LAPORAN:', { lokasi, keyword });

                        try {
                            const conditions: any[] = [
                                {
                                    OR: [
                                        { title: { contains: keyword } },
                                        { description: { contains: keyword } },
                                        { category: { contains: keyword } },
                                    ]
                                }
                            ];

                            if (lokasi) {
                                conditions.push({ location: { contains: lokasi } });
                            }

                            const duplicates = await prisma.report.findMany({
                                where: {
                                    status: {
                                        in: ['PENDING', 'VERIFIED', 'IN_PROGRESS']
                                    },
                                    AND: conditions
                                },
                                orderBy: { createdAt: 'desc' },
                                take: 1, 
                                select: {
                                    reportNumber: true,
                                    status: true,
                                    location: true,
                                    title: true,
                                    createdAt: true
                                }
                            });

                            if (duplicates.length > 0) {
                                return { 
                                    result: 'Peringatan: Ditemukan laporan serupa yang sedang diproses. Beritahu user untuk tidak perlu melapor lagi.', 
                                    data: duplicates[0] 
                                };
                            }
                            
                            return { result: 'Aman, tidak ada laporan duplikat. Persilakan user untuk melapor via form.' };

                        } catch (error) {
                            console.error('Error Tool checkDuplicateFacility:', error);
                            return { result: 'Terjadi kesalahan sistem saat mengecek duplikasi laporan.' };
                        }
                    }
                })

            },

            onFinish: async ({ text }) => {
                if (text && text.trim() !== '') {
                    try {
                        await prisma.message.create({
                            data: {
                                sessionId: chatSession!.id,
                                role: 'ASSISTANT',
                                content: text,
                            }
                        });
                    } catch (dbError) {
                        console.error('Gagal mencatat pesan AI ke database:', dbError);
                    }
                }
            },
        });

        return result.toUIMessageStreamResponse();

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan sistem pada chatbot.' },
            { status: 500 }
        );
    }
}