"use client";

import Heading from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const data = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "user",
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "user",
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "user",
  },
  {
    _id: "507f1f77bcf86cd799439014",
    email: "diana.prince@example.com",
    role: "user",
  },
  {
    _id: "507f1f77bcf86cd799439015",
    email: "ethan.hunt@example.com",
    role: "user",
    status: "pending",
  },
];

export default function Page() {
  return (
    <>
      <Heading variant="h1">Members</Heading>
      <Card className="border-none">
        <CardContent className="p-0">
          {data && <DataTable columns={columns} data={data} />}
        </CardContent>
      </Card>
    </>
  );
}
