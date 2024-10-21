"use client";

import Heading from "@/components/heading";
import Link from "next/link";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/api";
import ChallengeForm from "../../challenge-form";

export default function CreateChallengePage() {
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
      <div className="mb-8 flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/challenges">
            <ChevronLeft />
          </Link>
        </Button>
        <Heading className="mb-0">Edit Challenge</Heading>
      </div>
      <ChallengeForm
        isEditing
        initialValues={{
          name: challenge.name,
          description: challenge.description,
          unitType: challenge.unitType,
          unitValue: challenge.unitValue,
          unit: challenge.unit,
          recurrence: challenge.recurrence,
          repeat: challenge.repeat,
          duration: {
            from: new Date(challenge.startDate),
            to: new Date(challenge.endDate),
          },
        }}
        challengeFunctionReference={api.challenges.updateChallenge}
      />
    </>
  );
}
