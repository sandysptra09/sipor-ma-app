'use client';
import React from 'react'
import { useState } from 'react';
import SidebarItemTerms from './sidebar-item-terms';


const sections = [
    { id: 'ketentuan', label: 'Ketentuan Umum' },
    { id: 'keamanan', label: 'Keamanan Akun' },
    { id: 'prosedur', label: 'Prosedur Pelaporan' },
    { id: 'kebijakan', label: 'Kebijakan Privasi' },
    { id: 'batasan', label: 'Batasan Tanggung Jawab' },
    { id: 'perubahan', label: 'Perubahan Ketentuan' },
];



export default function SidebarTerms() {
  const [activeId, setActiveId] = useState('pengumpulan');

  return (
    <aside className='flex flex-col gap-6'>
        <h5 className="text-sm font-semibold uppercase text-gray-500">
        Daftar Isi
        </h5>
        
        <div className="flex flex-col gap-1">
                {sections.map(({ id, label }) => (
                    <SidebarItemTerms
                        key={id}
                        label={label}
                        href={`#${id}`}
                        isActive={activeId === id}
                        onClick={() => setActiveId(id)}
                    />
                ))}
        </div>
    </aside>
  )
}
