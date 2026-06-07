'use client';

import { Card, TextField, Label, Input, Skeleton, Button } from '@heroui/react';
import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { toast } from '@heroui/react';

interface AccountInfoCardProps {
    studyProgram: string | null;
    faculty: string | null;
    enrollmentYear: number | null;
    campusEmail: string | null;
    isLoading?: boolean;
    onUpdateSuccess?: (newData: any) => void;
}

export default function AccountInfoCard({
    campusEmail,
    studyProgram,
    faculty,
    enrollmentYear,
    isLoading = false,
    onUpdateSuccess
}: AccountInfoCardProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        campusEmail: campusEmail ?? '',
        studyProgram: studyProgram ?? '',
        faculty: faculty ?? '',
        enrollmentYear: enrollmentYear?.toString() ?? '',
    });

    useEffect(() => {
        setFormData({
            campusEmail: campusEmail ?? '',
            studyProgram: studyProgram ?? '',
            faculty: faculty ?? '',
            enrollmentYear: enrollmentYear?.toString() ?? '',
        });
    }, [campusEmail, studyProgram, faculty, enrollmentYear]);

    const sanitizeHTML = (value: any) => {
        if (!value) return '';
        const strValue = typeof value === 'string' ? value : '';
        return strValue.replace(/[<>]/g, '');
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                campusEmail: formData.campusEmail,
                studyProgram: formData.studyProgram,
                faculty: formData.faculty,
                enrollmentYear: formData.enrollmentYear ? parseInt(formData.enrollmentYear, 10) : null
            };

            await api.patch('/users/me', payload);

            toast.success('Informasi akun berhasil diperbarui!');
            setIsEditing(false);

            if (onUpdateSuccess) {
                onUpdateSuccess(payload);
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Gagal memperbarui informasi akun';
            toast.danger(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderSkeletonField = () => (
        <div className='w-full flex flex-col gap-1.5'>
            <Skeleton className="h-4 w-1/3 rounded-md" />
            <Skeleton className="h-11 w-full rounded-lg" />
        </div>
    );

    return (
        <Card className='w-full bg-white shadow-sm border-none rounded-2xl p-6'>
            <div className='mb-4 flex justify-between items-center'>
                <h3 className='font-semibold text-lg text-[#181C1C]'>Informasi Akun</h3>

                {!isLoading && (
                    isEditing ? (
                        <div className="flex gap-2">
                            <Button size="sm" onPress={() => setIsEditing(false)} isDisabled={isSubmitting}>
                                Batal
                            </Button>
                            <Button size="sm" className="bg-[#0A6F66] text-white" onPress={handleSave} isDisabled={isSubmitting}>
                                Simpan
                            </Button>
                        </div>
                    ) : (
                        <Button size="sm" onPress={() => setIsEditing(true)}>
                            Edit
                        </Button>
                    )
                )}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5'>
                {isLoading ? (
                    <>
                        {renderSkeletonField()}
                        {renderSkeletonField()}
                        {renderSkeletonField()}
                        {renderSkeletonField()}
                    </>
                ) : (
                    <>
                        <TextField isReadOnly={!isEditing} className='w-full flex flex-col gap-1.5' name='email' value={formData.campusEmail} onChange={(v) => setFormData({ ...formData, campusEmail: sanitizeHTML(v) })}>
                            <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Email Kampus</Label>
                            {/* Tambahan caret-transparent dan focus:outline-none */}
                            <Input className={`bg-zinc-50 border border-zinc-200 text-foreground font-semibold text-[13px] px-4 h-11 rounded-lg shadow-none transition-colors ${!isEditing ? 'cursor-not-allowed caret-transparent focus:outline-none' : 'bg-white border-[#0A6F66]/30 focus:border-[#0A6F66]'}`} />
                        </TextField>

                        <TextField isReadOnly={!isEditing} className='w-full flex flex-col gap-1.5' name='prodi' value={formData.studyProgram} onChange={(v) => setFormData({ ...formData, studyProgram: sanitizeHTML(v) })}>
                            <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Program Studi</Label>
                            <Input className={`bg-zinc-50 border border-zinc-200 text-foreground font-semibold text-[13px] px-4 h-11 rounded-lg shadow-none transition-colors ${!isEditing ? 'cursor-not-allowed caret-transparent focus:outline-none' : 'bg-white border-[#0A6F66]/30 focus:border-[#0A6F66]'}`} />
                        </TextField>

                        <TextField isReadOnly={!isEditing} className='w-full flex flex-col gap-1.5' name='fakultas' value={formData.faculty} onChange={(v) => setFormData({ ...formData, faculty: sanitizeHTML(v) })}>
                            <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Fakultas</Label>
                            <Input className={`bg-zinc-50 border border-zinc-200 text-foreground font-semibold text-[13px] px-4 h-11 rounded-lg shadow-none transition-colors ${!isEditing ? 'cursor-not-allowed caret-transparent focus:outline-none' : 'bg-white border-[#0A6F66]/30 focus:border-[#0A6F66]'}`} />
                        </TextField>

                        <TextField 
                            isReadOnly={!isEditing} 
                            className='w-full flex flex-col gap-1.5' 
                            name='angkatan'
                            value={formData.enrollmentYear}
                            onChange={(v) => setFormData({ ...formData, enrollmentYear: sanitizeHTML(v) })}
                        >
                            <Label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>Tahun Angkatan</Label>
                            <Input
                                type="number"
                                className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-zinc-50 border border-zinc-200 text-foreground font-semibold text-[13px] md:text-md px-4 h-11 rounded-lg shadow-none transition-colors ${!isEditing ? 'cursor-not-allowed caret-transparent focus:outline-none' : 'bg-white border-[#0A6F66]/30 focus:border-[#0A6F66]'}`}
                            />
                        </TextField>
                    </>
                )}
            </div>
        </Card>
    );
}