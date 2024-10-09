import Heading from "@/components/heading";
import CreateChallengeForm from "./create-challenge-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateChallengePage() {
  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/challenges">
            <ChevronLeft />
          </Link>
        </Button>
        <Heading className="mb-0">Create Challenge</Heading>
      </div>
      <CreateChallengeForm />
    </>
  );
}
