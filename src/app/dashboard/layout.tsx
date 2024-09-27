import { AppSidebar } from "@/components/app-sidebar";
import MobileHeader from "@/components/mobile-header";
import { SidebarLayout } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout>
      <AppSidebar />
      <MobileHeader />
      <main className="flex min-h-dvh flex-1 flex-col bg-background px-8 py-6 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </SidebarLayout>
  );
}
