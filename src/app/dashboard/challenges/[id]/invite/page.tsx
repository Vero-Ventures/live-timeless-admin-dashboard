"use client";

import Heading from "@/components/heading";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { type TableData, columns } from "./columns";

const data: TableData[] = [
  {
    id: "1",
    name: "John Doe",
  },
  {
    id: "2",
    name: "John Doe",
  },
  {
    id: "3",
    name: "John Doe",
  },
  {
    id: "4",
    name: "John Doe",
  },
  {
    id: "5",
    name: "John Doe",
  },
  {
    id: "6",
    name: "John Doe",
  },
  {
    id: "7",
    name: "John Doe",
  },
  {
    id: "8",
    name: "John Doe",
  },
  {
    id: "9",
    name: "John Doe",
  },
  {
    id: "10",
    name: "John Doe",
  },
];

export default function InviteUsersPage() {
  return (
    <>
      <div className="mb-8 flex gap-4">
        <BackButton />
        <Heading className="mb-0">Challenge Name</Heading>
      </div>
      <Heading>Invite Users</Heading>
      <Card className="border-none">
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </>
  );
}
