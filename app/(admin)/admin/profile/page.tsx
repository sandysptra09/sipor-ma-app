"use client";

import React from 'react'
import { motion } from 'framer-motion';
import ProfileHeaderCard from '@/components/customs/profile/cards/profile-header-card';
import AccountInfoCard from '@/components/customs/profile/cards/account-info-card';
import NotificationCard from '@/components/customs/profile/cards/notification-card';
import SecurityForm from '@/components/customs/profile/forms/security-form';
import HelpCard from '@/components/customs/profile/cards/help-card';
import LogActivityItemsCard from '@/components/customs/admin/log-activity-items-card';

export default function AdminProfilePage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex flex-col w-full gap-6'
        >
            <ProfileHeaderCard />

            <div className='grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-2'>

                <div className='flex flex-col md:col-span-7 gap-6'>
                    <AccountInfoCard />
                    <LogActivityItemsCard/>
                </div>

                <div className='flex flex-col md:col-span-5 gap-6'>
                    <SecurityForm />
                    </div>
            </div>

        </motion.div>
    )
}
