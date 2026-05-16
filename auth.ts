import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: 'Email atau NIM', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                
                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error('Email/NIM dan Password wajib diisi.');
                }

                const identifier = credentials.identifier as string;
                const password = credentials.password as string;

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: identifier },
                            { nim_nip: identifier }
                        ]
                    }
                });

                if (!user || !user.password) {
                    throw new Error('Akun tidak ditemukan atau silakan gunakan Login via Google.');
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    throw new Error('Password salah.');
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role, 
                };
            }
        })
    ],
});