'use client';

const suggestions = [
    'Cara melapor kerusakan',
    'Cek status laporan',
    'Berapa lama perbaikan?',
];

export default function ChatSuggestionsWidget() {
    return (
        <div className='flex gap-2 px-4 sm:px-6 py-3 overflow-x-auto scrollbar-hide snap-x'>
            {suggestions.map((text, idx) => (
                <button
                    key={idx}
                    type='button'
                    className='shrink-0 snap-center px-4 py-2 bg-zinc-100 hover:bg-teal-50 hover:text-[#0A6F66] text-zinc-600 border border-zinc-200 hover:border-teal-200 text-xs sm:text-sm font-medium rounded-full transition-colors whitespace-nowrap'
                >
                    {text}
                </button>
            ))}

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}