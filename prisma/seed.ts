import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('🌱 Mulai proses seeding database...');

    const adminEmail = process.env.ADMIN_EMAIL;
    const rawPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !rawPassword) {
        throw new Error('❌ SEEDING GAGAL: ADMIN_EMAIL dan ADMIN_PASSWORD wajib diisi di file .env!');
    }

    const adminPassword = await bcrypt.hash(rawPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {}, 
        create: {
            name: 'Admin Sarpras',
            email: adminEmail,
            nim_nip: '198001012005011001',
            password: adminPassword,
            role: 'ADMIN',
            emailVerified: new Date(),
        },
    });

    console.log('✅ Seeding selesai!');
    console.log(`👤 Admin Email: ${admin.email}`);
    console.log('🔒 Password: [TERSEMBUNYI AMAN DI .ENV]');
}

main()
    .catch((e) => {
        console.error('❌ Terjadi kesalahan saat seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });