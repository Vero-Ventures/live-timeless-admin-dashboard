import Image from "next/image";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-dvh w-full bg-[url('/bg.jpg')] bg-cover bg-top">
      <div className="relative flex h-dvh flex-col items-center justify-center px-4">
        <div className="absolute left-1/2 top-16 h-[100px] w-[202px] -translate-x-1/2">
          <Image
            src="/logo.svg"
            alt="Logo"
            fill
            sizes="100%"
            width={0}
            height={0}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
