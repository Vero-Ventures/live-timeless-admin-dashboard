"use client";

import Heading from "@/components/heading";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChallengeForm from "../challenge-form";
import { api } from "@/api";

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
      <ChallengeForm
        challengeFunctionReference={api.challenges.createChallenge}
      />
    </>
  );
}
