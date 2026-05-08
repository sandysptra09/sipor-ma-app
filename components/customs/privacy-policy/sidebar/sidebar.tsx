'use client';
import React from 'react'
import { useState } from 'react';
import SidebarItem from './sidebar-item'
import HelpAction from './help-action';

const sections = [
    { id: 'pengumpulan', label: 'Pengumpulan Data' },
    { id: 'penggunaan', label: 'Penggunaan Informasi' },
    { id: 'keamanan', label: 'Keamanan Data' },
    { id: 'hak', label: 'Hak Pengguna' },
    { id: 'perubahan', label: 'Perubahan Kebijakan' },
];



export default function Sidebar() {
  const [activeId, setActiveId] = useState('pengumpulan');

  return (
    <aside className='flex flex-col gap-6'>
        <h5 className="text-sm font-semibold uppercase text-gray-500">
        Daftar Isi
        </h5>
        
        <div className="flex flex-col gap-1">
                {sections.map(({ id, label }) => (
                    <SidebarItem
                        key={id}
                        label={label}
                        href={`#${id}`}
                        isActive={activeId === id}
                        onClick={() => setActiveId(id)}
                    />
                ))}
        </div>

        <HelpAction title='Butuh Bantuan?' description='Hubungi tim privasi kami jika Anda memiliki pertanyaan.' email='privacy@sipor-ma.ac.id'/>

            
    </aside>
  )
}
