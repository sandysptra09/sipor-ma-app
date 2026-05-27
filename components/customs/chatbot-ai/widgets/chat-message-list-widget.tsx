'use client';

import { useEffect, useRef } from 'react';
import { Bot, MoreHorizontal, Database } from 'lucide-react';
import { UIMessage } from '@ai-sdk/react';
import { format, isSameDay, isToday, isYesterday } from 'date-fns';
import { id } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';

interface ChatMessageListProps {
    messages: UIMessage[];
    isLoading: boolean;
}

export default function ChatMessageListWidget({ messages, isLoading }: ChatMessageListProps) {

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const isUserScrolling = useRef(false);

    const scrollToBottom = () => {
        if (!chatContainerRef.current) return;

        if (isUserScrolling.current) return;

        const container = chatContainerRef.current;
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        const observer = new MutationObserver(() => {
            scrollToBottom();
        });

        observer.observe(container, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
            isUserScrolling.current = !isAtBottom;
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setTimeout(scrollToBottom, 100);
    }, [messages.length]);

    const getDateSeparatorText = (date: Date) => {
        if (isToday(date)) return 'Hari ini';
        if (isYesterday(date)) return 'Kemarin';
        return format(date, 'd MMMM yyyy', { locale: id });
    };

    return (
        <div
            ref={chatContainerRef}
            className='flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-zinc-50/50 data-lenis-prevent'
        >

            {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                let rawDate = (msg as any).createdAt;
                if (!rawDate) {
                    rawDate = new Date();
                }
                const currentDate = new Date(rawDate);
                const timeString = format(currentDate, 'HH:mm');

                let showDateSeparator = false;

                if (index === 0) {
                    showDateSeparator = true;
                } else {
                    let prevRawDate = (messages[index - 1] as any).createdAt;
                    if (!prevRawDate) prevRawDate = new Date();
                    const prevDate = new Date(prevRawDate);

                    if (!isSameDay(currentDate, prevDate)) {
                        showDateSeparator = true;
                    }
                }

                const hasText = msg.parts?.some(part => part.type === 'text' && part.text.trim() !== '');
                const hasToolInvocation = msg.parts?.some(part => part.type === 'tool-invocation');

                const isThinkingBeforeTool = !isUser && !hasText && !hasToolInvocation;

                return (
                    <div key={msg.id} className='flex flex-col gap-6 w-full'>

                        {showDateSeparator && (
                            <div className='flex justify-center'>
                                <span className='bg-zinc-100 text-zinc-500 text-xs font-medium px-3 py-1 rounded-full'>
                                    {getDateSeparatorText(currentDate)}
                                </span>
                            </div>
                        )}

                        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                                {!isUser && (
                                    <div className='shrink-0 w-8 h-8 rounded-full bg-[#0A6F66] text-white flex items-center justify-center mt-auto shadow-sm'>
                                        <Bot size={18} />
                                    </div>
                                )}

                                <div className='flex flex-col gap-1 w-full'>
                                    <div
                                        className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${isUser
                                            ? 'bg-[#0A6F66] text-white rounded-2xl rounded-br-sm shadow-sm'
                                            : 'bg-white border border-zinc-200 text-zinc-800 rounded-2xl rounded-bl-sm shadow-sm'
                                            }`}
                                    >
                                        {isThinkingBeforeTool ? (
                                            <div className='flex items-center text-zinc-500'>
                                                <MoreHorizontal size={20} className='animate-bounce' />
                                            </div>
                                        ) : (
                                            msg.parts.map((part, partIndex) => {
                                                if (part.type === 'text' && part.text) {
                                                    if (isUser) {
                                                        return <span key={partIndex}>{part.text}</span>;
                                                    } else {
                                                        return (
                                                            <ReactMarkdown
                                                                key={partIndex}
                                                                components={{
                                                                    p: ({ node, ...props }) => <p className='mb-2 last:mb-0' {...props} />,
                                                                    ul: ({ node, ...props }) => <ul className='list-disc ml-4 mb-2 flex flex-col gap-1' {...props} />,
                                                                    ol: ({ node, ...props }) => <ol className='list-decimal ml-4 mb-2 flex flex-col gap-1' {...props} />,
                                                                    li: ({ node, ...props }) => <li className='' {...props} />,
                                                                    strong: ({ node, ...props }) => <strong className='font-semibold' {...props} />
                                                                }}
                                                            >
                                                                {part.text}
                                                            </ReactMarkdown>
                                                        );
                                                    }
                                                } else if (part.type === 'tool-invocation') {
                                                    return (
                                                        <div key={partIndex} className='flex items-center gap-2 text-[11px] text-[#0A6F66] bg-teal-50/50 border border-teal-100 px-3 py-2 rounded-lg my-1 w-fit'>
                                                            <Database size={14} className='animate-pulse' />
                                                            <span className='font-medium animate-pulse'>Mengecek sistem SIPOR-MA...</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })
                                        )}
                                    </div>

                                    <span className={`text-[11px] text-zinc-400 font-medium ${isUser ? 'text-right' : 'text-left'}`}>
                                        {timeString}
                                    </span>
                                </div>

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