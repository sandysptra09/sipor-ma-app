import React from 'react'

interface SidebarItemProps {
    label: string;
    href?: string;
    isActive?: boolean;
    onClick?: () => void;
}

export default function SidebarItem({label, href, isActive = false, onClick}:SidebarItemProps) {
  return (
    <a href={href} onClick={onClick} dir='rtl' className={` w-full border-l-4 px-4 py-3 text-left transition-all rounded-s-lg font-medium hover:bg-muted cursor-pointer
        ${isActive
          ? "border-primary text-primary bg-white"
          : "border-transparent text-gray-500"}`
        }
    >
      {label}
    </a>
  )
}
