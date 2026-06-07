import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const publicRoutes = [
    '/', 
    '/help-center', 
    '/privacy-policy', 
    '/terms-and-conditions', 
    '/contact'
];

const authRoutes = ['/login', '/sign-up', '/forget-password', '/reset-password'];

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const role = (req.auth?.user as any)?.role;

    const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = nextUrl.pathname.startsWith('/admin');

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            const redirectUrl = role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
            return NextResponse.redirect(new URL(redirectUrl, nextUrl));
        }
        return NextResponse.next();
    }

    if (isLoggedIn && nextUrl.pathname === '/') {
        const redirectUrl = role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
        return NextResponse.redirect(new URL(redirectUrl, nextUrl));
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', nextUrl));
    }

    if (isAdminRoute && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};