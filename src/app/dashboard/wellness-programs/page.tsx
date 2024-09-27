import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns, type TableData } from "./columns";

const data: TableData[] = [
  {
    id: "1",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "2",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "3",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "4",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "5",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "6",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "7",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "8",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "9",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
  {
    id: "10",
    name: "<Wellness Program Name>",
    goal: '"Practice mindfulness for 10 minutes each day"; "Practice mind...',
    users: 100,
    engagement: 50,
  },
];
export default async function Page() {
  return (
    <>
      <Heading variant="h1">Wellness Programs</Heading>
      <Card className="border-none">
        <CardHeader className="mb-6 flex flex-row items-center justify-between">
          <CardTitle>Program Management</CardTitle>
          <Button>New Program</Button>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </>
  );
}
