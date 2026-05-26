'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import ChatHeader from './header/chat-header';
import ChatMessageListWidget from './widgets/chat-message-list-widget';
import ChatInputArea from './inputs/chat-area-input';
import ChatSuggestionsWidget from './widgets/chat-suggestions-widget';

export default function ChatbotAiContent() {

    const [sessionId, setSessionId] = useState<string>('');

    const [input, setInput] = useState('');

    useEffect(() => {
        setSessionId(crypto.randomUUID());
    }, []);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
        }),
    });

    if (!sessionId) return null;

    const isLoading = status === 'submitted' || status === 'streaming';

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(
                { text: input },
                {
                    body: {
                        sessionId: sessionId
                    }
                }
            );
            setInput('');
        }
    };

    return (
        <div className='flex justify-center w-full h-full'>
            <div className='flex flex-col w-full max-w-6xl h-full bg-white shadow-sm border-x border-zinc-200 overflow-hidden relative'>

                <ChatHeader />

                <ChatMessageListWidget messages={messages} isLoading={isLoading} />

                <div className='flex flex-col bg-white border-t border-zinc-100 z-10'>
                    {messages.length === 0 && (
                        <ChatSuggestionsWidget />
                    )}

                    <ChatInputArea
                        input={input}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </div>

            </div>
        </div>
    );
}
