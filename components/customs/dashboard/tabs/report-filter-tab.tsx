'use client';

import { Tabs } from '@heroui/react';
import { ReactNode } from 'react';

export interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
}

interface ReportFilterTabsProps {
    items: TabItem[];
}

export default function ReportFilterTabs({ items }: ReportFilterTabsProps) {
    return (
        <Tabs className='w-full'>

            <Tabs.ListContainer className='border-b border-zinc-200 pb-4 mb-6 w-full overflow-x-auto no-scrollbar'>

                <Tabs.List aria-label='Filter Status Laporan' className='bg-transparent flex w-max gap-2'>

                    {items.map((tab) => (
                        <Tabs.Tab
                            key={tab.id}
                            id={tab.id}
                            className='group relative w-40 flex-none flex gap-2 h-10 cursor-pointer items-center justify-center rounded-full px-5 outline-none transition-colors hover:bg-[#e6f4f1]'
                        >
                            <span className='relative z-10 text-sm font-semibold text-muted-foreground transition-colors group-data-[selected=true]:text-white group-hover:text-[#0A6F66] group-data-[selected=true]:group-hover:text-white'>
                                {tab.label}
                            </span>
                            <Tabs.Indicator className='absolute inset-0 rounded-full bg-primary' />
                        </Tabs.Tab>
                    ))}

                </Tabs.List>
            </Tabs.ListContainer>

            {items.map((tab) => (
                <Tabs.Panel key={tab.id} id={tab.id}>
                    {tab.content}
                </Tabs.Panel>
            ))}

        </Tabs>
    );
}