// components/customs/admin/confirmation-modal.tsx
'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@heroui/react"
import { LucideIcon, X } from "lucide-react"

interface ConfirmationModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
    confirmLabel: string
    icon?: LucideIcon
    variant?: 'danger' | 'primary'
}

export function ConfirmationModal({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel,
    icon: Icon,
    variant = 'primary',
}: ConfirmationModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-0 rounded-lg overflow-hidden ring-0 shadow-lg gap-0 [&>button]:hidden">

                {/* Header */}
                <DialogHeader className={`px-5 py-3 flex flex-row items-center gap-2 ${variant === 'danger' ? 'bg-red-500' : 'bg-primary'}`}>
                    {Icon && <Icon size={24} className="text-white shrink-0" />}
                    <DialogTitle className="text-white text-sm font-semibold uppercase tracking-wider flex-1">
                        {title}
                    </DialogTitle>

                    {/* Custom close button */}
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </DialogHeader>

                {/* Body */}
                <div className="px-5 py-4 ">
                    <DialogDescription className="text-foreground text-sm leading-relaxed">
                        {description}
                    </DialogDescription>
                </div>

                {/* Footer */}
                <DialogFooter className="px-5 pb-5 flex flex-row justify-end gap-2">
                    <Button
                        onPress={onClose}
                        className="bg-destructive text-background font-semibold text-xs px-5 py-2 rounded-md"
                    >
                        Batal
                    </Button>
                    <Button
                        onPress={onConfirm}
                        className={`font-semibold text-xs px-5 py-2 rounded-md text-white ${variant === 'danger' ? 'bg-red-500' : 'bg-primary'}`}
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}