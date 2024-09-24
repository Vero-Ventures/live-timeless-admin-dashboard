import { AppSidebar } from "@/components/app-sidebar";
import MobileHeader from "@/components/mobile-header";
import { SidebarLayout } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout>
      <AppSidebar />
      <MobileHeader />
      <main className="flex h-dvh flex-1 flex-col px-8 pt-6 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </SidebarLayout>
  );
}
