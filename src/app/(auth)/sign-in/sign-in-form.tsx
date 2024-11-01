"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [error, setError] = useState("");
  const checkUserEmail = useMutation(api.users.checkUserEmail);
  const [isPending, setIsPending] = useState(false);

  return (
    <Card className="mx-auto w-full max-w-md border-none">
      <CardHeader>
        <CardTitle className="text-center text-[28px] font-bold">
          {step === "signIn" ? "Sign In" : "Enter your code"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!!error && (
          <Alert variant="destructive" className="mb-4 max-w-xl">
            <AlertCircleIcon />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {step === "signIn" ? (
          <form
            onSubmit={async (e) => {
              try {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get("email") as string;
                setError("");
                setIsPending(true);
                const user = await checkUserEmail({ email });
                if (!user) {
                  throw new Error(
                    "This email isn't registered on our platform. Please accept your email invitation to proceed."
                  );
                }
                await signIn("resend-otp", { email });
                setStep({ email });
              } catch (error) {
                if (error instanceof Error) {
                  console.log(error);
                  setError(error.message);
                }
              } finally {
                setIsPending(false);
              }
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button
              disabled={isPending}
              type="submit"
              size="lg"
              className="w-full font-semibold"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        ) : (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              await signIn("resend-otp", formData);
              router.push("/dashboard/home");
            }}
            className="grid gap-4"
          >
            <Input type="hidden" name="email" value={step.email} />
            <InputOTP
              name="code"
              className="mx-auto"
              maxLength={8}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup className="mx-auto">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>
            <Button type="submit" size="lg" className="w-full font-semibold">
              Continue
            </Button>
            <Button
              className="w-full font-semibold"
              type="button"
              variant="secondary"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
