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
import { AlertCircleIcon, Trash2, UserPlus2 } from "lucide-react";
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
import { useMutation } from "convex/react";
import { api } from "@/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [open, setOpen] = useState(false);
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
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const sendUserInvitation = useMutation(api.invitations.sendUserInvitation);
  const deleteInvitation = useMutation(api.invitations.deleteInvitation);
  const deleteUser = useMutation(api.users.deleteUser);
  const deleteAuthAccount = useMutation(api.users.deleteAuthAccount);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      if (!email) {
        throw new Error("");
      }
      if (!role) {
        throw new Error("");
      }
      await sendUserInvitation({
        emails: email.split(","),
        role,
      });
      setEmail("");
      setRole("");
      setRowSelection({});
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  const deleteSelectedRows = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    await Promise.all(
      selectedRows.map(async (row: any) => {
        const member = row.original;
        if (member.status !== "pending") {
          await deleteUser({ userId: member.userId });
          await deleteAuthAccount({ userId: member.userId });
        }
        await deleteInvitation(member._id);
      })
    );

    setRowSelection({});
  };

  return (
    <div>
      {!!error && (
        <Alert variant="destructive" className="max-w-xl">
          <AlertCircleIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
          <Dialog open={open} onOpenChange={setOpen}>
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
                    multiple
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-sm">
                    Separate multiple emails with a comma.
                  </p>
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="name">Role</Label>
                  <RadioGroup
                    defaultValue="comfortable"
                    className="space-y-4"
                    value={role}
                    onValueChange={(role) => setRole(role)}
                  >
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
                <Button
                  disabled={isPending}
                  type="submit"
                  onClick={handleSubmit}
                >
                  {isPending ? "Sending..." : "Send Invitation"}
                </Button>
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
