import { CheckCircle } from "lucide-react";
import { acceptInvitation } from "./actions";
import { notFound } from "next/navigation";

export default async function VerifyMember(
  props: {
    searchParams: Promise<{ invitationId?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const invitationId = searchParams.invitationId;

  try {
    if (!invitationId) {
      throw new Error("No InvitationId");
    }
    await acceptInvitation(invitationId);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      notFound();
    }
  }

  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">You&apos;re Verified!</h1>
        <p>Thank you for verifying your membership.</p>
        <p className="text-center">Download our app to get started:</p>
      </div>
    </div>
  );
}
