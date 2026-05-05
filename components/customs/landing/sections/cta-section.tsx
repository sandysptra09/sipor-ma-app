'use client';

import CtaBanner from '../banners/cta-banner';

export default function CtaSection() {
    return (
        <section className='w-full bg-card py-16 lg:py-24'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>
                <CtaBanner />
            </div>
        </section>
    );
}