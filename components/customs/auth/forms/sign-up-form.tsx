'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

import { Form, Separator } from '@heroui/react';
import TextFieldInput from '../inputs/text-field-input';
import NumberFieldInput from '../inputs/number-field-input';
import PasswordFieldInput from '../inputs/password-field-input';
import AuthCheckbox from '../checkboxs/auth-checkbox';
import AuthSubmitButton from '../buttons/auth-submit-button';
import AuthGoogleButton from '../buttons/auth-google-button';
import Link from 'next/link';

import { User, IdCard, Mail, ShieldCheck } from 'lucide-react';

export default function SignUpForm() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirm_password) {
            alert('Password dan Konfirmasi Password tidak sama!');
            setIsLoading(false);
            return;
        }

        try {

            const response = await api.post('/auth/register', {
                name: data.nama,
                nim_nip: data.nim,
                email: data.email,
                password: data.password,
            });

            alert(response.data.message || 'Registrasi Berhasil! Silakan Login.');
            router.push('/login');

        } catch (error: any) {
            alert(error.response?.data?.message || 'Terjadi kesalahan saat registrasi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form
            className='flex w-full flex-col gap-4'
            validationBehavior='native'
            onSubmit={handleRegister}
        >

            <TextFieldInput
                name='nama'
                label='Nama'
                placeholder='Masukan nama'
                startIcon={<User size={18} />}
            />

            <NumberFieldInput
                name='nim'
                label='NIM'
                placeholder='Masukan NIM'
                startIcon={<IdCard size={18} />}
                maxLength={15}
            />

            <TextFieldInput
                name='email'
                label='Email'
                placeholder='Masukan Email'
                startIcon={<Mail size={18} />}
            />

            <PasswordFieldInput
                name='password'
                label='Password'
                placeholder='Masukan Password'
                showForgotLink={false}
            />

            <PasswordFieldInput
                name='confirm_password'
                label='Konfirmasi Password'
                placeholder='Konfirmasi Password'
                showForgotLink={false}
                startIcon={<ShieldCheck size={18} />}
            />

            <div className='mt-2'>
                <AuthCheckbox name='terms_and_conditions'>
                    Saya menyetujui{' '}
                    <Link href='#' className='font-semibold text-primary hover:underline'>
                        ketentuan layanan
                    </Link>{' '}
                    dan{' '}
                    <Link href='#' className='font-semibold text-primary hover:underline'>
                        kebijakan privasi
                    </Link>{' '}
                    sistem pelaporan fasilitas kampus.
                </AuthCheckbox>
            </div>

            <AuthSubmitButton name='Mulai Berkontribusi' isLoading={isLoading} />

            <div className='my-2 flex w-full items-center gap-3'>
                <Separator className='flex-1 bg-border' />
                <span className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                    Atau
                </span>
                <Separator className='flex-1 bg-border' />
            </div>

            <AuthGoogleButton />

        </Form>
    )
}