"use client";

import { Card, ProgressBar, Skeleton } from '@heroui/react';
import { Dot } from 'lucide-react';
import React, { useState, useEffect } from "react";

interface SummaryReportByCategoryCardProps {
  className?: string;
}

interface CategorySummary {
  name: string;
  count: number;
  value: number;
}

const VALID_CATEGORIES = [
  "AC",
  "Kelistrikan",
  "Furnitur & Interior",
  "Sanitasi & Air",
  "Infrastruktur Jalan"
];

export default function SummaryReportByCategoryCard({ className }: SummaryReportByCategoryCardProps) {
    const [data, setData] = useState<CategorySummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardStatistic() {
            try {
                const res = await fetch(`/api/admin/dashboard/summary-category`);
                const json = await res.json();
                const fetchedCategories: CategorySummary[] = json.categories ?? [];

                const mergedData = VALID_CATEGORIES.map((categoryName) => {
                    const found = fetchedCategories.find(c => c.name === categoryName);
                    return {
                        name: categoryName,
                        count: found ? found.count : 0,
                        value: found ? found.value : 0,
                    };
                });

                setData(mergedData);
            } catch (error) {
                console.error("Gagal mengambil data statistik kategori:", error);
                
                setData(VALID_CATEGORIES.map(name => ({ name, count: 0, value: 0 })));
            } finally {
                setIsLoading(false);
            }
        }
    
        fetchDashboardStatistic();
    }, []);

  return (
    <Card className={`p-8 rounded-lg shadow-md ring-0 ${className}`}>
      <div className='flex flex-row items-center justify-between mb-8'>
        <div className='flex flex-col'>
          <h3 className='text-lg font-semibold text-foreground'>Kategori Kerusakan</h3>
          <p className='text-sm text-muted-foreground '>
            Distribusi laporan berdasarkan jenis fasilitas.
          </p>
        </div>

        <div className='flex items-center'>
          <Dot size={60} className="text-[color-mix(in_srgb,var(--primary),black_20%)] -mx-4 -my-4" />
          <p className='text-sm font-semibold text-foreground/80'>Aktif</p>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/4 rounded-lg" />
                <Skeleton className="h-4 w-16 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded-full" />
            </div>
          ))
        ) : (
          data.map((item, index) => (
            <div key={index} className="w-full space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">{item.name}</span>
                <span className="text-sm text-muted-foreground font-medium">{item.count} Laporan</span>
              </div>

              <ProgressBar className="w-full" size='lg' value={item.value}>
                <ProgressBar.Track>
                  <ProgressBar.Fill className='bg-[color-mix(in_srgb,var(--primary),black_20%)]' />
                </ProgressBar.Track>
              </ProgressBar>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}