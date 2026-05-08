import {TextArea} from "@heroui/react";

interface CustomInputTextAreaProps{
    label : string;
    placeholder: string;
}

export default function CustomInputTextArea({label, placeholder}:CustomInputTextAreaProps) {
  return (
    <div>
        <label htmlFor="" className='text-[11px] font-medium uppercase tracking-wider text-muted-foreground group-data-[invalid=true]:text-destructive'>
            {label}
        </label>

        <TextArea
          className="flex h-32 w-full items-center gap-3 rounded-md border-2 border-transparent bg-accent/70 px-4 transition-all placeholder:text-muted-foreground/70 hover:bg-muted focus-within:border-primary focus-within:bg-card group-data-[invalid=true]:border-destructive group-data-[invalid=true]:bg-destructive/5 shadow-none"
          placeholder={placeholder}
          
        />
    </div>

  )
}
