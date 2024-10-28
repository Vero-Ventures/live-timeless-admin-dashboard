"use client";

import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { DataTablePagination } from "../../../components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/api";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  });
  const deleteChallenge = useMutation(api.challenges.deleteChallenge);
  const deleteSelectedRows = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    await Promise.all(
      selectedRows.map(async (row) =>
        deleteChallenge({ challengeId: row.original._id })
      )
    );
    setRowSelection({});
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 px-4 py-4">
        <Input
          placeholder="Filter goals..."
          value={(table.getColumn("goal")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("goal")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          {Object.keys(rowSelection).length > 0 && (
            <Button
              onClick={deleteSelectedRows}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 />
              <span>Delete Selected ({Object.keys(rowSelection).length})</span>
            </Button>
          )}
          <Button asChild>
            <Link href="/dashboard/challenges/create">New Challenge</Link>
          </Button>
        </div>
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
