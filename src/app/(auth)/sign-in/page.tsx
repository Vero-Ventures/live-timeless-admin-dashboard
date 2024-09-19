import { SignInForm } from "@/app/(auth)/sign-in/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <SignInForm />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold hover:underline">
          Sign up
        </Link>
      </div>
    </>
  );
}
