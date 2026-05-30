'use client';

import { Card, Avatar, Button, Skeleton } from '@heroui/react';
import { Camera, CalendarDays, Mail } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

interface ProfileHeaderCardProps {
    isLoading?: boolean;
    img?: string | null;
    fullName?: string | null;
    role?: string | null;
    email?: string | null;
    createdAt?: string | null;
    setOpenUpload: (isOpen: boolean) => void;
}

export default function ProfileHeaderCard({
    isLoading = false,
    img = "https://webcodeft.com/wp-content/uploads/2021/11/dummy-user.png",
    fullName = "Sandy Saputra",
    role = "Mahasiswa - Teknik Informatika",
    email = "sandy@upi.edu",
    createdAt = "2023-10-01T00:00:00.000Z",
    setOpenUpload
}: ProfileHeaderCardProps) {

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    const formattedDate = createdAt
        ? format(parseISO(createdAt), 'MMM yyyy', { locale: id })
        : 'Tanggal tidak tersedia';

    return (
        <Card className='w-full bg-white shadow-sm border-none rounded-2xl'>
            <Card.Content className='flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 md:p-8'>

                <div className='relative shrink-0'>
                    {isLoading ? (
                        <Skeleton className="size-24 md:size-28 rounded-full" />
                    ) : (
                        <Avatar className="size-24 md:size-28 text-large ring-2 ring-offset ring-[#0A6F66]">
                            <Avatar.Image
                                src={img || "https://webcodeft.com/wp-content/uploads/2021/11/dummy-user.png"}
                                alt={fullName || "User Avatar"}
                            />
                            <Avatar.Fallback className="bg-linear-to-br from-[#0A6F66] to-[#A7E9D1] text-white font-bold text-2xl">
                                {getInitials(fullName || '')}
                            </Avatar.Fallback>
                        </Avatar>
                    )}

                    {isLoading ? (
                        <Skeleton className="absolute bottom-0 right-0 size-8 md:size-10 rounded-full border-2 border-white" />
                    ) : (
                        <Button
                            isIconOnly
                            className='absolute bottom-0 right-0 rounded-full bg-[#0A6F66] text-white size-8 md:size-10 border-2 border-white hover:bg-[#07534c] shadow-sm'
                            aria-label='Ganti Foto Profil'
                            onClick={() => setOpenUpload(true)}
                        >
                            <Camera size={16} />
                        </Button>
                    )}
                </div>

                <div className='flex flex-col items-center sm:items-start flex-1 gap-2 mt-2 sm:mt-0 w-full'>

                    {isLoading ? (
                        <Skeleton className="h-8 w-48 sm:w-64 rounded-lg" />
                    ) : (
                        <Card.Title className='text-2xl md:text-3xl font-extrabold text-[#181C1C]'>
                            {fullName}
                        </Card.Title>
                    )}

                    {/* Role & Email */}
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 w-full mt-1'>
                        {isLoading ? (
                            <>
                                <Skeleton className="h-5 w-40 rounded-md" />
                                <Skeleton className="h-5 w-36 rounded-md" />
                            </>
                        ) : (
                            <>
                                <Card.Description className='text-sm font-medium text-zinc-500 flex items-center gap-1.5'>
                                    <span className='font-semibold text-zinc-700 first-letter:uppercase lowercase'>{role}</span>
                                </Card.Description>
                                <Card.Description className='text-sm font-medium text-zinc-500 flex items-center gap-1.5'>
                                    <Mail size={14} />
                                    {email}
                                </Card.Description>
                            </>
                        )}
                    </div>

                    {isLoading ? (
                        <Skeleton className="h-7 w-44 rounded-full mt-3" />
                    ) : (
                        <div className='flex items-center gap-2 mt-3 px-3.5 py-1.5 bg-[#e6f4f1] border border-[#A7E9D1]/50 rounded-full w-fit'>
                            <CalendarDays size={14} className='text-[#0A6F66]' />
                            <span className='text-xs font-semibold text-[#0A6F66]'>Bergabung sejak {formattedDate}</span>
                        </div>
                    )}
                </div>

            </Card.Content>
        </Card>
    );
}