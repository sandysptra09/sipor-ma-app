'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle2, RefreshCcw } from 'lucide-react';
import ProfileHeaderCard from './cards/profile-header-card';
import StatCard from './cards/stat-card';
import AccountInfoCard from './cards/account-info-card';
import NotificationCard from './cards/notification-card';
import SecurityForm from './forms/security-form';
import HelpCard from './cards/help-card';

export default function ProfileContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex flex-col w-full gap-6'
        >
            <ProfileHeaderCard />

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full'>
                <StatCard
                    title='Laporan'
                    value={24}
                    subtitle='Total Laporan Diajukan'
                    icon={<FileText size={20} className='text-[#0A6F66]' />}
                />
                <StatCard
                    title='Selesai'
                    value={67}
                    subtitle='Total Laporan Selesai'
                    icon={<CheckCircle2 size={20} className='text-[#0A6F66]' />}
                />
                <StatCard
                    title='Status'
                    value={6}
                    subtitle='Total Laporan Diproses'
                    icon={<RefreshCcw size={20} className='text-[#0A6F66]' />}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-2'>

                <div className='flex flex-col md:col-span-7 gap-6'>
                    <AccountInfoCard />
                    <NotificationCard />
                </div>

                <div className='flex flex-col md:col-span-5 gap-6'>
                    <SecurityForm />
                    <HelpCard />
                </div>
            </div>

        </motion.div>
    );
}