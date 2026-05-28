'use client'

import { useState, useRef, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@heroui/react"
import { Upload, X, Send, ImageUp, Loader2 } from "lucide-react"
import Image from 'next/image'

interface UploadProofModalProps {
    open: boolean
    onClose: () => void
    onConfirm: (image: File | null, message: string) => void
    isLoading?: boolean // Tambahkan props ini
}

export function UploadProofModal({
    open,
    onClose,
    onConfirm,
    isLoading = false // Default false
}: UploadProofModalProps) {
    const [message, setMessage] = useState('')
    const [preview, setPreview] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Reset state ketika modal ditutup
    useEffect(() => {
        if (!open) {
            setMessage('')
            setPreview(null)
            setFile(null)
        }
    }, [open])

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (!selected) return
        setFile(selected)
        setPreview(URL.createObjectURL(selected))
    }

    const handleConfirm = () => {
        onConfirm(file, message)
        // Jangan panggil onClose() di sini, biarkan parent yang menutupnya 
        // setelah proses upload selesai
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen && !isLoading) onClose()
        }}>
            <DialogContent className="!w-[560px] !max-w-[90vw] p-0 rounded-lg overflow-hidden ring-0 shadow-lg gap-0 [&>button]:hidden">
                {/* Header */}
                <DialogHeader className="px-5 py-3 flex flex-row items-center gap-2 bg-primary">
                    <ImageUp size={20} className="text-white shrink-0" />
                    <DialogTitle className="text-white text-sm font-semibold uppercase tracking-wider flex-1">
                        Upload Bukti dan Pesan Perbaikan
                    </DialogTitle>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-white/70 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </DialogHeader>

                {/* Body */}
                <div className="p-5 flex gap-4">
                    {/* Kiri: Preview gambar */}
                    <div
                        onClick={() => !isLoading && inputRef.current?.click()}
                        className={`w-40 h-36 shrink-0 rounded-md overflow-hidden bg-foreground/5 border-2 border-dashed border-foreground/20 flex items-center justify-center transition-colors ${isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-primary'}`}
                    >
                        {preview ? (
                            <Image
                                src={preview}
                                alt="preview"
                                width={160}
                                height={144}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-foreground/30">
                                <Upload size={24} />
                                <p className="text-xs text-center">Klik untuk upload</p>
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFile}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Kanan: Textarea */}
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isLoading}
                        placeholder="Tulis instruksi atau konfirmasi untuk mahasiswa pelapor..."
                        className="flex-1 bg-foreground/5 rounded-md px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 resize-none focus:outline-none focus:ring-1 focus:ring-primary h-36 disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 flex flex-row items-center justify-end gap-3">
                    <Button
                        onPress={() => inputRef.current?.click()}
                        isDisabled={isLoading}
                        className="bg-background text-primary font-semibold text-xs px-5 py-2 rounded-md border-2 border-dashed border-primary"
                    >
                        Upload Bukti Laporan
                    </Button>
                    <Button
                        onPress={handleConfirm}
                        isDisabled={!file || !message.trim() || isLoading}
                        className="bg-primary text-white font-semibold text-xs px-5 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                Memproses...
                                <Loader2 size={14} className="animate-spin" />
                            </>
                        ) : (
                            <>
                                Kirim
                                <Send size={14} />
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}