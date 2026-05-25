"use client";

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import ProfileHeaderCard from '@/components/customs/profile/cards/profile-header-card';
import AccountInfoCard from '@/components/customs/profile/cards/account-info-card';
import SecurityForm from '@/components/customs/profile/forms/security-form';
import LogActivityItemsCard from '@/components/customs/admin/log-activity-items-card';
import { api } from '@/lib/axios';
import { UserProfileData } from './intefaces';
import ImageUploadModal from '@/components/customs/profile/modals/image-upload-modal';

export default function AdminProfilePage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserProfileData>();
    const [openUpload, setOpenUpload] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        const fetchDetailProfile = async () => {
            try {
                const res = await api.get(`/users/me`);
                const data = res.data.data;

                console.log(data);
                setUserData(data);
            } catch (error) {
                console.error('Gagal mengambil data user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailProfile();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex flex-col w-full gap-6'
        >
            <ProfileHeaderCard
                isLoading={loading}
                fullName={userData?.name}
                img={userData?.image}
                role={userData?.role}
                email={userData?.email}
                createdAt={userData?.createdAt}
                setOpenUpload={setOpenUpload}
            />

            <div className='grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-2'>

                <div className='flex flex-col md:col-span-7 gap-6'>
                    {/* <AccountInfoCard /> */}
                    <LogActivityItemsCard
                        logs={userData?.activityLogs}
                        isLoading={loading}
                    />
                </div>

                <div className='flex flex-col md:col-span-5 gap-6'>
                    <SecurityForm />
                </div>
            </div>

            <ImageUploadModal
                isOpen={openUpload}
                onOpenChange={setOpenUpload}
                onUploadSuccess={(url) => {
                    setUserData((prev) => {
                        if (!prev) return prev;

                        return {
                            ...prev,
                            image: url,
                        };
                    });
                }} />
        </motion.div>
    )
}
