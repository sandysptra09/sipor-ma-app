import React from 'react'
import CustomInformationCard from './custom-information-card'
import CustomMapCard from './custom-map-card'
import { MapPin, Mail, Phone } from 'lucide-react'

export default function CardInformation() {
  return (
    <div className='flex w-full flex-col items-start gap-y-8 lg:w-1/2'>
        <CustomInformationCard
        title = 'Alamat Kampus'
        description='Jl. Pendidikan No.15, Cibiru Wetan, Kec. Cileunyi, Kabupaten Bandung, Jawa Barat 40625'
        startIcon = {<MapPin size={18} className='text-primary'/>}
        />
        <CustomInformationCard
        title = 'Email Resmi'
        description='siporma@upi.edu'
        startIcon = {<Mail size={18} className='text-primary'/>}
        />
        <CustomInformationCard
        title = 'Telephone'
        description='+62 812-2014-8738'
        startIcon = {<Phone size={18} className='text-primary'/>}
        />
        <CustomMapCard title="Lokasi Kampus" />
    </div>
  )
}
