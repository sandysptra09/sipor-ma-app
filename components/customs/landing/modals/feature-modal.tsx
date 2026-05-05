'use client';

import { useRouter } from 'next/navigation';
import { Modal, Button } from '@heroui/react';
import { ArrowRight } from 'lucide-react';

interface ModalStep {
    title: string;
    description: string;
}

interface FeatureModalProps {
    title: string;
    href: string;
    subtitle: string;
    fullDescription: string;
    steps: ModalStep[];
}

export default function FeatureModal({ title, href, subtitle, fullDescription, steps = [] }: FeatureModalProps) {

    const router = useRouter();

    return (
        <Modal>
            <Button
                className='group inline-flex items-center gap-2 p-0 h-auto bg-transparent data-[hover=true]:bg-transparent text-sm font-bold text-primary transition-colors hover:text-primary/80'
            >
                Pelajari Lebih Lanjut
                <ArrowRight size={18} strokeWidth={2.5} className='transition-transform group-hover:translate-x-1' />
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement='center'>
                    <Modal.Dialog className='sm:max-w-120'>
                        <Modal.CloseTrigger className='text-primary' />

                        <Modal.Header className='flex flex-col gap-2'>
                            <Modal.Heading className='font-heading text-2xl font-bold text-[#181C1C]'>
                                {title}
                            </Modal.Heading>
                            <p className='text-sm font-normal text-muted-foreground'>
                                {subtitle}
                            </p>
                        </Modal.Header>

                        <Modal.Body className='flex flex-col gap-4 py-4'>
                            <p className='text-sm leading-relaxed text-foreground/80'>
                                {fullDescription}
                            </p>

                            <div className='flex flex-col gap-3'>
                                {steps.map((step, idx) => (
                                    <div key={idx} className='flex items-center gap-4 rounded-xl bg-[#f4faf8] p-4 border border-transparent transition-colors hover:border-primary/20'>
                                        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-sm'>
                                            {idx + 1}
                                        </div>
                                        <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold text-[#181C1C]'>{step.title}</h4>
                                            <p className='mt-0.5 text-xs font-medium text-muted-foreground'>{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Modal.Body>

                        <Modal.Footer className='flex w-full gap-3 pt-4'>
                            <Button
                                className='flex-1 rounded-lg border-zinc-200 font-semibold border'
                                variant='ghost'
                                slot='close'
                            >
                                Tutup
                            </Button>
                            <Button
                                className='flex-1 rounded-lg bg-primary font-semibold text-white shadow-sm'
                                onPress={() => router.push(href)}
                            >
                                Lapor sekarang
                            </Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}