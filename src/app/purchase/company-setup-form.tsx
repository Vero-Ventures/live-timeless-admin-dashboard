"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CompanySetupForm() {
  return (
    <Card className="mx-auto w-full max-w-md border-none">
      <CardHeader>
        <CardTitle className="text-center text-[28px] font-bold">
          Purchase LT Tokens
        </CardTitle>
        <CardDescription className="text-center text-lg">
          Select a package
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PackageCard title="135,000 Tokens" price={100} />
          <PackageCard title="435,000 Tokens" price={300} />
          <PackageCard title="1,350,000 Tokens" price={1000} />
        </div>
      </CardContent>
    </Card>
  );
}

interface PackageCardProps {
  title: string;
  price: number;
}

function PackageCard({ title, price }: PackageCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-muted p-4">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p>${price}</p>
    </div>
  );
}
