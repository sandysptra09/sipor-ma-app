import { TextArea } from "@heroui/react";
import React from "react";

export default function CustomInputTextArea({ label, ...props }: any) {
  return (
    <div className="mt-2">
      <label className='text-[11px] font-medium uppercase tracking-wider text-muted-foreground'>
        {label}
      </label>
      <TextArea
        {...props}
        className="flex w-full items-center gap-3 rounded-md border-2 border-transparent bg-accent/70 px-4 transition-all placeholder:text-muted-foreground/70 hover:bg-muted focus-within:border-primary focus-within:bg-card outline-none shadow-none"
      />
    </div>
  )
}