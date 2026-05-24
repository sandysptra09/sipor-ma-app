'use client';

import { useState, useEffect } from 'react';
import { Button, toast } from '@heroui/react';
import { Send, Sparkles, CheckCircle2, ShieldCheck, Bot, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

import LocationFieldInput from '../inputs/location-field-input';
import DescriptionTextarea from '../textareas/description-textarea';
import UploadMediaWidget from '../widgets/upload-media-widget';
import ConfirmationModal from '../modals/confirmation-modal';

interface ReportingFormProps {
    roomCode: string;
    fullLocation?: string;
    isLoadingLocation?: boolean;
}

export default function ReportingForm({ roomCode, fullLocation, isLoadingLocation }: ReportingFormProps) {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingStep, setLoadingStep] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;
        let timeout3: NodeJS.Timeout;

        if (isSubmitting) {
            setLoadingStep(0);

            timeout1 = setTimeout(() => setLoadingStep(1), 1500);
            timeout2 = setTimeout(() => setLoadingStep(2), 3000);
            timeout3 = setTimeout(() => setLoadingStep(3), 4500);
        }

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, [isSubmitting]);

    const handleOpenConfirmation = () => {
        if (!imageUrl) {
            toast.warning('Mohon unggah foto bukti terlebih dahulu!');
            return;
        }

        if (!description) {
            toast.warning('Mohon isi deskripsi terlebih dahulu!');
            return;
        }

        if (description.trim().length < 10) {
            toast.warning('Deskripsi terlalu singkat. Mohon jelaskan lebih detail.');
            return;
        }

        setIsModalOpen(true);
    };

    const handleConfirmSubmit = async () => {
        setIsModalOpen(false);
        setIsSubmitting(true);

        const loadingId = toast('Memproses Laporan...', {
            isLoading: true,
            timeout: 0,
        });

        try {
            const res = await api.post('/analyze-report', {
                roomCode,
                description,
                imageUrl
            });

            toast.close(loadingId);

            setTimeout(() => {
                toast.success(res.data.message || 'Laporan berhasil dikirim!');

                setTimeout(() => {
                    router.push('/dashboard');
                }, 1500);
            }, 100);

        } catch (error: any) {
            toast.close(loadingId);

            setTimeout(() => {
                setIsSubmitting(false);

                if (error.response?.status === 400) {
                    toast.danger(error.response.data.message);
                } else {
                    toast.danger('Gagal memproses laporan. Coba beberapa saat lagi.');
                }
            }, 100);
        }
    };

    const renderLoadingContent = () => {
        switch (loadingStep) {
            case 0:
                return (
                    <span className='flex items-center gap-2 animate-pulse'>
                        <Send size={18} />
                        Mengunggah Laporan...
                    </span>
                );
            case 1:
                return (
                    <span className='flex items-center gap-2 animate-pulse'>
                        <Bot size={18} />
                        AI sedang menganalisa foto bukti...
                    </span>
                );
            case 2:
                return (
                    <span className='flex items-center gap-2 animate-pulse'>
                        <Sparkles size={18} />
                        Menentukan kategori & prioritas ...
                    </span>
                );
            case 3:
                return (
                    <span className='flex items-center gap-2 animate-pulse'>
                        <Rocket size={18} />
                        Menyelesaikan laporan...
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col gap-6 w-full bg-white p-5 md:p-8 rounded-lg shadow-sm border-none'>

            <LocationFieldInput locationText={isLoadingLocation ? 'Memuat lokasi...' : (fullLocation || roomCode)} />

            <UploadMediaWidget onUploadSuccess={(url) => setImageUrl(url)} />

            {imageUrl && (
                <div className='flex items-center gap-2 text-sm text-primary font-medium bg-emerald-50 p-3 rounded-md border border-emerald-200'>
                    <CheckCircle2 size={18} className='text-primary' />
                    Foto bukti berhasil diunggah! AI siap menganalisa.
                </div>
            )}

            <DescriptionTextarea value={description} onChange={setDescription} />

            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2 border-t border-zinc-200'>

                <div className='flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start'>
                    <ShieldCheck size={20} className='fill-[#0A6F66] text-white' />
                    <span className='text-xs font-normal text-zinc-600'>
                        Laporan akan diverifikasi dalam 24 jam
                    </span>
                </div>

                <div className='flex items-center gap-3 w-full sm:w-auto justify-end'>
                    <Button
                        variant='ghost'
                        className='font-bold text-[#181C1C] hover:bg-zinc-100 w-full rounded-md sm:w-auto p-6 '
                        isDisabled={isSubmitting}
                    >
                        Batal
                    </Button>

                    <Button
                        className={`font-bold text-sm transition-all duration-500 w-full rounded-md sm:w-auto p-6 ${isSubmitting
                            ? 'bg-[#0A6F66] text-white'
                            : 'bg-[#0A6F66] text-white hover:bg-[#07534c]'
                            }`}
                        onPress={handleOpenConfirmation}
                        isDisabled={isSubmitting || !imageUrl}
                    >
                        {isSubmitting ? renderLoadingContent() : 'Kirim Laporan'}
                    </Button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onConfirm={handleConfirmSubmit}
            />

        </div>
    );
}