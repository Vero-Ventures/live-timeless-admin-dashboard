"use client";

import { BadgeCheck, Bell, CreditCard, LogOut, User2Icon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "convex/react";
import { api } from "@/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export function NavUser() {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const user = useQuery(api.users.currentUser);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-full bg-accent px-2.5 py-1.5 outline-none ring-ring hover:bg-muted focus-visible:ring-2 data-[state=open]:bg-accent">
        <div className="flex items-center gap-4 px-2 py-1.5 text-left text-sm transition-all">
          <Avatar className="size-10 rounded-full">
            <AvatarImage
              src={user?.avatar}
              alt={user?.name}
              className="animate-in fade-in-50 zoom-in-90"
            />
            <AvatarFallback className="rounded-md">
              <User2Icon className="size-6" />
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 leading-none">
            <div className="text-base font-semibold">{user?.name}</div>
            <div className="overflow-hidden text-xs">
              <div className="line-clamp-1">{user?.email}</div>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
            <Avatar className="h-7 w-7 rounded-md">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                <User2Icon className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1">
              <div className="font-medium">{user?.name}</div>
              <div className="overflow-hidden text-xs text-muted-foreground">
                <div className="line-clamp-1">{user?.email}</div>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2">
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={async () => {
            await signOut();
            router.push("/sign-in");
          }}
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
