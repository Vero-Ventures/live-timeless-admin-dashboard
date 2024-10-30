"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ban, Send } from "lucide-react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "convex/react";
import { api } from "@/api";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// TODO: should be type above but need to convert to monorepo to fix.
export interface TableData {
  _id: any;
  name?: string;
  email: string;
  role: string;
  status: string;
  userId?: any;
}

export const columns: ColumnDef<TableData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="border-muted-foreground"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Name</span>
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="space-y-2">
        <div>{row.getValue("name") || row.getValue("email")}</div>
        {row.original.status === "pending" && (
          <Badge variant="outline">
            Invitation {row.original.status}, sent Oct 28, 2024
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Email</span>
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Role</span>
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <div className="capitalize">{row.getValue("role")}</div>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div></div>,
    cell: function Cell({ row }) {
      const resendUserInvitation = useMutation(
        api.invitations.resendUserInvitation
      );
      const deleteUserInvitation = useMutation(
        api.invitations.deleteInvitation
      );
      const deleteAuthAccount = useMutation(api.users.deleteAuthAccount);
      const deleteUser = useMutation(api.users.deleteUser);
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {member.status !== "pending" ? (
              <DropdownMenuItem
                onClick={async () => {
                  await Promise.all([
                    deleteUserInvitation({
                      invitationId: member._id,
                    }),
                    deleteAuthAccount({
                      userId: member.userId,
                    }),
                    deleteUser({
                      userId: member.userId,
                    }),
                  ]);
                }}
                className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 className="size-4" />
                <span>Remove member</span>
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={async () => {
                    await resendUserInvitation({ invitationId: member._id });
                  }}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Send className="size-4" />
                  <span>Resend Invitation Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await deleteUserInvitation({
                      invitationId: member._id,
                    });
                  }}
                  className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
                >
                  <Ban className="size-4" />
                  <span>Cancel Invitation</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
