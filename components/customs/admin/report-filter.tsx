"use client";

import { Chip, ListBox, Select } from '@heroui/react';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Funnel, FunnelX, Search, X } from 'lucide-react';
import { format } from "date-fns";

interface ReportFilterProps {
    loading?: boolean;
    buildingOptions: any[];
    startDate: Date | undefined;
    endDate: Date | undefined;
    selectedGedung: string;
    selectedStatus: string;
    searchQuery: string;
    onStartDateChange: (date: Date | undefined) => void;
    onEndDateChange: (date: Date | undefined) => void;
    onGedungChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSearchChange: (value: string) => void;
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
    searchQuery,
    onStartDateChange,
    onEndDateChange,
    onGedungChange,
    onStatusChange,
    onSearchChange,
    onFilter,
    onReset,
}: ReportFilterProps) {
    return (
        <div className='flex flex-col gap-4 p-4 bg-background rounded-lg'>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">

                {/* Search */}
                <div className="flex flex-col gap-2 md:col-span-12 lg:col-span-6">
                    <Label className="font-semibold text-primary text-sm">
                        Cari Laporan
                    </Label>

                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60" />

                        <input
                            type="text"
                            placeholder="Cari berdasarkan nomor, judul, atau deskripsi..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            disabled={loading}
                            className={cn(
                                "w-full pl-10 pr-10 py-2 text-sm font-medium rounded-md",
                                "bg-[#e6f4f4] border-none focus:outline-none focus:ring-2 focus:ring-primary",
                                "text-primary placeholder-primary/50 transition-all",
                                loading && "opacity-50 cursor-not-allowed"
                            )}
                        />

                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange("")}
                                disabled={loading}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-2 md:col-span-6 lg:col-span-3">
                    <Label className="font-semibold text-primary text-sm">Tanggal Awal</Label>
                    <Popover modal={!loading}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={loading}
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-semibold p-2.5 gap-2 border-none bg-[#e6f4f4] hover:bg-[#d1eded] transition-colors rounded-md text-sm",
                                    !startDate && "text-primary/70"
                                )}
                            >
                                <CalendarIcon className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="text-primary tracking-wide truncate">
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
                <div className="flex flex-col gap-2 md:col-span-6 lg:col-span-3">
                    <Label className="font-semibold text-primary text-sm">Tanggal Akhir</Label>
                    <Popover modal={!loading}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={loading}
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-semibold p-2.5 gap-2 border-none bg-[#e6f4f4] hover:bg-[#d1eded] transition-colors rounded-md text-sm",
                                    !endDate && "text-primary/70"
                                )}
                            >
                                <CalendarIcon className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="text-primary tracking-wide truncate">
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
                <div className="flex flex-col gap-2 md:col-span-6 lg:col-span-5">
                    <Label className='font-semibold text-primary text-sm'>Gedung</Label>
                    <Select
                        isDisabled={loading}
                        className="w-full"
                        placeholder="Pilih Gedung"
                        selectedKey={selectedGedung}
                        onSelectionChange={(key) => onGedungChange(key as string)}
                    >
                        <Select.Trigger className="bg-[#e6f4f4] hover:bg-[#d1eded] border-none shadow-none rounded-md transition-colors px-3 py-2.5 text-sm">
                            <Select.Value className="text-primary font-semibold tracking-wide" />
                            <Select.Indicator className="text-primary" />
                        </Select.Trigger>
                        <Select.Popover className="rounded-md shadow-2xl border border-slate-200">
                            <ListBox>
                                {buildingOptions.map((item) => (
                                    <ListBox.Item
                                        key={item.name}
                                        id={item.name}
                                        className="rounded-md font-semibold text-primary text-sm data-[focused=true]:bg-[#e6f4f4] data-[selected=true]:bg-[#0d9488] data-[selected=true]:text-white"
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
                <div className="flex flex-col gap-2 md:col-span-6 lg:col-span-4">
                    <Label className='font-semibold text-primary text-sm'>Status</Label>
                    <Select
                        isDisabled={loading}
                        className="w-full"
                        placeholder="Pilih Status"
                        selectedKey={selectedStatus}
                        onSelectionChange={(key) => onStatusChange(key as string)}
                    >
                        <Select.Trigger className="bg-[#e6f4f4] hover:bg-[#d1eded] border-none shadow-none rounded-md transition-colors px-3 py-2.5 text-sm">
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
                                        className="rounded-md font-semibold text-primary text-sm data-[focused=true]:bg-[#e6f4f4] data-[selected=true]:bg-[#0d9488] data-[selected=true]:text-white"
                                    >
                                        {item.label} <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Buttons */}
                <div className='flex flex-col gap-2 md:col-span-12 lg:col-span-3 justify-end'>
                    <Label className="font-semibold text-transparent text-sm hidden lg:block select-none">
                        Aksi
                    </Label>
                    <div className="flex flex-row gap-2 justify-end w-full">
                        <Button
                            disabled={loading}
                            onClick={onReset}
                            className='font-semibold flex-1 md:flex-none text-primary border-2 border-primary bg-background hover:bg-primary/10 px-4 py-2.5 text-sm gap-2 w-full md:w-auto'
                        >
                            <FunnelX size={18} />
                            Reset
                        </Button>
                        <Button 
                            disabled={loading} 
                            onClick={onFilter} 
                            className='font-semibold flex-1 md:flex-none px-4 py-2.5 text-sm gap-2 w-full md:w-auto'
                        >
                            <Funnel size={18} />
                            Filter
                        </Button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}