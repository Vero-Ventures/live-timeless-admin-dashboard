"use client";

import Heading from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "convex/react";
import { api } from "@/api";

export default function Page() {
  const invitations = useQuery(api.invitations.listInvitations);

  return (
    <>
      <Heading variant="h1">Members</Heading>
      <Card className="border-none">
        <CardContent className="p-0">
          {invitations && <DataTable columns={columns} data={invitations} />}
        </CardContent>
      </Card>
    </>
  );
}
