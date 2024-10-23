"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  ChevronLeft,
  Infinity,
  Loader2Icon,
  Target,
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "convex/react";
import { api } from "@/api";
import { useParams } from "next/navigation";

export default function SingleChallengePage() {
  // TODO: Fix type when converted to mono repo
  const params = useParams<{ id: any }>();
  const challenge = useQuery(api.challenges.getChallengeById, {
    challengeId: params.id,
  });

  if (!challenge) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Loader2Icon className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex gap-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/challenges">
            <ChevronLeft />
          </Link>
        </Button>
        <Heading className="mb-0">{challenge.name}</Heading>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Target />
            <span>
              {challenge.unitValue} {challenge.unit} {challenge.recurrence}
            </span>
          </div>
          <div className="flex gap-2">
            <Infinity />
            <span>
              {challenge.repeat.length === 7
                ? "Everyday"
                : challenge.repeat
                    // TODO: Fix type when converted to monorepo
                    .map((day: any) => day.slice(0, 3))
                    .join(", ")}
            </span>
          </div>
          <div className="flex gap-2">
            <Calendar />
            <span>
              {`${new Date(challenge.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })} - 
              ${new Date(challenge.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}`}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="leading-relaxed">{challenge.description}</p>
        </div>
        <Card className="border-none">
          <CardContent className="p-0">
            <DataTable columns={columns} data={challenge.participants} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
