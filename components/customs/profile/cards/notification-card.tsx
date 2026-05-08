'use client';

import { Card, Switch, Label, Description } from '@heroui/react';
import { Mail, Zap } from 'lucide-react';

export default function NotificationCard() {
    return (
        <Card className='w-full bg-white shadow-sm border-none rounded-2xl p-6'>

            <div className='mb-2'>
                <h3 className='font-semibold text-lg text-[#181C1C]'>Pengaturan Notifikasi</h3>
            </div>

            <div className='flex flex-col gap-6'>
                <Switch defaultSelected className='w-full flex justify-between items-center group'>
                    {({ isSelected }) => (
                        <>
                            <Switch.Content className='flex flex-row items-start flex-1 pr-4 gap-3'>
                                <Mail size={18} className='text-[#0A6F66] shrink-0 mt-0.5' />
                                <div className='flex flex-col gap-0.5'>
                                    <Label className='text-sm font-semibold text-[#181C1C] cursor-pointer'>Email Alerts</Label>
                                    <Description className='text-xs font-medium text-muted-foreground'>Terima pembaruan status laporan melalui email.</Description>
                                </div>
                            </Switch.Content>

                            <Switch.Control className={`flex items-center h-6 w-11 shrink-0 transition-colors duration-300 rounded-full ${isSelected ? 'bg-primary' : 'bg-zinc-300'}`}>
                                <Switch.Thumb className={`size-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${isSelected ? 'translate-x-0.5' : 'translate-x-0.5'}`} />
                            </Switch.Control>
                        </>
                    )}
                </Switch>

                <Switch className='w-full flex justify-between items-center group'>
                    {({ isSelected }) => (
                        <>
                            <Switch.Content className='flex flex-row items-start flex-1 pr-4 gap-3'>
                                <Zap size={18} className='text-[#0A6F66] shrink-0 mt-0.5' />
                                <div className='flex flex-col gap-0.5'>
                                    <Label className='text-sm font-semibold text-[#181C1C] cursor-pointer'>Push Notifications</Label>
                                    <Description className='text-xs font-medium text-muted-foreground'>Terima notifikasi langsung pada peramban.</Description>
                                </div>
                            </Switch.Content>

                            <Switch.Control className={`flex items-center h-6 w-11 shrink-0 transition-colors duration-300 rounded-full ${isSelected ? 'bg-primary' : 'bg-zinc-300'}`}>
                                <Switch.Thumb className={`size-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${isSelected ? 'translate-x-0.5' : 'translate-x-0.5'}`} />
                            </Switch.Control>
                        </>
                    )}
                </Switch>
            </div>
        </Card>
    );
}