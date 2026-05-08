'use client';

import { Card, Avatar, Button } from '@heroui/react';
import { Camera, CalendarDays, Mail } from 'lucide-react';

export default function ProfileHeaderCard() {
    return (
        <Card className='w-full bg-white shadow-sm borde-none rounded-2xl'>
            <Card.Content className='flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 md:p-8'>

                <div className='relative shrink-0'>
                    <Avatar className='size-24 md:size-28 text-large ring-2 ring-offset ring-[#0A6F66]'>
                        <Avatar.Image src='https://webcodeft.com/wp-content/uploads/2021/11/dummy-user.png' alt='Sandy Saputra' />
                        <Avatar.Fallback className='bg-linear-to-br from-[#0A6F66] to-[#A7E9D1] text-white font-bold text-2xl'>
                            SS
                        </Avatar.Fallback>
                    </Avatar>

                    <Button
                        isIconOnly
                        className='absolute bottom-0 right-0 rounded-full bg-[#0A6F66] text-white size-8 md:size-10 border-2 border-white hover:bg-[#07534c] shadow-sm'
                        aria-label='Ganti Foto Profil'
                    >
                        <Camera size={16} />
                    </Button>
                </div>

                <div className='flex flex-col items-center sm:items-start flex-1 gap-2 mt-2 sm:mt-0'>
                    <Card.Title className='text-2xl md:text-3xl font-extrabold text-[#181C1C]'>
                        Sandy Saputra
                    </Card.Title>

                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 w-full'>
                        <Card.Description className='text-sm font-medium text-zinc-500 flex items-center gap-1.5'>
                            <span className='font-semibold text-zinc-700'>Mahasiswa</span> - Teknik Informatika
                        </Card.Description>
                        <Card.Description className='text-sm font-medium text-zinc-500 flex items-center gap-1.5'>
                            <Mail size={14} />
                            sandy@upi.edu
                        </Card.Description>
                    </div>

                    <div className='flex items-center gap-2 mt-3 px-3.5 py-1.5 bg-[#e6f4f1] border border-[#A7E9D1]/50 rounded-full w-fit'>
                        <CalendarDays size={14} className='text-[#0A6F66]' />
                        <span className='text-xs font-semibold text-[#0A6F66]'>Bergabung sejak Okt 2023</span>
                    </div>
                </div>

            </Card.Content>
        </Card>
    );
}