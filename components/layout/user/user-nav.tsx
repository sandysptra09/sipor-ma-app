'use client';

import { Dropdown, Label } from '@heroui/react';
import { User, LogOut, LayoutDashboard, Settings, Camera } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

export default function UserNav() {
    const router = useRouter();

    const { user, clearUser } = useUserStore();

    const handleLogout = async () => {
        clearUser();
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <div
                    role='button'
                    tabIndex={0}
                    className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent outline-none'
                >
                    <User size={22} className='text-primary' />
                </div>
            </Dropdown.Trigger>

            <Dropdown.Popover>
                <div className='px-4 pt-4 pb-2 border-b border-border/50'>
                    <p className='text-sm font-bold text-foreground'>{user?.name || 'User'}</p>
                    <p className='text-xs text-muted-foreground'>{user?.email || 'user@example.com'}</p>
                </div>

                <Dropdown.Menu
                    onAction={(key) => {
                        if (key === 'dashboard') router.push('/dashboard');
                        if (key === 'lapor') router.push('/scan');
                        if (key === 'profile') router.push('/profile');
                    }}
                >
                    <Dropdown.Item id='dashboard' textValue='Dashboard'>
                        <div className='flex w-full items-center justify-between gap-2'>
                            <Label className='cursor-pointer'>Dashboard</Label>
                            <LayoutDashboard size={16} className='text-muted-foreground' />
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item id='lapor' textValue='Lapor Kerusakan'>
                        <div className='flex w-full items-center justify-between gap-2'>
                            <Label className='cursor-pointer'>Lapor Kerusakan</Label>
                            <Camera size={16} className='text-muted-foreground' />
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item id='profile' textValue='Profile'>
                        <div className='flex w-full items-center justify-between gap-2'>
                            <Label className='cursor-pointer'>Pengaturan Profil</Label>
                            <Settings size={16} className='text-muted-foreground' />
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item id='logout' textValue='Logout' variant='danger' onPress={handleLogout}>
                        <div className='flex w-full items-center justify-between gap-2'>
                            <Label className='cursor-pointer font-semibold'>Keluar</Label>
                            <LogOut size={16} className='text-danger' />
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>

        </Dropdown>
    );
}