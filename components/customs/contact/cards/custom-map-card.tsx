import React from 'react'

interface CustomMapCardProps{
    title?: string;
}

export default function CustomMapCard({title}:CustomMapCardProps) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5857203372047!2d107.72227257381073!3d-6.940013493060021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c323777ca3a1%3A0x355eff6734ed9167!2sUniversitas%20Pendidikan%20Indonesia%20-%20Kampus%20UPI%20Cibiru!5e0!3m2!1sen!2sid!4v1778055237961!5m2!1sen!2sid"
        className="w-full h-full border-0"
        loading="lazy"
      />

      <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-md shadow">
        <span className="text-sm font-semibold text-primary">
          {title}
        </span>
      </div>

    </div>
  )
}
