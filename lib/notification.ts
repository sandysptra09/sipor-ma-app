import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher-server';

interface SendNotificationParams {
    userId: string;
    title: string;
    message: string;
    reportId?: string;
    reportNumber?: string;
}

export async function sendNotification({ userId, title, message, reportId, reportNumber }: SendNotificationParams) {
    try {
        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                reportId,
            },
        });

        const channelName = `user-${userId}-notifications`;
        const eventName = 'new-notification';

        const payload = {
            ...notification,
            report: reportNumber ? { reportNumber } : null
        };

        await pusherServer.trigger(channelName, eventName, notification);

        return notification;
    } catch (error) {
        console.error('Gagal mengirim notifikasi:', error);
        throw error;
    }
}
