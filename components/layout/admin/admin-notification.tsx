'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { getPusherClient } from '@/lib/pusher-client';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Badge, Dropdown, toast } from '@heroui/react';
import { Bell } from 'lucide-react';
import { getSession } from 'next-auth/react';

interface Notification {
    id: string;
    report: any;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function AdminNotification() {
    const pathname = usePathname();
    const isNotificationPage = pathname === "/admin/notifications";

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleNotificationClick = (id: string, isRead: boolean) => {
        if (isRead === false && typeof window !== 'undefined') {
            setNotifications((prevNotifications) =>
                prevNotifications.map((n) =>
                    n.id === id ? { ...n, isRead: true } : n
                )
            );

            fetch('/api/admin/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isRead: true })
            }).catch(error => console.error('Gagal update status read:', error));
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await api.get('/notifications');
                setNotifications(res.data);
            } catch (error) {
                console.error('Gagal mengambil notifikasi:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        const setupPusher = async () => {
            const session = await getSession();
            const userId = session?.user?.id;

            if (!userId) return;

            const pusher = getPusherClient();
            const channelName = `user-${userId}-notifications`;
            const channel = pusher.subscribe(channelName);

            channel.unbind('new-notification');
            channel.bind('new-notification', (newNotif: Notification) => {
                setNotifications((prev) => [newNotif, ...prev]);

                toast.info(newNotif.title, {
                    description: <span className='text-foreground'>{newNotif.message}</span>,
                });
            });

            return () => {
                pusher.unsubscribe(channelName);
            };
        };

        setupPusher();
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const displayedNotifications = notifications.slice(0, 4);
    console.log(notifications);
    if (isNotificationPage) {
        return (
            <div
                className="flex h-10 w-10 items-center justify-center "
                aria-label="Halaman Notifikasi"
            >
                <Badge.Anchor>
                    <Bell
                        size={20}
                        className="text-primary fill-current"
                    />

                    {unreadCount > 0 && (
                        <Badge
                            color="danger"
                            size="sm"
                            className="border-2 border-white"
                        >
                            <Badge.Label>{unreadCount}</Badge.Label>
                        </Badge>
                    )}
                </Badge.Anchor>
            </div>
        );
    }

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <div
                    role='button'
                    tabIndex={0}
                    aria-label='Notifikasi Admin'
                    className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full outline-none transition-colors hover:bg-accent'
                >
                    <Badge.Anchor>
                        <Bell size={20} className='text-primary' />

                        {unreadCount > 0 && (
                            <Badge color='danger' size='sm' className='border-2 border-white'>
                                <Badge.Label>{unreadCount}</Badge.Label>
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
                        aria-label='Daftar Notifikasi Admin'
                        className='max-h-80 overflow-y-auto p-2'
                    >
                        {isLoading ? (
                            <Dropdown.Item key='loading' textValue='Loading'>
                                <p className='text-center text-sm text-muted-foreground py-4'>Memuat...</p>
                            </Dropdown.Item>
                        ) : notifications.length === 0 ? (
                            <Dropdown.Item key='empty' textValue='Kosong'>
                                <p className='text-center text-sm text-muted-foreground py-4'>Belum ada notifikasi.</p>
                            </Dropdown.Item>
                        ) : (
                            displayedNotifications.map((notif) => (
                                <Dropdown.Item
                                    key={notif.id}
                                    textValue={notif.title}
                                    className={`mb-1 min-h-fit ${!notif.isRead ? 'bg-primary/5' : ''}`}
                                >
                                    <Link onClick={() => handleNotificationClick(notif.id, notif.isRead)} href={`/admin/report-management/${encodeURIComponent(notif.report.reportNumber)}`} className='flex flex-col gap-1 py-1'>
                                        <p className={`text-sm ${!notif.isRead ? 'font-bold text-primary' : 'font-semibold'}`}>
                                            {notif.title}
                                        </p>
                                        <p className='whitespace-normal text-xs text-muted-foreground leading-relaxed'>
                                            {notif.message}
                                        </p>
                                        <p className='mt-1 text-[10px] font-medium text-muted-foreground/70'>
                                            {formatDistanceToNow(new Date(notif.createdAt), {
                                                addSuffix: true,
                                                locale: id
                                            })}
                                        </p>
                                    </Link>
                                </Dropdown.Item>
                            ))
                        )}
                    </Dropdown.Menu>

                    {notifications.length > 4 && (
                        <div className='border-t border-border/50 p-2'>
                            <Link
                                href='/admin/notifications'
                                className='block w-full text-center text-xs font-semibold text-primary hover:underline py-1'
                            >
                                Lihat semua notifikasi
                            </Link>
                        </div>
                    )}

                </div>
            </Dropdown.Popover>
        </Dropdown>
    );
}