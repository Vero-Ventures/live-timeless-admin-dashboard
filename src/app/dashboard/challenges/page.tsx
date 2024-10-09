import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns, type TableData } from "./columns";
import Link from "next/link";

const data: TableData[] = [
  {
    id: "1",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "2",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "3",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "4",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "5",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "6",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "7",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "8",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "9",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "10",
    name: "<Challenge Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
];
export default async function Page() {
  return (
    <>
      <Heading variant="h1">Challenges</Heading>
      <Card className="border-none">
        <CardHeader className="mb-6 flex flex-row items-center justify-between">
          <CardTitle>Challenge Management</CardTitle>
          <Button asChild>
            <Link href="#">New Program</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </>
  );
}
