import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  return (
    <Card className="mx-auto w-full max-w-md border-none">
      <CardHeader>
        <CardTitle className="text-center text-[28px] font-bold">
          Sign Up
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full font-semibold">
            Sign Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
