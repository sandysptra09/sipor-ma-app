'use client';

import { Card } from '@heroui/react';
import { Camera, CheckCheck } from 'lucide-react';
import { MdOutlineEngineering } from 'react-icons/md';

export default function ReportStepsCard() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-2'>

            <Card className='bg-zinc-100 border-none shadow-none rounded-lg'>
                <Card.Header className='flex flex-row items-start gap-4 p-1'>
                    <div className='bg-muted w-10 h-10 rounded-lg flex items-center justify-center shrink-0'>
                        <Camera size={20} className='text-primary' />
                    </div>

                    <div className='flex flex-col gap-1.5 mt-0.5'>
                        <Card.Title className='font-bold text-primary text-sm'>
                            Identifikasi AI
                        </Card.Title>
                        <Card.Description className='text-xs text-muted-foreground font-medium leading-relaxed'>
                            Foto dan deskripsi akan dianalisis secara otomatis untuk menentukan prioritas.
                        </Card.Description>
                    </div>
                </Card.Header>
            </Card>

            <Card className='bg-zinc-100 border-none shadow-none rounded-lg'>
                <Card.Header className='flex flex-row items-start gap-4 p-1'>
                    <div className='bg-muted w-10 h-10 rounded-lg flex items-center justify-center shrink-0'>
                        <MdOutlineEngineering size={20} className='text-primary' />
                    </div>

                    <div className='flex flex-col gap-1.5 mt-0.5'>
                        <Card.Title className='font-bold text-primary text-sm'>
                            Perbaikan
                        </Card.Title>
                        <Card.Description className='text-xs text-muted-foreground font-medium leading-relaxed'>
                            Tim teknisi akan memverifikasi dan segera menindaklanjuti laporan Anda.
                        </Card.Description>
                    </div>
                </Card.Header>
            </Card>

            <Card className='bg-zinc-100 border-none shadow-none rounded-lg'>
                <Card.Header className='flex flex-row items-start gap-4 p-1'>
                    <div className='bg-muted w-10 h-10 rounded-lg flex items-center justify-center shrink-0'>
                        <CheckCheck size={20} className='text-primary' />
                    </div>

                    <div className='flex flex-col gap-1.5 mt-0.5'>
                        <Card.Title className='font-bold text-primary text-sm'>
                            Selesai
                        </Card.Title>
                        <Card.Description className='text-xs text-muted-foreground font-medium leading-relaxed'>
                            Anda menerima notifikasi setelah status terpenuhi.
                        </Card.Description>
                    </div>
                </Card.Header>
            </Card>

        </div>
    );
}