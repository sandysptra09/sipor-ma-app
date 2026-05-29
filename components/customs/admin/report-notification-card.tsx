"use client";

import React from "react";
import ReportItem from "./report-item";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ReportData {
  id: string | number;
  reportNumber: string | number;
  type: 'RESOLVED' | 'IN_PROGRESS' | 'REJECTED' | 'VERIFIED' | 'PENDING';
  user: string;
  title: string;
  location: string;
  datetime: Date | string | number;
  description: string;
  isRead?: boolean; 
  icon?: React.ReactNode;
}

interface ReportNotificationCardProps {
  data: ReportData[];
  totalRecords: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function ReportNotificationCard({
  data,
  totalRecords,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}: ReportNotificationCardProps) {

  const currentData = data; 
  
  const indexOfFirstItem = (currentPage - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const endIdx = Math.min(currentPage * rowsPerPage, totalRecords);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    if (!pages.includes(totalPages)) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md ring-0 overflow-hidden border border-gray-100 p-8">
      <div className="flex flex-col">
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <ReportItem
              key={item.id}
              id={encodeURIComponent(item.reportNumber)}
              user={item.user}
              title={item.title}
              location={item.location}
              datetime={item.datetime}
              description={item.description}
              isRead={item.isRead}
              icon={item.icon}
            />
          ))
        ) : (
          <div className="text-center py-20 text-slate-400 text-sm">
            Tidak ada data yang tersedia
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4 border-t bg-white">
        <div className="flex items-center gap-4">
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => {
              onRowsPerPageChange(Number(value));
              onPageChange(1);
            }}
          >
            <SelectTrigger className="w-[70px] h-9 border-primary focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20].map((val) => (
                <SelectItem key={val} value={val.toString()}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-foreground font-medium whitespace-nowrap">
            Showing {currentData.length > 0 ? indexOfFirstItem + 1 : 0} - {endIdx} of {totalRecords} active reports
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-slate-900 font-semibold px-4 h-9"
          >
            Previous
          </Button>

          <div className="flex items-center gap-1 mx-2">
            {getPageNumbers().map((page, idx) => (
              page === "ellipsis" ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={`h-9 w-9 p-0 font-bold ${currentPage === page
                      ? "bg-primary text-white shadow-sm hover:bg-primary/80"
                      : "text-slate-500 hover:bg-slate-100"
                    }`}
                >
                  {page}
                </Button>
              )
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="text-slate-900 font-bold px-4 h-9"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}