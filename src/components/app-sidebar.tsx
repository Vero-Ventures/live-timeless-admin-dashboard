"use client";
import { Home, Target, Users2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import UserNav from "./user-nav";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    title: "Challenges",
    url: "/dashboard/challenges",
    icon: Target,
  },
  {
    title: "Members",
    url: "/dashboard/members",
    icon: Users2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <Link
          href="/dashboard/home"
          className="relative mx-auto my-4 h-[36px] w-[151px]"
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    isActive={pathname.includes(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-8" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
