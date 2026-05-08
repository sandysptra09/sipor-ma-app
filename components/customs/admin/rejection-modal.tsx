// components/customs/admin/rejection-modal.tsx
'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@heroui/react"
import { MessageSquareX, X, Send } from "lucide-react"

interface RejectionModalProps {
    open: boolean
    onClose: () => void
    onConfirm: (message: string) => void
}

export function RejectionModal({
    open,
    onClose,
    onConfirm,
}: RejectionModalProps) {
    const [message, setMessage] = useState('')

    const handleConfirm = () => {
        onConfirm(message)
        setMessage('')
    }

    const handleClose = () => {
        setMessage('')
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md p-0 rounded-lg overflow-hidden ring-0 shadow-lg gap-0 [&>button]:hidden">

                {/* Header */}
                <DialogHeader className="px-5 py-3 flex flex-row items-center gap-2 bg-destructive">
                    <MessageSquareX size={24} className="text-white shrink-0" />
                    <DialogTitle className="text-white text-sm font-semibold uppercase tracking-wider flex-1">
                        Kirim Pesan Penolakan
                    </DialogTitle>
                    <button
                        onClick={handleClose}
                        className="text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </DialogHeader>

                {/* Body */}
                <div className="px-5 pt-5 pb-3">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tulis instruksi atau konfirmasi untuk mahasiswa pelapor..."
                        rows={4}
                        className="w-full bg-foreground/5 rounded-md px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 resize-none focus:outline-none focus:ring-1 focus:ring-destructive"
                    />
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 flex flex-row items-center justify-between gap-2">
                    <p className="text-foreground/40 text-xs">
                        Pelapor akan menerima notifikasi
                    </p>
                    <Button
                        onPress={handleConfirm}
                        isDisabled={!message.trim()}
                        className="bg-destructive text-white font-semibold text-xs px-5 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                    >
                        Kirim Pesan
                        <Send size={14} />
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}