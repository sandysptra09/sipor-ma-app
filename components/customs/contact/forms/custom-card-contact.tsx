import React from 'react'

import CustomButtonContact from './custom-button-contact'
import CustomInputTextArea from '../inputs/custom-input-textarea'
import CustomInputTextfield from '../inputs/custom-input-textfield'

export default function CustomCardContact() {
  return (
    <div className='rounded-lg w-full bg-card shadow-md pt-[48px] px-[48px] pb-[64px] lg:w-1/2'>
        <h2 className='mb-3 text-2xl md:text-3xl font-heading font-bold text-primary'>Kirim Pesan</h2>

        <CustomInputTextfield label='FULL NAME' placeholder='Nama Lengkap Anda'/>
        <CustomInputTextfield label='EMAIL ADDRES' placeholder='email@kampus.ac.id'/>

        <CustomInputTextArea label='MESSAGE' placeholder='Tuliskan pesan anda disini' />

        <CustomButtonContact name='Kirim Pesan'>
            
        </CustomButtonContact>

    </div>
  )
}
