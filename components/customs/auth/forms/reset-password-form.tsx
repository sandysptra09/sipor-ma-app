'use client';

import { useState } from 'react';
import { Form, toast } from '@heroui/react';
import PasswordFieldInput from '../inputs/password-field-input';
import AuthSubmitButton from '../buttons/auth-submit-button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/axios';

export default function ResetPasswordForm({ token }: { token?: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!token) {
        return (
            <div className='flex flex-col items-center justify-center text-center p-6 bg-red-50 rounded-2xl border border-red-200'>
                <h3 className='font-bold text-red-600 text-lg mb-2'>Tautan Tidak Valid</h3>
                <p className='text-sm text-zinc-600 leading-relaxed mb-4'>
                    Tautan reset kata sandi tidak ditemukan atau tidak lengkap. Silakan minta ulang tautan dari halaman Lupa Kata Sandi.
                </p>
                <Link href='/forgot-password' className='text-primary font-bold text-sm hover:underline'>
                    Kembali ke Lupa Kata Sandi
                </Link>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            toast.danger('Gagal', {
                description: <span className='text-zinc-600'>Kata sandi baru dan konfirmasi kata sandi tidak cocok.</span>
            });
            setIsLoading(false);
            return;
        }

        try {
            const res = await api.post('/auth/reset-password', { token, password });

            setIsSuccess(true);
            toast.success('Berhasil', {
                description: <span className='text-zinc-600'>{res.data.message}</span>
            });

        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Gagal terhubung ke server. Pastikan koneksi internet Anda stabil.';

            toast.danger(error.response?.data?.error ? 'Gagal' : 'Terjadi kesalahan', {
                description: <span className='text-zinc-600'>{errorMessage}</span>
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className='flex flex-col items-center justify-center text-center p-6 bg-teal-50 rounded-2xl border border-primary/20 animate-in fade-in zoom-in duration-500'>
                <div className='bg-white p-3 rounded-full mb-4 shadow-sm'>
                    <CheckCircle2 className='text-primary' size={32} />
                </div>
                <h3 className='font-bold text-primary text-lg mb-2'>Kata Sandi Diperbarui!</h3>
                <p className='text-sm text-zinc-600 leading-relaxed mb-6'>
                    Kata sandi Anda telah berhasil diubah. Silakan login kembali menggunakan kata sandi yang baru.
                </p>
                <Link href='/login' className='w-full'>
                    <button className='w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all'>
                        Pergi ke Halaman Login
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <Form
            className='flex w-full flex-col gap-4'
            validationBehavior='native'
            onSubmit={handleSubmit}
        >
            <PasswordFieldInput
                name='password'
                label='Kata Sandi Baru'
                placeholder='Minimal 8 karakter'
            />

            <PasswordFieldInput
                name='confirmPassword'
                label='Konfirmasi Kata Sandi Baru'
                placeholder='Ketik ulang kata sandi baru'
            />

            <div className='mt-2 w-full'>
                <AuthSubmitButton
                    name='Simpan Kata Sandi'
                    isLoading={isLoading}
                    loadingText='Menyimpan...'
                />
            </div>
        </Form>
    );
}