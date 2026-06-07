'use client';

import { useState } from 'react';
import { Form, toast } from '@heroui/react';
import TextFieldInput from '../inputs/text-field-input';
import AuthSubmitButton from '../buttons/auth-submit-button';
import { Mail, CheckCircle2 } from 'lucide-react';

import { api } from '@/lib/axios';

export default function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        try {
            const res = await api.post('/auth/forgot-password', { email });

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
                <h3 className='font-bold text-primary text-lg mb-2'>Tautan Terkirim!</h3>
                <p className='text-sm text-zinc-600 leading-relaxed'>
                    Kami telah mengirimkan instruksi pemulihan kata sandi ke email Anda.
                    Silakan cek kotak masuk (atau folder spam) Anda.
                </p>
            </div>
        );
    }

    return (
        <Form
            className='flex w-full flex-col gap-4'
            validationBehavior='native'
            onSubmit={handleSubmit}
        >
            <TextFieldInput
                name='email'
                label='Email Institusi'
                placeholder='Masukkan email akun Anda'
                startIcon={<Mail size={18} />}
            />

            <div className='mt-2 w-full'>
                <AuthSubmitButton
                    name='Kirim Tautan Reset'
                    isLoading={isLoading}
                    loadingText='Mengirim tautan...'
                />
            </div>
        </Form>
    );
}