'use client';

import { Button, Card } from '@heroui/react';
import { motion } from 'framer-motion';

export default function HelpWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card className='w-full bg-[#0A6F66] text-white border-none rounded-2xl shadow-sm'>
                <Card.Content className='py-2 px-4'>
                    <h3 className='font-semibold text-[17px] tracking-wide mb-3'>Butuh Bantuan Cepat?</h3>
                    <p className='text-sm font-medium text-white/90 mb-6 leading-relaxed'>
                        Hubungi tim verifikator kami melalui jalur prioritas SIPOR-MA
                    </p>

                    <Button className='bg-[#E6F4F1] text-[#0A6F66] text-xs font-semibold py-2.5 px-5 rounded-lg'>
                        Chat Admin
                    </Button>
                </Card.Content>
            </Card>
        </motion.div>
    );
}