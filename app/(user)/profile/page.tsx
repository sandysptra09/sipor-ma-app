import ProfileContent from '@/components/customs/profile/profile-content'

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profil Saya',
    description: 'Kelola informasi akun, data diri, dan pengaturan keamanan profil SIPOR-MA kamu.',
};

export default function ProfilePage() {
    return (
        <div className='min-h-screen w-full bg-background py-10 md:py-12'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <ProfileContent />

            </div>
        </div>
    )
}
