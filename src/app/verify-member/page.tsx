import { CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default function VerifyMember({
  searchParams,
}: {
  searchParams: { invitationId?: string };
}) {
  const invitationId = searchParams.invitationId;
  if (!invitationId) {
    return notFound();
  }
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">You're Verified!</h1>
        <p>Thank you for verifying your membership.</p>
        <p className="text-center">Download our app to get started:</p>
      </div>
    </div>
  );
}
