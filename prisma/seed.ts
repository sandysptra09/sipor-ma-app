import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('🌱 Mulai proses seeding database...');

    console.log('⏳ Seeding Admin...');
    const adminEmail = process.env.ADMIN_EMAIL;
    const rawPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !rawPassword) {
        throw new Error('❌ SEEDING GAGAL: ADMIN_EMAIL dan ADMIN_PASSWORD wajib diisi di file .env!');
    }

    const adminPassword = await bcrypt.hash(rawPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            name: 'Admin Sarpras',
        }, 
        create: {
            name: 'Admin Sarpras',
            email: adminEmail,
            nim_nip: '198001012005011001',
            password: adminPassword,
            role: 'ADMIN',
            emailVerified: new Date(),
        },
    });
    console.log('✅ Admin berhasil diproses!');

    console.log('⏳ Menyiapkan data ruangan...');
    const roomsToInsert = [];

    for (let lantai = 1; lantai <= 5; lantai++) {
        for (let ruang = 1; ruang <= 9; ruang++) {
            const kodeLantai = `0${lantai}`;
            const kodeRuang = `00${ruang}`;
            const roomCode = `20.4B.${kodeLantai}.${kodeRuang}`;
            
            roomsToInsert.push({
                code: roomCode,
                name: 'Ruang Kuliah Teori',
                building: `Gedung Baru Lantai ${lantai}`
            });
        }
    }

    const gedungERooms = [
        { code: '20.4E.03.008', name: 'Ruang Kuliah Teori', building: 'Gedung E Lantai 3' },
        { code: '20.4E.03.007', name: 'Ruang Kuliah Teori', building: 'Gedung E Lantai 3' },
        { code: '20.4E.02.006', name: 'Lab Kom RPL', building: 'Gedung E Lantai 2' },
        { code: '20.4E.02.005', name: 'Lab Kom iMac', building: 'Gedung E Lantai 2' },
        { code: '20.4E.02.004', name: 'Lab Kom PGPAUD', building: 'Gedung E Lantai 2' },
        { code: '20.4E.02.003', name: 'Lab Kom PGSD', building: 'Gedung E Lantai 2' },
    ];

    roomsToInsert.push(...gedungERooms);

    console.log('⏳ Mengirim data ruangan ke database...');
    const roomResult = await prisma.room.createMany({
        data: roomsToInsert,
        skipDuplicates: true, 
    });
    console.log(`✅ Berhasil memproses ${roomsToInsert.length} ruangan (Ruangan baru di-insert: ${roomResult.count})!`);

    console.log('✅ SELURUH PROSES SEEDING SELESAI!');
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