'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle2, RefreshCcw } from 'lucide-react';
import ProfileHeaderCard from './cards/profile-header-card';
import StatCard from './cards/stat-card';
import AccountInfoCard from './cards/account-info-card';
import NotificationCard from './cards/notification-card';
import SecurityForm from './forms/security-form';
import HelpCard from './cards/help-card';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { StatisticData, UserProfileData } from './intefaces';
import ImageUploadModal from './modals/image-upload-modal';
import { useUserStore } from '@/store/useUserStore';

export default function ProfileContent() {

    const userId = useUserStore((state) => state.user?.id);
    const [hasHydrated, setHasHydrated] = useState(false);

    const [loading, setLoading] = useState<boolean>(true); 
    const [userData, setUserData] = useState<UserProfileData>();
    const [statisticData, setStatisticData] = useState<StatisticData>();
    const [openUpload, setOpenUpload] = useState<boolean>(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    useEffect(() => {
        if (!hasHydrated || !userId) return;

        const fetchDetailProfile = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/users/me`);
                const data = res.data.data;

                const resStatistic = await api.get(`/dashboard/statistic?userId=${userId}`);

                setStatisticData(resStatistic.data);
                setUserData(data);
            } catch (error) {
                console.error('Gagal mengambil data user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailProfile();
    }, [hasHydrated, userId]); 

    if (!hasHydrated) {
        return null;
    }
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

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full'>
                <StatCard
                    isLoading={loading}
                    title='Laporan'
                    value={statisticData?.total ?? 0}
                    subtitle='Total Laporan Diajukan'
                    icon={<FileText size={20} className='text-[#0A6F66]' />}
                />
                <StatCard
                    isLoading={loading}
                    title='Selesai'
                    value={statisticData?.selesai ?? 0}
                    subtitle='Total Laporan Selesai'
                    icon={<CheckCircle2 size={20} className='text-[#0A6F66]' />}
                />
                <StatCard
                    isLoading={loading}
                    title='Status'
                    value={statisticData?.proses ?? 0}
                    subtitle='Total Laporan Diproses'
                    icon={<RefreshCcw size={20} className='text-[#0A6F66]' />}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-2'>

                <div className='flex flex-col md:col-span-7 gap-6'>
                    <AccountInfoCard
                        isLoading={loading}
                        studyProgram={userData?.studyProgram ?? null}
                        faculty={userData?.faculty ?? null}
                        enrollmentYear={userData?.enrollmentYear ?? null}
                        campusEmail={userData?.campusEmail ?? null}
                    />
                    <NotificationCard />
                </div>

                <div className='flex flex-col md:col-span-5 gap-6'>
                    <SecurityForm />
                    <HelpCard />
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
    );
}