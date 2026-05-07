'use client';

import { Scanner } from '@yudiel/react-qr-scanner';
import { motion } from 'framer-motion';

interface ScannerWidgetProps {
    onScan: (result: string) => void;
}

export default function ScannerWidget({ onScan }: ScannerWidgetProps) {
    return (
        <div className='relative w-full max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden bg-black shadow-2xl'>

            <Scanner
                onScan={(result) => {
                    if (result && result.length > 0) {
                        onScan(result[0].rawValue);
                    }
                }}
                onError={(error) => {
                    console.error('Camera error:', error);
                }}
                components={{
                    finder: false,
                }}
                styles={{
                    container: { width: '100%', height: '100%' },
                    video: { objectFit: 'cover' }
                }}
            />

            <div className='absolute inset-0 pointer-events-none border-[40px] border-black/50' />

            <div className='absolute inset-0 pointer-events-none flex items-center justify-center'>
                <div className='relative w-[70%] h-[70%]'>

                    <div className='absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#A7E9D1] rounded-tl-xl' />

                    <div className='absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#A7E9D1] rounded-tr-xl' />

                    <div className='absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#A7E9D1] rounded-bl-xl' />

                    <div className='absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#A7E9D1] rounded-br-xl' />

                    <motion.div
                        className='w-full h-0.5 bg-[#A7E9D1] shadow-[0_0_8px_2px_rgba(167,233,209,0.6)]'
                        animate={{
                            y: ['0%', '3500%', '0%'],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                </div>
            </div>

        </div>
    );
}