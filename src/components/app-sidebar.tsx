import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavMain } from "@/components/ui/nav-main";
import Link from "next/link";

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard/home",
  },
  {
    title: "Challenges",
    url: "/dashboard/challenges",
  },
  {
    title: "Report and Analytics",
    url: "/dashboard/report-analytics",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/dashboard/home"
          className="relative mx-auto mt-8 h-[36px] w-[151px] px-4 py-1.5"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            fill
            sizes="100%"
            width={0}
            height={0}
            quality={100}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-8">
        <SidebarItem className="flex flex-1 flex-col justify-center">
          <NavMain items={navMain} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
