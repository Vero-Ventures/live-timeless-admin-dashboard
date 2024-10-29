"use client";

import Heading from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "convex/react";
import { api } from "@/api";

export default function Page() {
  const challenges = useQuery(api.challenges.listChallenges);
  // @ts-expect-error - TODO: Incorrect inference should be fixed when we convert to a monorepo.
  const data = challenges?.map((c) => ({
    ...c,
    goal: `${c.unitValue} ${c.unit} ${c.recurrence}`,
  }));
  return (
    <>
      <Heading variant="h1">Challenges</Heading>
      <Card className="border-none">
        <CardContent className="p-0">
          {data && <DataTable columns={columns} data={data} />}
        </CardContent>
      </Card>
    </>
  );
}
