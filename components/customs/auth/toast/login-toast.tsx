'use client';

import { useEffect } from 'react';
import { toast } from '@heroui/react';

export default function LoginToast() {
    useEffect(() => {
        if (sessionStorage.getItem('showRegisterToast') === 'true') {
            toast.success('Registrasi Berhasil!', {
                description: <span className='text-zinc-600'>Silakan masuk menggunakan akun baru Anda.</span>
            });
            sessionStorage.removeItem('showRegisterToast');
        }
    }, []);

    return null;
}