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

export function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  return (
    <Card className="mx-auto w-full max-w-md border-none">
      <CardHeader>
        <CardTitle className="text-center text-[28px] font-bold">
          {step === "signIn" ? "Sign In" : "Enter your code"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === "signIn" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              void signIn("resend-otp", formData).then(() =>
                setStep({ email: formData.get("email") as string })
              );
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
            <Button type="submit" size="lg" className="w-full font-semibold">
              Sign In
            </Button>
          </form>
        ) : (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              await signIn("resend-otp", formData);
              router.push("/dashboard/members");
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
