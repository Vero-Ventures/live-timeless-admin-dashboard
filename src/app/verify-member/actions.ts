"use server";

import { api } from "@/api";
import { fetchMutation } from "convex/nextjs";

export async function acceptInvitation(invitationId: string) {
  await fetchMutation(api.invitations.acceptInvitation, {
    invitationId: invitationId as any,
  });
}
