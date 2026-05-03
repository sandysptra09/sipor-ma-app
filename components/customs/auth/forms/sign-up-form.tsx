'use client';

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
    return (
        <Form
            className='flex w-full flex-col gap-4'
            validationBehavior='native'
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

            <AuthSubmitButton name='Mulai Berkontribusi' />

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