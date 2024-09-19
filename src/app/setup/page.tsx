import { CompanySetupForm } from "./company-setup-form";

export default function SetupPage() {
  return (
    <main className="h-dvh w-full bg-[url('/bg.jpg')] bg-cover bg-top">
      <div className="relative flex h-dvh flex-col items-center justify-center px-4">
        <CompanySetupForm />
      </div>
    </main>
  );
}
