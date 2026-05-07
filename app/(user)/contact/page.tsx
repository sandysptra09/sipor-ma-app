import CardInformation from '@/components/customs/contact/cards/card-information'
import CustomCardContact from '@/components/customs/contact/forms/custom-card-contact'
import { TimeField } from '@heroui/react'
import React from 'react'

export default function ContactPage() {
    return (
        <div className='w-full bg-card py-20 lg:py-28'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>
                <div className='w-full mb-8'>
                    <h1 className='mb-4 text-4xl font-heading font-bold text-black'>
                        Kontak 
                        <span className='text-primary'> Kami</span>
                    </h1>
                    <p className=' font-sans text-base leading-relaxed text-black-100'>
                        Punya pertanyaan mengenai fasilitas kampus atau ingin melaporkan
                        kendala? Tim SIPOR-MA siap membantu Anda menciptakan lingkungan
                        belajar yang lebih baik.
                    </p>
                </div>

                <div className='flex flex-col-reverse gap-16 lg:flex-row'>
                    <CardInformation/>
                    <CustomCardContact/>
                </div>
            </div>
        </div>
    )
}
