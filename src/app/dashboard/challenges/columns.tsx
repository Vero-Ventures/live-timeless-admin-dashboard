"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface TableData {
  // _id: Id<"challenges">;
  // TODO: should be type above but need to convert to monorepo to fix.
  _id: any;
  name: string;
  goal: string;
  // users: number;
  // engagement: number;
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
  },
  {
    accessorKey: "goal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Goal</span>
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "users",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="flex items-center gap-2"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         <span>Users</span>
  //         <ArrowUpDown className="size-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "engagement",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="flex items-center gap-2"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         <span>Engagement</span>
  //         <ArrowUpDown className="size-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return <div>{`${row.getValue("engagement")} %`}</div>;
  //   },
  // },
  {
    id: "actions",
    header: () => <div></div>,
    cell: ({ row }) => {
      const deleteChallenge = useMutation(api.challenges.deleteChallenge);
      const router = useRouter();
      const challenge = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                router.push(`/dashboard/challenges/${challenge._id}`);
              }}
              className="flex items-center gap-2"
            >
              <Eye className="size-4" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/dashboard/challenges/${challenge._id}/edit`);
              }}
              className="flex items-center gap-2"
            >
              <Pencil className="size-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await deleteChallenge({ challengeId: challenge._id });
              }}
              className="flex items-center gap-2 text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
