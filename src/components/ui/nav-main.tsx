"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavMain({
  className,
  items,
}: {
  items: {
    title: string;
    url: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
} & React.ComponentProps<"ul">) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    return pathname.includes(url);
  };

  if (!items?.length) {
    return null;
  }

  return (
    <ul className={cn("grid items-center gap-10", className)}>
      {items.map((item) => (
        <li key={item.title}>
          <Link
            href={item.url}
            className={cn(
              "flex items-center justify-between gap-2.5 overflow-hidden rounded-md py-4 ring-ring transition-all focus-visible:outline-none focus-visible:ring-2",
              {
                "text-[#86B9FF]": isActive(item.url),
                "hover:text-muted-foreground": !isActive(item.url),
              }
            )}
          >
            <span className="pl-4 text-lg font-semibold">{item.title}</span>
            {isActive(item.url) && (
              <div className="h-4 w-1 rounded-full bg-[#86B9FF]" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
