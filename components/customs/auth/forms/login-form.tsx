'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Form, Separator } from '@heroui/react';
import TextFieldInput from '../inputs/text-field-input';
import PasswordFieldInput from '../inputs/password-field-input';
import AuthCheckbox from '../checkboxs/auth-checkbox';
import AuthSubmitButton from '../buttons/auth-submit-button';
import AuthGoogleButton from '../buttons/auth-google-button';

import { User } from 'lucide-react';

export default function LoginForm() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {

            const res = await signIn('credentials', {
                identifier: data['email-or-nim'],
                password: data.password,
                redirect: false,
            });

            if (res?.error) {
                alert(res.error);
            } else {
                alert('Login Berhasil!');
                router.push('/dashboard');
                router.refresh();
            }

        } catch (error) {
            alert('Terjadi kesalahan sistem.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form
            className='flex w-full flex-col gap-3.5'
            validationBehavior='native'
            onSubmit={handleLogin}
        >

            <TextFieldInput
                name='email-or-nim'
                label='NIM atau Email Institusi'
                placeholder='Masukan NIM atau Email'
                startIcon={<User size={18} />}
            />

            <PasswordFieldInput
                name='password'
                label='Kata Sandi'
                placeholder='Masukan Password'
                showForgotLink={true}
            />

            <AuthCheckbox name='remember_me'>
                Ingat saya di perangkat ini
            </AuthCheckbox>

            <AuthSubmitButton name='Masuk' isLoading={isLoading} />

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
