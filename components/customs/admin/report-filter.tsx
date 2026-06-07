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
    selectedPriority: string; 
    searchQuery: string;
    onStartDateChange: (date: Date | undefined) => void;
    onEndDateChange: (date: Date | undefined) => void;
    onGedungChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onPriorityChange: (value: string) => void; 
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
    selectedPriority,
    searchQuery,
    onStartDateChange,
    onEndDateChange,
    onGedungChange,
    onStatusChange,
    onPriorityChange,
    onSearchChange,
    onFilter,
    onReset,
}: ReportFilterProps) {
    return (
        <div className='flex flex-col gap-4 p-4 rounded-lg'>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">

                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
                    <Label className="font-semibold text-foreground text-sm">
                        Cari Laporan
                    </Label>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nomor, judul, atau deskripsi..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            disabled={loading}
                            className={cn(
                                "w-full pl-10 pr-10 py-2 text-sm font-medium rounded-md",
                                "bg-[#64748B]/10 border-none focus:outline-none focus:ring-2 focus:ring-[#64748B]/40",
                                "text-[#181C1C] placeholder-[#64748B]/60 transition-all",
                                loading && "opacity-50 cursor-not-allowed"
                            )}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange("")}
                                disabled={loading}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/70 hover:text-foreground transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="font-semibold text-foreground text-sm">Tanggal Awal</Label>
                    <Popover modal={!loading}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={loading}
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-semibold p-2.5 gap-2 border-none bg-[#64748B]/10 hover:bg-[#64748B]/20 transition-colors rounded-md text-sm",
                                    !startDate ? "text-foreground/70" : "text-foreground"
                                )}
                            >
                                <CalendarIcon className="h-5 w-5 text-foreground flex-shrink-0" />
                                <span className="tracking-wide truncate">
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

                <div className="flex flex-col gap-2">
                    <Label className="font-semibold text-foreground text-sm">Tanggal Akhir</Label>
                    <Popover modal={!loading}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={loading}
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-semibold p-2.5 gap-2 border-none bg-[#64748B]/10 hover:bg-[#64748B]/20 transition-colors rounded-md text-sm",
                                    !endDate ? "text-foreground/70" : "text-[#181C1C]"
                                )}
                            >
                                <CalendarIcon className="h-5 w-5 text-foreground flex-shrink-0" />
                                <span className="tracking-wide truncate">
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

                <div className="flex flex-col gap-2">
                    <Label className='font-semibold text-foreground text-sm'>Gedung</Label>
                    <Select
                        isDisabled={loading}
                        className="w-full"
                        placeholder="Pilih Gedung"
                        selectedKey={selectedGedung}
                        onSelectionChange={(key) => onGedungChange(key as string)}
                    >
                        <Select.Trigger className="bg-[#64748B]/10 hover:bg-[#64748B]/20 border-none shadow-none rounded-md transition-colors px-3 py-2.5 text-sm">
                            <Select.Value className="text-foreground/70 hover:text-foreground font-semibold tracking-wide" />
                            <Select.Indicator className="text-foreground/70 hover:text-foreground" />
                        </Select.Trigger>
                        <Select.Popover className="rounded-md shadow-2xl border border-slate-200">
                            <ListBox>
                                {buildingOptions.map((item) => (
                                    <ListBox.Item
                                        key={item.name}
                                        id={item.name}
                                        className="rounded-md font-semibold text-foreground text-sm data-[focused=true]:bg-[#64748B]/10 data-[selected=true]:bg-[#0d9488] data-[selected=true]:text-white"
                                    >
                                        {item.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label className='font-semibold text-foreground text-sm'>Status</Label>
                    <Select
                        isDisabled={loading}
                        className="w-full"
                        placeholder="Pilih Status"
                        selectedKey={selectedStatus}
                        onSelectionChange={(key) => onStatusChange(key as string)}
                    >
                        <Select.Trigger className="bg-[#64748B]/10 hover:bg-[#64748B]/20 border-none shadow-none rounded-md transition-colors px-3 py-2.5 text-sm">
                            <Select.Value className="text-foreground/70 hover:text-foreground font-semibold tracking-wide" />
                            <Select.Indicator className="text-foreground/70 hover:text-foreground" />
                        </Select.Trigger>
                        <Select.Popover className="rounded-md shadow-2xl border border-slate-200">
                            <ListBox>
                                {[
                                    { id: "RESOLVED", label: "Selesai" },
                                    { id: "REJECTED", label: "Ditolak" },
                                    { id: "CANCELED", label: "Dibatalkan" },
                                    { id: "IN_PROGRESS", label: "Diproses" },
                                    { id: "PENDING", label: "Menunggu" },
                                    { id: "VERIFIED", label: "Diverifikasi" },
                                ].map((item) => (
                                    <ListBox.Item
                                        key={item.id}
                                        id={item.id}
                                        className="rounded-md font-semibold text-foreground text-sm data-[focused=true]:bg-[#64748B]/10 data-[selected=true]:bg-[#0d9488] data-[selected=true]:text-white"
                                    >
                                        {item.label} <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
                    <Label className='font-semibold text-foreground text-sm'>Prioritas</Label>
                    <Select
                        isDisabled={loading}
                        className="w-full"
                        placeholder="Pilih Prioritas"
                        selectedKey={selectedPriority}
                        onSelectionChange={(key) => onPriorityChange(key as string)}
                    >
                        <Select.Trigger className="bg-[#64748B]/10 hover:bg-[#64748B]/20 border-none shadow-none rounded-md transition-colors px-3 py-2.5 text-sm">
                            <Select.Value className="text-foreground/70 hover:text-foreground font-semibold tracking-wide" />
                            <Select.Indicator className="text-foreground/70 hover:text-foreground" />
                        </Select.Trigger>
                        <Select.Popover className="rounded-md shadow-2xl border border-slate-200">
                            <ListBox>
                                {[
                                    { id: "LOW", label: "Rendah" },
                                    { id: "MEDIUM", label: "Sedang" },
                                    { id: "HIGH", label: "Tinggi" },
                                ].map((item) => (
                                    <ListBox.Item
                                        key={item.id}
                                        id={item.id}
                                        className="rounded-md font-semibold text-foreground text-sm data-[focused=true]:bg-[#64748B]/10 data-[selected=true]:bg-[#0d9488] data-[selected=true]:text-white"
                                    >
                                        {item.label} <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                <div className='col-span-2 lg:col-span-3 flex flex-col sm:flex-row gap-3 justify-end w-full mt-2'>
                    <Button
                        disabled={loading}
                        onClick={onReset}
                        className='font-semibold w-full sm:w-32 text-primary border-2 border-primary bg-background hover:bg-primary/10 px-4 py-2.5 text-sm gap-2'
                    >
                        <FunnelX size={18} />
                        Reset
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={onFilter}
                        className='cursor-pointer font-semibold w-full sm:w-32 px-4 py-2.5 text-sm gap-2 bg-[#0d9488] hover:bg-[#0f766e]'
                    >
                        <Funnel size={18} />
                        Filter
                    </Button>
                </div>

            </div>
        </div>
    );
}