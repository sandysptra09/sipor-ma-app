import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { streamText, convertToModelMessages } from 'ai'; 
import { google } from '@ai-sdk/google';
import prisma from '@/lib/prisma';

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
                content: lastUserMessage.content,
            }
        });

        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: 'Kamu adalah SIPOR-Assistant, asisten AI ramah dan cerdas dari aplikasi SIPOR-MA. Tugasmu membantu mahasiswa melaporkan kerusakan fasilitas kampus atau memberikan informasi seputar SOP perbaikan fasilitas dengan jawaban yang singkat, padat, ramah, dan jelas. Jangan menjawab jika ditanya hal di luar fasilitas kampus.',
            
            messages: await convertToModelMessages(messages), 
            
            onFinish: async ({ text }) => {
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
            },
        });

        return result.toTextStreamResponse();

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan sistem pada chatbot.' },
            { status: 500 }
        );
    }
}