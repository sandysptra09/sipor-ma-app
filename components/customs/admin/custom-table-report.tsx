"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Column {
  id: string;
  name: string;
  render?: (item: any) => React.ReactNode;
}

interface CustomTableReportProps {
  columns: Column[];
  data: any[];
  totalRecords: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export function CustomTableReport({
  columns,
  data,
  totalRecords,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}: CustomTableReportProps) {
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage + 1;
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
    <div className="w-full bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#F8FAFA]">
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className="text-[#64748B] font-semibold text-xs uppercase py-4 px-6 tracking-[1px] whitespace-nowrap"
                >
                  {column.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={item.id || index}
                  className="border-b last:border-none hover:bg-slate-50/50 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} className="py-4 px-6 text-sm">
                      {column.render
                        ? column.render(item)
                        : (item[column.id] ?? "-")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-12 text-slate-400"
                >
                  Tidak ada data yang tersedia
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-5 gap-4 border-t bg-white">
        <div className="flex items-center gap-4">
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => {
              onRowsPerPageChange(Number(value));
              onPageChange(1);
            }}
          >
            <SelectTrigger className="w-[70px] h-9 border-slate-200">
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
            Showing{endIdx} of {totalRecords} active reports
          </p>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-slate-500 hover:text-slate-900 font-semibold px-4 h-9"
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
                  className={`h-9 w-9 p-0 font-bold ${
                    currentPage === page
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
            disabled={currentPage === totalPages}
            className="text-slate-900 font-bold px-4 h-9"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}