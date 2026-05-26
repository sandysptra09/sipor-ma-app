'use client';

import { Send } from 'lucide-react';

export default function ChatInputArea() {
    return (
        <div className='px-4 sm:px-6 pb-4 sm:pb-2 pt-2 bg-white'>
            <div className='flex items-center gap-2 bg-zinc-100 border border-zinc-200 p-1 sm:p-1.5 rounded-full focus-within:ring-2 focus-within:ring-[#A7E9D1] focus-within:border-primary transition-all'>

                <input
                    type='text'
                    placeholder='Tanyakan sesuatu pada SIPOR Assistant...'
                    className='ml-2 flex-1 bg-transparent border-none focus:outline-none text-sm text-zinc-800 px-1 sm:px-2 placeholder:text-zinc-400'
                />

                <button
                    type='button'
                    className='p-2 sm:p-3 bg-[#0A6F66] hover:bg-[#07534c] text-white rounded-full transition-colors shadow-sm shrink-0 flex items-center justify-center'
                >
                    <Send size={16} className='ml-0.5 sm:w-4.5 sm:h-4.5' />
                </button>

            </div>
            <p className='text-center text-[12px] text-zinc-600 mt-2 sm:mt-3 font-medium'>
                AI dapat membuat kesalahan. Harap periksa kembali informasi penting.
            </p>
        </div>
    );
}