import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, Infinity, Target } from "lucide-react";
import Link from "next/link";

export default function SingleChallengePage() {
  return (
    <>
      <div className="mb-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/challenges">
            <ChevronLeft />
          </Link>
        </Button>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <Heading className="mb-0">Challenge Name</Heading>
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
        <Button className="w-full xl:w-fit">Invite Users</Button>
      </div>
    </>
  );
}
