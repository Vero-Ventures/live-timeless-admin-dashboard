"use client";

import Heading from "@/components/heading";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "@/api";
import { useQuery } from "convex/react";

export default function InviteUsersPage() {
  const users = useQuery(api.challenges.getNonInivtedUsers);
  console.log(users);
  return (
    <>
      <div className="mb-8 flex gap-4">
        <BackButton />
        <Heading className="mb-0">Challenge Name</Heading>
      </div>
      <Heading>Invite Users</Heading>
      <Card className="border-none">
        <CardContent className="p-0">
          {users && <DataTable columns={columns} data={users} />}
        </CardContent>
      </Card>
    </>
  );
}
