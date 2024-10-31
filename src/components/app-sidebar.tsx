"use client";
import { Building2Icon, HomeIcon, TargetIcon, Users2Icon } from "lucide-react";

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
import { api } from "@/api";
import { useQuery } from "convex/react";

const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: HomeIcon,
  },
  {
    title: "Challenges",
    url: "/dashboard/challenges",
    icon: TargetIcon,
  },
  {
    title: "Members",
    url: "/dashboard/members",
    icon: Users2Icon,
  },
];

export function AppSidebar() {
  const user = useQuery(api.users.currentUser);
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
        {user && (
          <div className="flex items-center gap-2 p-4">
            <div className="rounded-lg bg-primary p-1 text-center">
              <Building2Icon />
            </div>
            <span className="font-semibold">{user.organization.name}</span>
          </div>
        )}
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
