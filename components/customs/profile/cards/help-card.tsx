'use client';

import { Card } from '@heroui/react';
import { CircleQuestionMark, LifeBuoy } from 'lucide-react';
import Link from 'next/link';

export default function HelpCard() {
    return (
        <Card className='w-full bg-[#f4fbf9] shadow-sm border border-[#e6f4f1] rounded-2xl p-6'>
            <div className='flex flex-col gap-3'>
                <h3 className='font-bold text-base text-[#0A6F66]'>Butuh Bantuan?</h3>

                <p className='text-xs md:text-sm font-medium text-zinc-600 leading-relaxed'>
                    Jika Anda mengalami kesulitan dalam mengakses akun atau ingin menonaktifkan akun, silakan hubungi admin institusi.
                </p>

                <Link
                    href='/help-center'
                    className='flex items-center gap-2 mt-2 w-fit text-[#0A6F66] hover:text-[#07534c] transition-colors'
                >
                    <CircleQuestionMark size={16} />
                    <span className='text-sm font-bold'>Hubungi Helpdesk</span>
                </Link>
            </div>
        </Card>
    );
}