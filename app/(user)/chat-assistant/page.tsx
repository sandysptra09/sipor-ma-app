import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { UIMessage } from '@ai-sdk/react';
import ChatbotAiContent from '@/components/customs/chatbot-ai/chatbot-ai-content'

export default async function ChatAssistantPage() {

    const session = await auth();

    let initialSessionId = '';
    let initialMessages: UIMessage[] = [];

    if (session?.user?.id) {
        const lastSession = await prisma.chatSession.findFirst({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' }
                }
            }
        });

        if (lastSession) {
            initialSessionId = lastSession.id;

            initialMessages = lastSession.messages.map((msg) => ({
                id: msg.id,
                role: msg.role === 'USER' ? 'user' : 'assistant',
                content: msg.content,
                parts: [{ type: 'text', text: msg.content }]
            })) as UIMessage[];
        } else {
            initialSessionId = crypto.randomUUID();
        }
    }

    return (
        <div className='h-[calc(100vh-80px)] w-full bg-[#f8fafc] overflow-hidden'>
            <ChatbotAiContent
                initialSessionId={initialSessionId}
                initialMessages={initialMessages}
            />
        </div>
    )
}
