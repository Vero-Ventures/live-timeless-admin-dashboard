"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

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
import { Trash2, UserPlus2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const deleteSelectedRows = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log(selectedRows);
    setRowSelection({});
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 px-4 py-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
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
              <span>Remove Selected ({Object.keys(rowSelection).length})</span>
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Invite</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                  <UserPlus2 />
                  <span>Invite a member</span>
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-4">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="collaborator@example.com"
                    className="col-span-3"
                  />
                  <p className="text-sm">
                    Separate multiple emails with a comma.
                  </p>
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="name">Role</Label>
                  <RadioGroup defaultValue="comfortable" className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label className="text-sm" htmlFor="admin">
                        <p className="font-semibold">Admin</p>
                        <p className="text-sm">
                          Assign admins, manage members, publish and view all
                          challenges
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="user" id="user" />
                      <Label className="text-sm" htmlFor="user">
                        <p className="font-semibold">User</p>
                        <p className="text-sm">View challenges</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
