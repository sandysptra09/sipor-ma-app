"use client"

import * as React from "react"

import { SearchForm } from "@/components/layout/admin/search-form"
import { VersionSwitcher } from "@/components/layout/admin/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Bell, ChartColumnIncreasing, ChevronRightIcon, DoorOpen, LayoutDashboard, User } from "lucide-react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import SipormaLogo from '@/public/assets/icons/siporma-icon.svg';
import Image from "next/image"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Laporan",
      url: "/admin/report-management",
      icon: ChartColumnIncreasing
    },
  ],
  navPersonal: [
    {
      title: "Notifikasi",
      url: "/admin/notifications",
      icon: Bell
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: User
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-white">
        <div className="flex items-center justify-center w-ful h-12 text-center">
          <Image
            src='/assets/images/siporma-icon.svg'
            alt='Logo SIPOR-MA'
            width={32}
            height={32}
            className='h-7 w-7 object-contain md:h-8 md:w-8'
          />
          <span className='font-heading text-lg font-bold tracking-wider text-primary md:text-xl'>
            SIPOR-MA
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0 px-2 bg-white">

        <SidebarGroupLabel className="mt-3 uppercase">reports</SidebarGroupLabel>
        <SidebarMenu>
          {data.navMain.map((item) => {
            const isActive = item.url === '/admin/dashboard'
              ? pathname === item.url
              : pathname?.startsWith(item.url);
            return (
              <SidebarMenuItem className="" key={item.title}>
                <SidebarMenuButton className="text-slate-500 hover:text-primary py-4 data-[active=true]:text-primary data-[active=true]:bg-primary/10" asChild isActive={isActive}>
                  <a className="text-gray-500 hover:text-primary" href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}

          <SidebarGroupLabel className="mt-3 uppercase">preferences</SidebarGroupLabel>
          {data.navPersonal.map((item) => {
            const isActive = item.url === '/admin/dashboard'
              ? pathname === item.url
              : pathname?.startsWith(item.url);
            return (
              <SidebarMenuItem className="" key={item.title}>
                <SidebarMenuButton className="text-slate-500 hover:text-primary py-4 data-[active=true]:text-primary data-[active=true]:bg-primary/10" asChild isActive={isActive}>
                  <a className="text-gray-500 hover:text-primary" href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="" key={`logout`}>
            <SidebarMenuButton className="text-slate-500 hover:text-primary py-4 flex justify-center border data-[active=true]:text-primary data-[active=true]:bg-primary/10" asChild>
              <a className="text-gray-500 hover:text-primary" href={`#`}>
                <DoorOpen />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
