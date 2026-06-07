'use client';

import { useState } from 'react';
import { Card, TextField, Label, Input, Button, toast } from '@heroui/react';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react'; 

export default function SecurityForm() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.warning('Password baru dan konfirmasi tidak cocok!');
            return;
        }

        if (formData.newPassword.length < 8) {
            toast.warning('Password baru minimal 8 karakter!');
            return;
        }

        setIsLoading(true);

        try {
            await new Promise((res) => setTimeout(res, 800));

            const response = await api.patch('/users/me/password', {
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });

            setShowCurrent(false);
            setShowNew(false);
            setShowConfirm(false);

            toast.success(response.data.message || 'Password berhasil diubah!');
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                toast.danger(error.response?.data?.message || 'Terjadi kesalahan pada server');
            } else {
                toast.danger('Gagal terhubung ke server. Coba lagi.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className='w-full bg-white shadow-sm border-none rounded-2xl p-6'>
            <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <h3 className='font-semibold text-lg text-[#181C1C]'>Keamanan Akun</h3>
                </div>

                <div className='flex flex-col gap-5'>

                    <TextField className='w-full flex flex-col gap-1.5' name='currentPassword'>
                        <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Password Saat Ini</Label>
                        <div className="relative w-full">
                            <Input
                                type={showCurrent ? 'text' : 'password'}
                                name='currentPassword'
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                                placeholder='••••••••'
                                className='w-full bg-zinc-50 border border-zinc-200 text-foreground font-medium px-4 h-11 rounded-lg shadow-none focus-within:border-2 focus-within:border-[#0A6F66] transition-colors pr-10'
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
                            >
                                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </TextField>

                    <TextField className='w-full flex flex-col gap-1.5' name='newPassword'>
                        <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Password Baru</Label>
                        <div className="relative w-full">
                            <Input
                                type={showNew ? 'text' : 'password'}
                                name='newPassword'
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                placeholder='Minimal 8 karakter'
                                className='w-full bg-zinc-50 border border-zinc-200 text-foreground font-medium px-4 h-11 rounded-lg shadow-none focus-within:border-2 focus-within:border-[#0A6F66] transition-colors pr-10'
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
                            >
                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </TextField>

                    <TextField className='w-full flex flex-col gap-1.5' name='confirmPassword'>
                        <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Konfirmasi Password</Label>
                        <div className="relative w-full">
                            <Input
                                type={showConfirm ? 'text' : 'password'}
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder='Ulangi password baru'
                                className='w-full bg-zinc-50 border border-zinc-200 text-foreground font-medium px-4 h-11 rounded-lg shadow-none focus-within:border-2 focus-within:border-[#0A6F66] transition-colors pr-10'
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={isLoading}
                        className='w-full h-11 mt-2 bg-primary text-white font-bold text-sm transition-colors rounded-lg disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}