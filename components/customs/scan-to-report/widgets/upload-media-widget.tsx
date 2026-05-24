'use client';

import { useState, useRef } from 'react';
import { Label, Description } from '@heroui/react';
import { UploadDropzone } from '@/lib/uploadthing';
import { useUploadThing } from '@/lib/uploadthing';
import { Info, CloudUpload, X, Loader2 } from 'lucide-react';

interface UploadMediaWidgetProps {
    onUploadSuccess: (url: string) => void;
}

export default function UploadMediaWidget({ onUploadSuccess }: UploadMediaWidgetProps) {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { startUpload, isUploading } = useUploadThing('imageUploader', {
        onClientUploadComplete: (res) => {
            if (res && res.length > 0) {
                console.log('Upload berhasil:', res[0].ufsUrl);
                onUploadSuccess(res[0].ufsUrl);
            }
        },
        onUploadError: (error: Error) => {
            alert(`Upload Error: ${error.message}`);
            setPreviewUrl(null);
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        startUpload([file]);
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className='w-full flex flex-col gap-2'>
            <Label isRequired className='text-xs font-semibold uppercase tracking-wider text-foreground'>
                Unggah Foto Bukti
            </Label>

            {previewUrl ? (
                <div className='relative w-full h-72 rounded-xl border-2 border-[#A7E9D1] bg-zinc-50 overflow-hidden flex items-center justify-center group shadow-sm'>
                    <img src={previewUrl} alt='Preview Laporan' className='w-full h-full object-contain' />

                    {isUploading ? (
                        <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center backdrop-blur-sm'>
                            <Loader2 className='w-10 h-10 text-white animate-spin mb-3' />
                            <span className='text-white text-sm font-semibold tracking-wide animate-pulse'>Mengunggah Foto...</span>
                        </div>
                    ) : (
                        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm'>
                            <button
                                type='button'
                                onClick={handleRemove}
                                className='bg-red-500 text-white px-5 py-3 rounded-md hover:bg-red-600 transition-transform transform hover:scale-105 shadow-xl flex items-center gap-2'
                            >
                                <X size={20} strokeWidth={3} /> <span className='text-sm font-medium'>Ganti Foto</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className='w-full h-72 border-2 border-dashed border-[#A7E9D1] bg-white rounded-xl hover:bg-[#e6f4f1]/50 hover:border-[#0A6F66] transition-all cursor-pointer flex flex-col items-center justify-center group'
                >
                    <div className='bg-[#e6f4f1] p-4 rounded-full mb-4 group-hover:scale-110 transition-transform'>
                        <CloudUpload className='text-[#0A6F66] w-8 h-8' />
                    </div>
                    <span className='w-full text-center text-[#181C1C] font-semibold text-xs md:text-sm'>
                        Tarik foto ke sini atau klik untuk unggah
                    </span>
                    <span className='text-zinc-500 font-medium text-xs mt-2'>
                        Maksimal 8MB (Format: JPG, JPEG, PNG)
                    </span>
                </div>
            )}

            <input
                type='file'
                accept='image/*'
                className='hidden'
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isUploading}
            />

            {/* <UploadDropzone
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                        console.log('Upload berhasil:', res[0].ufsUrl);
                        onUploadSuccess(res[0].ufsUrl);
                    }
                }}
                onUploadError={(error: Error) => {
                    alert(`Upload Error: ${error.message}`);
                }}

                appearance={{
                    container: 'w-full h-70 p-8 border-2 border-dashed border-[#A7E9D1] bg-white rounded-xl hover:bg-[#e6f4f1]/50 hover:border-primary transition-colors cursor-pointer',
                    uploadIcon: 'text-[#0A6F66] w-12 h-12',
                    label: 'w-full text-[#181C1C] font-semibold text-xs md:text-sm hover:text-[#0A6F66] transition-colors',
                    allowedContent: 'text-zinc-500 font-medium text-xs',
                    button: 'bg-[#0A6F66] text-white font-semibold text-sm px-6 py-2 rounded-lg mt-4 w-full md:w-auto hover:bg-[#07534c] transition-colors',
                }}

                content={{
                    label({ isUploading }) {
                        return isUploading ? 'Mengunggah...' : 'Tarik foto ke sini atau klik untuk unggah';
                    },
                    allowedContent({ isUploading }) {
                        return isUploading ? '' : 'Maksimal 8MB (Format: JPG, JPEG, PNG)';
                    },
                }}
            /> */}

            <div className='flex items-start gap-3 w-full bg-[#f4fbf9] border border-[#A7E9D1]/60 rounded-lg p-3.5 mt-4'>
                <Info size={18} className='text-[#0A6F66] shrink-0 mt-1' />
                <p className='text-xs md:text-sm text-[#0A6F66] font-normal leading-relaxed'>
                    Wajib menyertakan 1 foto bukti. Pastikan foto terlihat jelas agar AI dan tim peninjau dapat menganalisis tingkat kerusakan dengan akurat.
                </p>
            </div>
        </div>
    );
}