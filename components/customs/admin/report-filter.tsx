"use client";

import { Chip, ListBox, Select } from '@heroui/react';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Funnel, FunnelX } from 'lucide-react';
import { format } from "date-fns";

interface ReportFilterProps {
    loading?: boolean;
    buildingOptions: any[];
    startDate: Date | undefined;
    endDate: Date | undefined;
    selectedGedung: string;
    selectedStatus: string;
    onStartDateChange: (date: Date | undefined) => void;
    onEndDateChange: (date: Date | undefined) => void;
    onGedungChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onFilter: () => void;
    onReset: () => void;
}

export function ReportFilter({
    loading = false,
    buildingOptions,
    startDate,
    endDate,
    selectedGedung,
    selectedStatus,
    onStartDateChange,
    onEndDateChange,
    onGedungChange,
    onStatusChange,
    onFilter,
    onReset,
}: ReportFilterProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-2.5 bg-background rounded-lg'>

            {/* Start Date */}
            <div className="flex flex-col gap-2 w-full">
                <Label className="font-semibold text-primary">Tanggal Awal</Label>
                <Popover  modal={!loading}>
                    <PopoverTrigger asChild>
                        <Button
                            disabled={loading}
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left font-semibold p-2.5 gap-2 border-none bg-[#e6f4f4] hover:bg-[#d1eded] transition-colors rounded-md",
                                !startDate && "text-primary/70"
                            )}
                        >
                            <CalendarIcon className="h-7 w-7 text-primary stroke-[2.5px]" />
                            <span className="text-primary tracking-wide">
                                {startDate ? format(startDate, "dd/MM/yyyy") : "Pilih Tanggal"}
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl border-slate-200" align="start">
                        <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={onStartDateChange}
                            initialFocus
                            classNames={{
                                day_selected: "bg-[#0d9488] text-white hover:bg-[#0d9488] focus:bg-[#0d9488]",
                                day_today: "bg-slate-100 text-slate-900 font-bold",
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-2 w-full">
                <Label className="font-semibold text-primary">Tanggal Akhir</Label>
                <Popover  modal={!loading}>
                    <PopoverTrigger asChild>
                        <Button
                            disabled={loading}
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left font-semibold p-2.5 gap-2 border-none bg-[#e6f4f4] hover:bg-[#d1eded] transition-colors rounded-md",
                                !endDate && "text-primary/70"
                            )}
                        >
                            <CalendarIcon className="h-7 w-7 text-primary stroke-[2.5px]" />
                            <span className="text-primary tracking-wide">
                                {endDate ? format(endDate, "dd/MM/yyyy") : "Pilih Tanggal"}
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl border-slate-200" align="start">
                        <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={onEndDateChange}
                            initialFocus
                            classNames={{
                                day_selected: "bg-[#0d9488] text-white hover:bg-[#0d9488] focus:bg-[#0d9488]",
                                day_today: "bg-slate-100 text-slate-900 font-bold",
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Gedung */}
            <div className="flex flex-col gap-2 w-full">
                <Label className='font-semibold text-primary'>Gedung</Label>
                <Select
                    isDisabled={loading}
                    className="w-full"
                    placeholder="Pilih Gedung"
                    selectedKey={selectedGedung}
                    onSelectionChange={(key) => onGedungChange(key as string)}
                >
                    <Select.Trigger className="bg-[#e6f4f4] hover:bg-[#d1eded] border-none shadow-none rounded-md transition-colors px-3">
                        <Select.Value className="text-primary font-semibold tracking-wide" />
                        <Select.Indicator className="text-primary" />
                    </Select.Trigger>
                    <Select.Popover className="rounded-md shadow-2xl border border-slate-200">
                        <ListBox>

                            {buildingOptions.map((item) => (
                                <ListBox.Item
                                    key={item.name}
                                    id={item.name}
                                    className="rounded-md font-semibold text-primary data-[focused=true]:bg-[#e6f4f4] data-[selected=true]:bg-[#0d9488] data-[selected=true]:text-white"
                                >
                                    {item.label}

                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}

                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2 w-full">
                <Label className='font-semibold text-primary'>Status</Label>
                <Select
                    isDisabled={loading}
                    className="w-full"
                    placeholder="Pilih Status"
                    selectedKey={selectedStatus}
                    onSelectionChange={(key) => onStatusChange(key as string)}
                >
                    <Select.Trigger className="bg-[#e6f4f4] hover:bg-[#d1eded] border-none shadow-none rounded-md transition-colors px-3">
                        <Select.Value className="text-primary font-semibold tracking-wide" />
                        <Select.Indicator className="text-primary" />
                    </Select.Trigger>
                    <Select.Popover className="rounded-md shadow-2xl border border-slate-200">
                        <ListBox>
                            {[
                                { id: "RESOLVED", label: "Selesai" },
                                { id: "REJECTED", label: "Ditolak" },
                                { id: "IN_PROGRESS", label: "Diproses" },
                                { id: "PENDING", label: "Menunggu" },
                                { id: "VERIFIED", label: "Diverifikasi" },
                            ].map((item) => (
                                <ListBox.Item
                                    key={item.id}
                                    id={item.id}
                                    className="rounded-md font-semibold text-primary data-[focused=true]:bg-[#e6f4f4] data-[selected=true]:bg-[#0d9488] data-[selected=true]:text-white"
                                >
                                    {item.label} <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            {/* Buttons */}
            <div className='flex items-end col-span-1 md:col-span-2 lg:col-span-1 justify-end lg:justify-start gap-2'>
                <Button
                    disabled={loading}
                    onClick={onReset}
                    className='font-semibold text-primary border-2 border-primary bg-background hover:bg-primary/10 p-2.5'
                >
                    <FunnelX size={34} />
                    Reset
                </Button>
                <Button disabled={loading} onClick={onFilter} className='font-semibold p-2.5'>
                    <Funnel size={24} />
                    Filter
                </Button>
            </div>
        </div>
    );
}