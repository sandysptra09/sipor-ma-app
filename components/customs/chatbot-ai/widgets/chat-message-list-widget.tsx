'use client';

import { Bot } from 'lucide-react';

const dummyMessages = [
    {
        id: '1',
        role: 'ASSISTANT',
        content: 'Halo! Saya SIPOR Assistant. Ada yang bisa saya bantu terkait pelaporan kerusakan fasilitas hari ini?',
        time: '09:41'
    },
    {
        id: '2',
        role: 'USER',
        content: 'Berapa lama biasanya perbaikan AC di kelas diselesaikan?',
        time: '09:42'
    },
    {
        id: '3',
        role: 'ASSISTANT',
        content: 'Untuk kerusakan AC yang mengganggu proses belajar mengajar, tim Sarpras mengkategorikannya sebagai prioritas MEDIUM hingga HIGH. Biasanya tim teknisi akan melakukan pengecekan maksimal 1x24 jam setelah laporan diverifikasi.',
        time: '09:42'
    }
];

export default function ChatMessageListWidget() {
    return (
        <div className='flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-zinc-50/50 data-lenis-prevent'>

            <div className='flex justify-center'>
                <span className='bg-zinc-100 text-zinc-500 text-xs font-medium px-3 py-1 rounded-full'>
                    Hari ini
                </span>
            </div>

            {dummyMessages.map((msg) => {
                const isUser = msg.role === 'USER';

                return (
                    <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                            {!isUser && (
                                <div className='shrink-0 w-8 h-8 rounded-full bg-[#0A6F66] text-white flex items-center justify-center mt-auto'>
                                    <Bot size={18} />
                                </div>
                            )}

                            <div className='flex flex-col gap-1'>
                                <div
                                    className={`px-4 py-3 text-sm leading-relaxed ${isUser
                                        ? 'bg-[#0A6F66] text-white rounded-2xl rounded-br-sm'
                                        : 'bg-white border border-zinc-200 text-zinc-800 rounded-2xl rounded-bl-sm shadow-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                                <span className={`text-[10px] text-zinc-400 font-medium ${isUser ? 'text-right' : 'text-left'}`}>
                                    {msg.time}
                                </span>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}