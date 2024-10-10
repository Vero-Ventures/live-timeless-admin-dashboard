import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronLeft, Infinity, Target } from "lucide-react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns, type TableData } from "./columns";

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

export default function SingleChallengePage() {
  return (
    <>
      <div className="mb-8 flex gap-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/challenges">
            <ChevronLeft />
          </Link>
        </Button>
        <Heading className="mb-0">Challenge Name</Heading>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Target />
            <span>10 mins per day</span>
          </div>
          <div className="flex gap-2">
            <Infinity />
            <span>Everyday</span>
          </div>
          <div className="flex gap-2">
            <Calendar />
            <span>Oct 1 - Nov 1</span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            labore incidunt tenetur dignissimos adipisci, sunt suscipit,
            repellendus ratione sapiente quibusdam optio iure quos voluptates
            iste ipsum temporibus hic explicabo nisi.
          </p>
        </div>
        <Card className="border-none">
          <CardHeader className="mb-6 flex flex-row items-center justify-between">
            <CardTitle>Participant Management</CardTitle>
            <Button asChild>
              <Link href="/dashboard/challenges/123/invite">Invite Users</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
