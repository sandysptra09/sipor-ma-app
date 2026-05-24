'use client';

import { Button, Modal } from '@heroui/react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
}

export default function ConfirmationModal({ isOpen, onOpenChange, onConfirm }: ConfirmationModalProps) {
    return (
        <Modal>
            <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
                <Modal.Container size='sm' placement='center'>
                    <Modal.Dialog>
                        <Modal.CloseTrigger className='text-primary' />
                        <Modal.Header className='gap-3'>
                            <Modal.Icon className='bg-amber-100 text-amber-600'>
                                <AlertTriangle className='size-5' />
                            </Modal.Icon>
                            <Modal.Heading>Konfirmasi Pengiriman</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='text-sm text-zinc-600 leading-relaxed'>
                                Apakah Anda yakin foto bukti dan deskripsi yang dilampirkan sudah benar?
                                <br /><br />
                                <span className='font-semibold text-zinc-800'>Catatan:</span> Sistem AI SIPOR-MA akan menganalisis laporan ini secara otomatis. Laporan palsu atau tidak pantas akan langsung ditolak oleh sistem.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant='ghost'
                                slot='close'
                                className='font-semibold text-[#181C1C]'
                            >
                                Kembali Periksa
                            </Button>

                            <Button
                                className='bg-[#0A6F66] text-white hover:bg-[#07534c] font-semibold'
                                onPress={onConfirm}
                            >
                                Ya, Kirim Laporan
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}