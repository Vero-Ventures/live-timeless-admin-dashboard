"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "convex/react";
import { api } from "@/api";
import { useParams } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface TableData {
  _id: string;
  email: string;
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Email</span>
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: () => <div></div>,
    cell: ({ row }) => {
      const params = useParams<{ id: string }>();
      const challengeId = params.id;
      const user = row.original;
      const removeFromChallenge = useMutation(
        api.challenges.removeFromChallenge
      );
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem className="flex items-center gap-2">
              <Eye className="size-4" />
              <span>View</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={async () => {
                // TODO: Fix types when converted from a monorepo
                await removeFromChallenge({
                  challengeId: challengeId,
                  userId: user._id,
                });
              }}
              className="flex items-center gap-2"
            >
              <Trash2 className="size-4" />
              <span>Remove</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
