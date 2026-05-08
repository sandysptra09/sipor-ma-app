'use client';

import { Label, Description } from '@heroui/react';
import { UploadDropzone } from '@/lib/uploadthing';
import { Info } from 'lucide-react';

interface UploadMediaWidgetProps {
    onUploadSuccess: (url: string) => void;
}

export default function UploadMediaWidget({ onUploadSuccess }: UploadMediaWidgetProps) {
    return (
        <div className='w-full flex flex-col gap-2'>
            <Label isRequired className='text-xs font-semibold uppercase tracking-wider text-foreground'>
                Unggah Foto Bukti
            </Label>

            <UploadDropzone
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
                    button: 'hidden',
                }}

                content={{
                    label({ isUploading }) {
                        return isUploading ? 'Mengunggah...' : 'Tarik foto ke sini atau klik untuk unggah';
                    },
                    allowedContent({ isUploading }) {
                        return isUploading ? '' : 'Maksimal 8MB (Format: JPG, JPEG, PNG)';
                    },
                }}
            />

            <div className='flex items-start gap-3 w-full bg-[#f4fbf9] border border-[#A7E9D1]/60 rounded-lg p-3.5 mt-4'>
                <Info size={18} className='text-[#0A6F66] shrink-0 mt-1' />
                <p className='text-xs md:text-sm text-[#0A6F66] font-normal leading-relaxed'>
                    Wajib menyertakan 1 foto bukti. Pastikan foto terlihat jelas agar AI dan tim peninjau dapat menganalisis tingkat kerusakan dengan akurat.
                </p>
            </div>
        </div>
    );
}