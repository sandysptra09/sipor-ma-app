'use client';

import { Card, TextField, Label, Input } from '@heroui/react';

export default function AccountInfoCard() {
    return (
        <Card className='w-full bg-white shadow-sm border-none rounded-2xl p-6'>

            <div className='mb-2'>
                <h3 className='font-semibold text-lg text-[#181C1C]'>Informasi Akun</h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5'>

                <TextField isReadOnly className='w-full flex flex-col gap-1.5' name='email' value='sandy@upi.edu'>
                    <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Email Kampus</Label>
                    <Input className='bg-zinc-50 border border-zinc-200 text-foreground font-semibold text-[13px] px-4 h-1md1 rounded-lg cursor-not-allowed shadow-none' />
                </TextField>

                <TextField isReadOnly className='w-full flex flex-col gap-1.5' name='prodi' value='Rekayasa Perangkat Lunak'>
                    <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Program Studi</Label>
                    <Input className='bg-zinc-50 border border-zinc-200 text-foreground font-semibold text-[13px] px-4 h-1md1 rounded-lg cursor-not-allowed shadow-none' />
                </TextField>

                <TextField isReadOnly className='w-full flex flex-col gap-1.5' name='fakultas' value='Kamda Cibiru'>
                    <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Fakultas</Label>
                    <Input className='bg-zinc-50 border border-zinc-200 text-foreground font-semibold text-[13px] px-4 h-1md1 rounded-lg cursor-not-allowed shadow-none' />
                </TextField>

                <TextField isReadOnly className='w-full flex flex-col gap-1.5' name='angkatan' value='2024'>
                    <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Tahun Angkatan</Label>
                    <Input className='bg-zinc-50 border border-zinc-200 text-foreground font-semibold text-[13px] md:text-md px-4 h-11 rounded-lg cursor-not-allowed shadow-none' />
                </TextField>

            </div>
        </Card>
    );
}