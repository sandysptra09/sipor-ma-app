import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 30;

// ini masih setup awalan, nanti bakal diubah lagi isinya sesuai fungsionalitas kalo udah integrasi sama backend dan database
// nanti juga bakalan narik data session dari NextAuth, biar sistem tau user mana yang lagi nanya
export async function POST(req: Request) {

    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({

        model: google('gemini-2.5-flash'),

        system: 'Kamu adalah Sipor-Assistant, asisten AI ramah dari aplikasi SIPOR-MA. Tugasmu membantu mahasiswa melaporkan kerusakan fasilitas kampus dengan jawaban yang singkat, padat, dan jelas.',

        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}