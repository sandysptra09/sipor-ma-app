'use client';

import { Form, Separator } from '@heroui/react';
import TextFieldInput from '../inputs/text-field-input';
import PasswordFieldInput from '../inputs/password-field-input';
import AuthCheckbox from '../checkboxs/auth-checkbox';
import AuthSubmitButton from '../buttons/auth-submit-button';
import AuthGoogleButton from '../buttons/auth-google-button';

import { User } from 'lucide-react';

export default function LoginForm() {

    return (
        <Form
            className='flex w-full flex-col gap-3.5'
            validationBehavior='native'
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

            <AuthSubmitButton name='Masuk' />

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
