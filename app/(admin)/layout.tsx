"use client";

import React from "react";
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
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman admin');

    const pathname = usePathname();
    const pathnames = pathname ? pathname.split('/').filter((x) => x) : [];
    const formatString = (str: string) => {
        return str
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="bg-white/80">
                    <header className="sticky z-[50] top-0 flex h-16 shrink-0 justify-between md:justify-end items-center gap-4 px-4 bg-white [box-shadow:0_4px_2px_-2px_rgba(0,0,0,0.08)]">
                        <SidebarTrigger className="-ml-1 flex md:hidden" />
                        <div className="flex gap-4 items-center">
                            <Link href={`/admin/notifications`} className="text-primary">
                                <Bell size={18} />
                            </Link>
                            <Link href={`/admin/profile`} className="w-fit flex gap-2 items-center">
                                <div className="text-right hidden md:flex flex-col">
                                    <p className="text-sm font-semibold text-black">Admin</p>
                                    <p className="text-xs text-gray-500">SIPOR-MA Admin</p>
                                </div>
                                <div className=" bg-gray-600 h-[35px] w-[35px] rounded-full">

                                </div>
                            </Link>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 inset-shadow-sm">
                        <div className="hidden md:flex gap-2 items-center" >
                            <SidebarTrigger className="-ml-1 hidden md:flex" />
                            <Separator
                                orientation="vertical"
                                className="hidden md:flex mr-2 data-vertical:h-4 data-vertical:self-auto"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {pathnames.length > 0 && pathnames.map((value, index) => {
                                        const href = `/${pathnames.slice(0, index + 1).join('/')}`;

                                        const isLast = index === pathnames.length - 1;

                                        const label = value.toLowerCase() === 'admin' ? 'Admin Dashboard' : formatString(value);

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