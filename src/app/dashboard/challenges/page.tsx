"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns, type TableData } from "./columns";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/api";

export default function Page() {
  const challenges = useQuery(api.challenges.listChallenges);
  const data = challenges?.map((c) => ({
    ...c,
    goal: `${c.unitValue} ${c.unit} ${c.recurrence}`,
  }));
  return (
    <>
      <Heading variant="h1">Challenges</Heading>
      <Card className="border-none">
        <CardHeader className="mb-6 flex flex-row items-center justify-between">
          <CardTitle>Challenge Management</CardTitle>
          <Button asChild>
            <Link href="/dashboard/challenges/create">New Challenge</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {data && <DataTable columns={columns} data={data} />}
        </CardContent>
      </Card>
    </>
  );
}
