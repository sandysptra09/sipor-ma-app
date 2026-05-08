import React from 'react'
import {Mail, Phone,} from "lucide-react";

import ContactItem from "./contact-item";

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">

      <div className="flex flex-col gap-2">

        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Kontak Privasi
        </h4>

        <p className="text-sm leading-relaxed text-gray-600">
          Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini,
          silakan hubungi tim kepatuhan data kami.
        </p>

      </div>

      <div className="flex gap-8">

        <ContactItem
          label="privacy@sipor-ma.ac.id"
          startIcon={<Mail size={12} />}
        />

        <ContactItem
          label="(021) 555-0192"
          startIcon={<Phone size={12} />}
        />

      </div>

    </div>
  );
}