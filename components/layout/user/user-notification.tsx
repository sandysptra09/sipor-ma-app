'use client';

import { Badge, Dropdown } from '@heroui/react';
import { Bell } from 'lucide-react';

export default function UserNotification() {
    const notifications = [
        { id: 1, title: 'Laporan Diterima', desc: 'Laporan AC rusak di Lab Komputer sedang diproses admin.', time: '5 menit lalu' },
        { id: 2, title: 'Perbaikan Selesai', desc: 'Lampu proyektor Ruang 302 sudah selesai diganti.', time: '1 jam lalu' },
        { id: 3, title: 'Info Sistem', desc: 'Sistem SIPOR-MA akan maintenance malam ini.', time: '2 hari lalu' },
    ];

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <div
                    role='button'
                    tabIndex={0}
                    aria-label='Notifikasi'
                    className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full outline-none transition-colors hover:bg-accent'
                >
                    <Badge.Anchor>
                        <Bell size={20} className='text-primary' />

                        {notifications.length > 0 && (
                            <Badge color='danger' size='sm' className='border-2 border-white'>
                                <Badge.Label>{notifications.length}</Badge.Label>
                            </Badge>
                        )}
                    </Badge.Anchor>
                </div>
            </Dropdown.Trigger>

            <Dropdown.Popover className='w-80'>
                <div className='flex w-full flex-col'>

                    <div className='border-b border-border/50 px-4 py-3'>
                        <p className='text-sm font-bold text-foreground'>Notifikasi</p>
                    </div>

                    <Dropdown.Menu
                        aria-label='Daftar Notifikasi'
                        className='max-h-80 overflow-y-auto p-2'
                    >
                        {notifications.map((notif) => (
                            <Dropdown.Item key={notif.id} textValue={notif.title} className='mb-1'>
                                <div className='flex flex-col gap-1 py-1'>
                                    <p className='text-sm font-semibold'>{notif.title}</p>
                                    <p className='whitespace-normal text-xs text-muted-foreground leading-relaxed'>
                                        {notif.desc}
                                    </p>
                                    <p className='mt-1 text-[10px] font-medium text-muted-foreground/70'>
                                        {notif.time}
                                    </p>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>

                </div>
            </Dropdown.Popover>
        </Dropdown>
    );
}