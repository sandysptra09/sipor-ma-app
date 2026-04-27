import { generateText, Output } from 'ai'; 
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export const maxDuration = 30;

// ini masih setup awalan, nanti bakal diubah lagi isinya sesuai fungsionalitas kalo udah integrasi sama backend dan database
export async function POST(req: Request) {
    try {
        const { description, imageUrl } = await req.json();

        const { output } = await generateText({

            model: google('gemini-2.5-flash'),
            
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
                    titleSuggestion: z.string().describe("Saran judul singkat max 5 kata untuk database, misal: 'Proyektor Lab RPL 1 Mati'")
                })
            }),
        });

        return Response.json(output);

    } catch (error) {
        console.error('AI Analysis Error:', error);
        return Response.json({ error: 'Gagal menganalisis laporan' }, { status: 500 });
    }
}