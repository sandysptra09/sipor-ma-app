"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from "@heroui/react";
import { Trash2, AlertCircle, Loader2 } from "lucide-react";

interface CancelReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportId: string | null;
    onSuccess: () => void;
}

export default function CancelReportModal({ isOpen, onClose, reportId, onSuccess }: CancelReportModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [reason, setReason] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCancel = async () => {
        if (!reportId) return;
        
        setIsDeleting(true);
        try {
            const cleanId = reportId.replace('#', '');
            const res = await fetch(`/api/reports/${cleanId}`, {
                method: 'DELETE',
                // nyimpen hail pean
            });

            if (res.ok) {
                setIsSuccess(true);
                
                setTimeout(() => {
                    onSuccess();
                }, 2000); 
            } else {
                alert("Gagal membatalkan laporan.");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan sistem.");
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false);
            setReason("");
        }
    }, [isOpen]);

    if (!reportId) return null;

    return (
        <Modal>
            <Modal.Backdrop isOpen={isOpen} onOpenChange={(open) => {
                if (!open && !isDeleting) onClose();
            }}>
                <Modal.Container>
                    <Modal.Dialog className="overflow-hidden sm:max-w-[450px] p-0 rounded-2xl shadow-xl border-none">
                        
                        {/*  KONFIRMASI HAPUS */}
                        {!isSuccess ? (
                            <>
                                <Modal.Header className="bg-[#FF3B30] text-white flex flex-row items-center gap-3 p-4 px-5">
                                    <Trash2 className="w-5 h-5" />
                                    <Modal.Heading className="text-[13px] text-white font-bold tracking-widest uppercase mt-0.5">
                                        Batalkan Laporan {reportId}?
                                    </Modal.Heading>
                                </Modal.Header>
                                
                                <Modal.Body className="p-5">
                                    <p className="text-[13px] text-gray-600 mb-1 leading-relaxed">
                                        Apakah Anda yakin ingin membatalkan laporan kerusakan fasilitas ini? Tim Sarpras tidak akan memproses laporan ini jika dibatalkan.
                                    </p>
                                    <textarea
                                        className="w-full bg-[#EFEFEF]/50 rounded-lg p-3 text-[13px] text-gray-700 outline-none border border-transparent focus:border-[#FF3B30]/30 transition-colors resize-none mt-2"
                                        rows={4}
                                        placeholder="Tulis alasan pembatalan (Opsional)..."
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        disabled={isDeleting}
                                    />
                                </Modal.Body>
                                
                                <Modal.Footer className="p-5 pt-0 flex gap-3 mt-1">
                                    <button
                                        onClick={onClose}
                                        disabled={isDeleting}
                                        className="flex-1 bg-[#6C727F] hover:bg-[#585D69] text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        Tidak, Simpan Laporan
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={isDeleting}
                                        className="flex-1 bg-[#FF3B30] hover:bg-[#E0352A] text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                                    >
                                        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                        {isDeleting ? "Memproses..." : "Ya, Batalkan Laporan"}
                                    </button>
                                </Modal.Footer>
                            </>
                        ) : (
                            
                        /*  TAMPILAN PESAN SUKSES */
                            <Modal.Body className="p-6">
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="w-6 h-6 text-[#FF3B30] shrink-0 mt-0.5" />
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-[#FF3B30] font-bold tracking-wider text-[13px] uppercase leading-relaxed">
                                            Laporan {reportId} Berhasil Dibatalkan!
                                        </h3>
                                        <p className="text-[13px] text-gray-600 leading-relaxed">
                                            Tim Sarpras tidak akan melanjutkan proses peninjauan untuk laporan ini.
                                        </p>
                                    </div>
                                </div>
                            </Modal.Body>
                        )}
                        
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}