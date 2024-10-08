import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="ghost">
      <ChevronLeft />
    </Button>
  );
}
