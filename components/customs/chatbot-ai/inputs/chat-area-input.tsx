'use client';

import { Send, Loader2 } from 'lucide-react';
import { ChangeEvent, FormEvent } from 'react';

interface ChatInputAreaProps {
    input: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

export default function ChatInputArea({ input, handleInputChange, handleSubmit, isLoading }: ChatInputAreaProps) {
    return (
        <div className='px-4 sm:px-6 pb-4 sm:pb-2 pt-2 bg-white'>
            <form onSubmit={handleSubmit} className='flex items-center gap-2 bg-zinc-100 border border-zinc-200 p-1 sm:p-1.5 rounded-full focus-within:ring-2 focus-within:ring-[#A7E9D1] focus-within:border-primary transition-all'>

                <input
                    type='text'
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Tanyakan sesuatu pada SIPOR Assistant...'
                    className='ml-2 flex-1 bg-transparent border-none focus:outline-none text-sm text-zinc-800 px-1 sm:px-2 placeholder:text-zinc-400'
                />

                <button
                    type='submit'
                    disabled={isLoading || !input.trim()}
                    className='p-2 sm:p-3 bg-[#0A6F66] hover:bg-[#07534c] disabled:bg-zinc-400 disabled:cursor-not-allowed text-white rounded-full transition-colors shadow-sm shrink-0 flex items-center justify-center'
                >
                    {isLoading ? (
                        <Loader2 size={16} className='animate-spin ml-0.5 sm:w-4.5 sm:h-4.5' />
                    ) : (
                        <Send size={16} className='ml-0.5 sm:w-4.5 sm:h-4.5' />
                    )}
                </button>

            </form>
            <p className='text-center text-[12px] text-zinc-600 mt-2 sm:mt-3 font-medium'>
                AI dapat membuat kesalahan. Harap periksa kembali informasi penting.
            </p>
        </div>
    );
}