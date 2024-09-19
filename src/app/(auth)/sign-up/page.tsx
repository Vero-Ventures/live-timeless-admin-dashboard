import Link from "next/link";
import { SignUpForm } from "./sign-up-form";
export default function SignUpPage() {
  return (
    <>
      <SignUpForm />
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </>
  );
}
