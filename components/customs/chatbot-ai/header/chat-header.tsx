'use client';

import { Bot } from 'lucide-react';

export default function ChatHeader() {
    return (
        <div className='flex items-center gap-4 px-6 py-4 border-b border-zinc-100 bg-white'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#E7F4F3] text-[#0A6F66]'>
                <Bot size={24} />
            </div>
            <div className='flex flex-col'>
                <h2 className='text-base font-bold text-zinc-800 leading-none'>SIPOR Assistant</h2>
                <div className='flex items-center gap-1 mt-1'>
                    <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
                    <span className='text-xs font-medium text-zinc-500'>Online</span>
                </div>
            </div>
        </div>
    );
}