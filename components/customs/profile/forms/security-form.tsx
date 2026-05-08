'use client';

import { Card, TextField, Label, Input, Button } from '@heroui/react';

export default function SecurityForm() {
    return (
        <Card className='w-full bg-white shadow-sm border-none rounded-2xl p-6'>
            <div className='mb-6'>
                <h3 className='font-semibold text-lg text-[#181C1C]'>Keamanan Akun</h3>
            </div>

            <div className='flex flex-col gap-5'>
                <TextField className='w-full flex flex-col gap-1.5' name='currentPassword' type='password'>
                    <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Password Saat Ini</Label>
                    <Input
                        placeholder='••••••••'
                        className='bg-zinc-50 border border-zinc-200 text-foreground font-medium px-4 h-11 rounded-lg shadow-none focus-within:border-2 focus-within:border-[#0A6F66] transition-colors'
                    />
                </TextField>

                <TextField className='w-full flex flex-col gap-1.5' name='newPassword' type='password'>
                    <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Password Baru</Label>
                    <Input
                        placeholder='Minimal 8 karakter'
                        className='bg-zinc-50 border border-zinc-200 text-foreground font-medium px-4 h-11 rounded-lg shadow-none focus-within:border-2 focus-within:border-[#0A6F66] transition-colors'
                    />
                </TextField>

                <TextField className='w-full flex flex-col gap-1.5' name='confirmPassword' type='password'>
                    <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Konfirmasi Password</Label>
                    <Input
                        placeholder='Ulangi password baru'
                        className='bg-zinc-50 border border-zinc-200 text-foreground font-medium px-4 h-11 rounded-lg shadow-none focus-within:border-2 focus-within:border-[#0A6F66] transition-colors'
                    />
                </TextField>


                <Button className='w-full h-11 mt-2 bg-primary text-white font-bold text-sm transition-colors rounded-lg'>
                    Simpan Perubahan
                </Button>
            </div>
        </Card>
    );
}