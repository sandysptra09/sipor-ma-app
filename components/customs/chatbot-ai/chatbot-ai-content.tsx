'use client';

import ChatHeader from './header/chat-header';
import ChatMessageListWidget from './widgets/chat-message-list-widget';
import ChatInputArea from './inputs/chat-area-input';
import ChatSuggestionsWidget from './widgets/chat-suggestions-widget';

export default function ChatbotAiContent() {
    return (
        <div className='flex justify-center w-full h-full'>
            <div className='flex flex-col w-full max-w-6xl h-full bg-white shadow-sm border-x border-zinc-200 overflow-hidden relative'>

                <ChatHeader />

                <ChatMessageListWidget />

                <div className='flex flex-col bg-white border-t border-zinc-100 z-10'>
                    <ChatSuggestionsWidget />
                    <ChatInputArea />
                </div>

            </div>
        </div>
    );
}
