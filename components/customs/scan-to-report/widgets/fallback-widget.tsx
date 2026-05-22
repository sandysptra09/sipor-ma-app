'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, Input, TextField, Label, Separator, toast } from '@heroui/react';
import { ImagePlus, ArrowRight, RefreshCcw } from 'lucide-react';
import jsQR from 'jsqr';

interface FallbackWidgetProps {
    onSuccess: (result: string) => void;
}

export default function FallbackWidget({ onSuccess }: FallbackWidgetProps) {
    const [manualCode, setManualCode] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleManualSubmit = () => {
        if (manualCode.trim().length > 0) {
            onSuccess(manualCode.trim());
        }
    };

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        console.log('File dipilih:', file.name);

        const img = new window.Image();
        img.src = objectUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            if (!ctx) {
                toast.danger('Gagal memproses sistem gambar.');
                return;
            }

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'attemptBoth',
            });

            if (code && code.data) {
                onSuccess(code.data);
            } else {
                toast.warning('QR Code tidak terdeteksi pada gambar. Pastikan gambar jelas atau gunakan input manual.');
            }
        };

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (!isMounted) return null;

    return (
        <div className='w-full flex flex-col md:pb-0'>

            <div className='w-full max-w-md flex flex-col gap-6 md:gap-8 mx-auto'>

                <div className='hidden md:flex flex-col gap-4'>
                    {previewUrl && (
                        <div className='relative w-full h-40 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center overflow-hidden group'>
                            <img src={previewUrl} alt='Preview QR' className='max-h-full max-w-full object-contain p-2' />
                            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm'>
                                <Button className='bg-white text-[#0A6F66] font-bold shadow-md' onClick={handleFileUploadClick}>
                                    <RefreshCcw size={16} className='mr-1' /> Ganti Foto
                                </Button>
                            </div>
                        </div>
                    )}
                    <Button
                        variant='outline'
                        className='w-full h-12 border-2 border-zinc-200 text-[#181C1C] font-semibold text-sm hover:border-[#0A6F66] hover:bg-[#e6f4f1] transition-all flex items-center justify-center gap-2'
                        onClick={handleFileUploadClick}
                    >
                        <ImagePlus size={18} className='text-[#0A6F66]' />
                        {previewUrl ? 'Ganti Foto QR dari Galeri' : 'Upload Foto QR dari Galeri'}
                    </Button>
                    <input type='file' accept='image/*' className='hidden' ref={fileInputRef} onChange={handleFileChange} />
                </div>

                <div className='hidden md:flex items-center gap-4 w-full'>
                    <Separator className='flex-1 bg-zinc-200' />
                    <span className='text-xs font-semibold text-muted-foreground uppercase tracking-widest'>Atau</span>
                    <Separator className='flex-1 bg-zinc-200' />
                </div>

                <TextField className='w-full flex flex-col gap-2'>
                    <Label className='text-sm font-medium text-[#181C1C] gap-2'>
                        Gagal scan? Masukkan kode manual
                    </Label>
                    <div className='flex items-center gap-2'>
                        <Input
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value)}
                            placeholder='Contoh: 20.4B.05.005'
                            className='w-full h-11 px-3 font-medium text-[#181C1C] border-2 border-zinc-200 rounded-lg placeholder:text-muted-foreground placeholder:text-sm hover:border-[#0A6F66] focus:border-[#0A6F66] focus:outline-none transition-colors'
                        />
                        <Button
                            className='bg-[#0A6F66] text-white h-11 w-11 shrink-0 rounded-lg hover:bg-[#07534c] p-0 flex items-center justify-center'
                            onClick={handleManualSubmit}
                            isDisabled={manualCode.trim().length === 0}
                        >
                            <ArrowRight size={20} strokeWidth={2.5} />
                        </Button>
                    </div>
                </TextField>

            </div>
        </div>
    );
}