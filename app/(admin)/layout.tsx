"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/layout/admin/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getSession } from "next-auth/react";
import AdminNotification from "@/components/layout/admin/admin-notification";
import { Toast } from '@heroui/react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman admin');

    const [adminName, setAdminName] = useState('Admin');

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            if (session?.user?.name) {
                setAdminName(session.user.name);
            }
        };
        fetchSession();
    }, []);

    const pathname = usePathname();
    const pathnames = pathname ? pathname.split('/').filter((x) => x) : [];
    const formatString = (str: string) => {
        return str
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const userInitial = adminName.charAt(0).toUpperCase();

    return (
        <>
            <SidebarProvider>

                <Toast.Provider placement='top end' />

                <AppSidebar />
                <SidebarInset className="bg-white/80 w-full min-w-0">
                    <header className="sticky z-50 top-0 flex h-16 shrink-0 justify-between md:justify-end items-center gap-4 px-4 bg-white [box-shadow:0_4px_2px_-2px_rgba(0,0,0,0.08)]">
                        <SidebarTrigger className="-ml-1 flex md:hidden" />

                        <div className="flex items-center">

                            <AdminNotification />

                            <Link href={`/admin/profile`} className="w-fit flex gap-2 items-center">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-black">{adminName}</p>
                                    <p className="text-xs text-gray-500">SIPOR-MA Admin</p>
                                </div>
                                <div className=" bg-gray-600 h-8.75 w-8.75 rounded-full">
                                    <span className="flex items-center justify-center h-full text-white font-bold">
                                        {userInitial}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 inset-shadow-sm ">
                        <div className="flex gap-2 items-center" >
                            <SidebarTrigger className="-ml-1 hidden md:flex" />
                            <Separator
                                orientation="vertical"
                                className=" mr-2 data-vertical:h-4 data-vertical:self-auto"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {pathnames.length > 0 && pathnames.map((value, index) => {
                                        const href = `/${pathnames.slice(0, index + 1).join('/')}`;

                                        const isLast = index === pathnames.length - 1;

                                        const decodedValue = decodeURIComponent(value);

                                        const label =
                                            decodedValue.toLowerCase() === 'admin'
                                                ? 'Admin Dashboard'
                                                : formatString(decodedValue);

                                        return (
                                            <React.Fragment key={href}>
                                                {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}

                                                <BreadcrumbItem>
                                                    {isLast ? (
                                                        <BreadcrumbPage>{label}</BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink asChild>
                                                            <Link href={href}>{label}</Link>
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            </React.Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}