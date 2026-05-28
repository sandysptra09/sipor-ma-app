// api/helpers/buildings/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {

        const buildings = await prisma.$queryRaw<
            { building: string }[]
        >`
            SELECT DISTINCT
                SUBSTRING_INDEX(building, ' ', 2) AS building
            FROM Room
            WHERE building IS NOT NULL
              AND building != ''
            ORDER BY building ASC
        `;

        return NextResponse.json(
            {
                message: 'Berhasil mengambil list building',

                data: buildings.map((item) => item.building),
            },
            {
                status: 200,
            }
        );

    } catch (error) {

        console.error('GET BUILDINGS ERROR:', error);

        return NextResponse.json(
            {
                message: 'Terjadi kesalahan server',
            },
            {
                status: 500,
            }
        );
    }
}