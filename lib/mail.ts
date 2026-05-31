import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

interface SendEmailParams {
    to: string;
    name: string;
    reportNumber: string;
    title: string;
    newStatus: string;
}

interface SendContactEmailParams {
    name: string;
    email: string;
    message: string;
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'VERIFIED': return 'Sedang Diverifikasi Admin';
        case 'IN_PROGRESS': return 'Sedang Diproses/Diperbaiki Teknisi';
        case 'RESOLVED': return 'Selesai Diperbaiki';
        case 'REJECTED': return 'Ditolak';
        case 'CANCELED': return 'Dibatalkan';
        default: return status;
    }
};

export async function sendStatusUpdateEmail({ to, name, reportNumber, title, newStatus }: SendEmailParams) {
    const statusText = getStatusText(newStatus);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const reportLink = `${appUrl}/dashboard/report-detail/${reportNumber.replace('#', '')}`;

    const htmlTemplate = `
    <div style="font-family: Poppins; max-width: 600px; margin: 0 auto; border: 1px solid #EAEAED; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0A6F66; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">SIPOR-MA</h1>
            <p style="color: #A7E9D1; margin: 5px 0 0 0; font-size: 14px;">Sistem Pelaporan Fasilitas Kampus dan Mahasiswa</p>
        </div>
        <div style="padding: 30px 20px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #181C1C;">Halo, <strong>${name}</strong>!</p>
            <p style="font-size: 15px; color: #4B5563; line-height: 1.5;">
                Ada pembaruan informasi untuk laporan kerusakan fasilitas yang kamu ajukan. Berikut adalah rinciannya:
            </p>
            
            <div style="background-color: #F0F4F3; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0A6F66;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563;">Nomor Laporan: <strong style="color: #0A6F66;">${reportNumber}</strong></p>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563;">Detail: <strong>${title}</strong></p>
                <p style="margin: 0; font-size: 14px; color: #4B5563;">Status Saat Ini: <strong style="color: #0A6F66; background-color: #A7E9D1; padding: 4px 8px; border-radius: 4px;">${statusText}</strong></p>
            </div>
            
            <p style="font-size: 15px; color: #4B5563; line-height: 1.5;">
                Silakan cek dashboard SIPOR-MA untuk melihat detail perkembangan laporan dan dokumentasi (jika sudah selesai).
            </p>
            
            <div style="text-align: center; margin-top: 25px; margin-bottom: 10px;">
                <a href="${reportLink}" style="display: inline-block; padding: 12px 24px; background-color: #0A6F66; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Cek Detail Laporan</a>
            </div>
        </div>
        <div style="background-color: #F9FAFB; padding: 15px; text-align: center; border-top: 1px solid #EAEAED;">
            <p style="font-size: 12px; color: #9CA3AF; margin: 0;">Email ini dibuat otomatis oleh sistem SIPOR-MA.<br/>Mohon tidak membalas email ini.</p>
        </div>
    </div>
    `;

    try {
        const info = await transporter.sendMail({
            from: '"SIPOR-MA Support" <' + process.env.EMAIL_USER + '>',
            to: to,
            subject: `Update Laporan ${reportNumber}: ${statusText}`,
            html: htmlTemplate,
        });

        console.log('[EMAIL SENDER] Berhasil terkirim ke:', to);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('[EMAIL SENDER ERROR] Gagal mengirim email:', error);
        return { success: false, error };
    }
}

export async function sendContactEmail({ name, email, message }: SendContactEmailParams) {
    const htmlTemplate = `
    <div style="font-family: Poppins; max-width: 600px; margin: 0 auto; border: 1px solid #EAEAED; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0A6F66; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Pesan Baru dari Form Kontak SIPOR-MA</h2>
        </div>
        <div style="padding: 30px 20px; background-color: #ffffff;">
            <p style="font-size: 14px; color: #4B5563;"><strong>Nama Pengirim:</strong> ${name}</p>
            <p style="font-size: 14px; color: #4B5563;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0A6F66;">${email}</a></p>
            <hr style="border: none; border-top: 1px solid #EAEAED; margin: 20px 0;" />
            <p style="font-size: 14px; color: #4B5563;"><strong>Isi Pesan:</strong></p>
            <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; font-size: 14px; color: #181C1C; white-space: pre-wrap; line-height: 1.6;">
                ${message}
            </div>
        </div>
    </div>
    `;

    try {
        const info = await transporter.sendMail({
            from: '"SIPOR-MA Contact" <' + process.env.EMAIL_USER + '>',
            to: process.env.EMAIL_USER, 
            replyTo: email, 
            subject: `Pesan Bantuan dari ${name}`,
            html: htmlTemplate,
        });
        
        console.log('[CONTACT EMAIL] Berhasil terkirim dari:', email);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('[CONTACT EMAIL ERROR] Gagal mengirim pesan:', error);
        return { success: false, error };
    }
}