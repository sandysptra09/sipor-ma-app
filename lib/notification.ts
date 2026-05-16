import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher-server';

interface SendNotificationParams {
    userId: string;
    title: string;
    message: string;
    reportId?: string;
}

export async function sendNotification({ userId, title, message, reportId }: SendNotificationParams) {
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

        await pusherServer.trigger(channelName, eventName, notification);

        return notification;
    } catch (error) {
        console.error('Gagal mengirim notifikasi:', error);
        throw error;
    }
}
