'use client';

import { Bot, MoreHorizontal } from 'lucide-react';
import { UIMessage } from '@ai-sdk/react';
import { format } from 'date-fns';

interface ChatMessageListProps {
    messages: UIMessage[];
    isLoading: boolean;
}

export default function ChatMessageListWidget({ messages, isLoading }: ChatMessageListProps) {
    return (
        <div className='flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-zinc-50/50 data-lenis-prevent'>

            <div className='flex justify-center'>
                <span className='bg-zinc-100 text-zinc-500 text-xs font-medium px-3 py-1 rounded-full'>
                    Hari ini
                </span>
            </div>

            {messages.map((msg) => {
                const isUser = msg.role === 'user';

                const createdAt = (msg as any).createdAt;
                const timeString = createdAt ? format(new Date(createdAt), 'HH:mm') : '';

                return (
                    <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                            {!isUser && (
                                <div className='shrink-0 w-8 h-8 rounded-full bg-[#0A6F66] text-white flex items-center justify-center mt-auto shadow-sm'>
                                    <Bot size={18} />
                                </div>
                            )}

                            <div className='flex flex-col gap-1'>
                                <div
                                    className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${isUser
                                        ? 'bg-[#0A6F66] text-white rounded-2xl rounded-br-sm shadow-sm'
                                        : 'bg-white border border-zinc-200 text-zinc-800 rounded-2xl rounded-bl-sm shadow-sm'
                                        }`}
                                >
                                    {msg.parts.map((part, index) => {
                                        if (part.type === 'text') {
                                            return <span key={index}>{part.text}</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <span className={`text-[11px] text-zinc-400 font-medium ${isUser ? 'text-right' : 'text-left'}`}>
                                    {timeString}
                                </span>
                            </div>

                        </div>
                    </div>
                );
            })}

            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                <div className='flex w-full justify-start animate-pulse'>
                    <div className='flex gap-3 max-w-[85%] sm:max-w-[75%] flex-row'>
                        <div className='shrink-0 w-8 h-8 rounded-full bg-[#0A6F66] text-white flex items-center justify-center mt-auto shadow-sm'>
                            <Bot size={18} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='px-4 py-3 bg-white border border-zinc-200 text-zinc-500 rounded-2xl rounded-bl-sm shadow-sm flex items-center'>
                                <MoreHorizontal size={20} className='animate-bounce' />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}