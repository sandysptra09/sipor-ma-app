import React from 'react'
import { Card } from '@heroui/react'
import { Clock } from 'lucide-react'

interface ActivityItem {
  title: string
  time: string
  device: string
}

const activities: ActivityItem[] = [
  {
    title: 'Menyetujui Laporan CF-8821',
    time: '12 Menit yang lalu',
    device: 'Desktop Chrome',
  },
  {
    title: 'Mengubah Status Gedung Baru – 04.005',
    time: '1 Jam yang lalu',
    device: 'Desktop Chrome',
  },
]

export default function LogActivityItemsCard() {
  return (
    <Card className='w-full bg-white shadow-sm border-none rounded-2xl p-6'>
      {/* Header */}
      <div className="flex items-center gap-3">
        {/* <div className="bg-[#E6F4F3] rounded-xl p-2 flex items-center justify-center">
          <Clock size={20} className="text-[#0A6F66]" />
        </div> */}
        <h3 className="font-bold text-base text-[#181C1C]">Aktivitas Terakhir</h3>
      </div>

      {/* Activity List */}
      <div className="flex flex-col">
        {activities.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 py-3 ${
              index < activities.length - 1 ? '' : ''
            }`}
          >
            {/* Dot indicator */}
            <span className="mt-1.5 w-2 h-2 rounded-full bg-primary/30 shrink-0" />

            {/* Content */}
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-[#181C1C]">{item.title}</span>
              <span className="text-xs text-gray-400">
                {item.time} – {item.device}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}