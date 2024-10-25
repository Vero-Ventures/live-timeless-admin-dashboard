import Image from "next/image";
import { MobileSidebarTrigger } from "./ui/sidebar";

export default function MobileHeader() {
  return (
    <header className="flex items-center justify-between bg-sidebar px-4 py-6 md:hidden">
      <div className="relative h-[36px] w-[30px] px-4 py-1.5">
        <Image
          src="/icon.svg"
          alt="Logo Icon"
          fill
          sizes="100%"
          width={0}
          height={0}
          quality={100}
        />
      </div>
      <MobileSidebarTrigger />
    </header>
  );
}
