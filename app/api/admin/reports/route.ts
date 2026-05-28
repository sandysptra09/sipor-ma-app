import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { Prisma, Status } from '@/lib/generated/prisma/client';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);

        // pagination
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 5;

        const skip = (page - 1) * limit;

        // filter
        const search = searchParams.get('search') || '';
        const keyword = searchParams.get('keyword') || ''; 
        const building = searchParams.get('building') || '';
        const status = searchParams.get('status') || '';
        const category = searchParams.get('category') || '';

        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // query
        const where: Prisma.ReportWhereInput = {
            AND: [
                search
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: search,
                                  },
                              },
                              {
                                  description: {
                                      contains: search,
                                  },
                              },
                              {
                                  reportNumber: {
                                      contains: search,
                                  },
                              },
                          ],
                      }
                    : {},

                // filter keyword baru
                keyword
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: keyword,
                                  },
                              },
                              {
                                  description: {
                                      contains: keyword,
                                  },
                              },
                          ],
                      }
                    : {},

                // filter gedung
                building
                    ? {
                          location: {
                              startsWith: building,
                          },
                      }
                    : {},

                // filter status
                status
                    ? {
                          status: status as Status,
                      }
                    : {},

                // filter category
                category
                    ? {
                          category: {
                              equals: category,
                          },
                      }
                    : {},

                // filter tanggal
                startDate || endDate
                    ? {
                          createdAt: {
                              ...(startDate && {
                                  gte: new Date(startDate),
                              }),
                              ...(endDate && {
                                  lte: new Date(endDate),
                              }),
                          },
                      }
                    : {},
            ],
        };

        // get data
        const [reports, totalReports] = await Promise.all([
            prisma.report.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },

                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    admin: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),

            prisma.report.count({
                where,
            }),
        ]);

        // setup pagination meta data
        const totalPages = Math.ceil(totalReports / limit);

        return NextResponse.json(
            {
                message: 'Berhasil mengambil data reports',

                data: reports,

                pagination: {
                    page,
                    limit,
                    totalData: totalReports,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('GET REPORTS ERROR:', error);

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