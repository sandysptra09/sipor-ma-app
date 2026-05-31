'use client';

import React, { useState } from 'react'
import { toast } from '@heroui/react'
import { api } from '@/lib/axios'

import CustomButtonContact from './custom-button-contact'
import CustomInputTextArea from '../inputs/custom-input-textarea'
import CustomInputTextfield from '../inputs/custom-input-textfield'

export default function CustomCardContact() {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.danger('Gagal', {
        description: <span className='text-zinc-600'>Semua field wajib diisi!</span>
      });
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/contact', formData);

      toast.success('Berhasil Terkirim!', {
        description: <span className='text-zinc-600'>Pesan kamu udah masuk ke email admin SIPOR-MA.</span>
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.danger('Error', {
        description: <span className='text-zinc-600'>Gagal mengirim pesan, coba lagi nanti.</span>
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='rounded-lg w-full bg-card shadow-md pt-12 px-12 pb-16 lg:w-1/2'>
      <h2 className='mb-3 text-2xl md:text-3xl font-heading font-bold text-primary'>Kirim Pesan</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <CustomInputTextfield
          label='FULL NAME'
          placeholder='Nama Lengkap Anda'
          type='text'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <CustomInputTextfield
          label='EMAIL ADDRESS'
          placeholder='email@kampus.ac.id'
          type='email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <CustomInputTextArea
          label='MESSAGE'
          placeholder='Tuliskan pesan anda disini'
          rows={4}
          value={formData.message}
          onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
          required
        />

        <CustomButtonContact name='Kirim Pesan' isLoading={isLoading} />
      </form>

    </div>
  )
}
