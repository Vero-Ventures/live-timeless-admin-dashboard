"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { z } from "zod";

const companySetupFormSchema = z.object({
  name: z.string().min(1),
  industry: z.enum(["Software Development", "Real Estate", "Healthcare"]),
  size: z.enum([
    "Small - (1-10 employees)",
    "Medium - (11-50 employees)",
    "Large - (51+ employees)",
  ]),
  phone: z.string().min(1),
  country: z.enum(["United States", "Canada"]),
  address: z.string().min(1),
});

export function CompanySetupForm() {
  return (
    <Card className="mx-auto w-full max-w-md border-none">
      <CardHeader>
        <CardTitle className="text-center text-[28px] font-bold">
          Company Profile Setup
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AutoForm
            formSchema={companySetupFormSchema}
            fieldConfig={{
              name: {
                inputProps: {
                  placeholder: "Your Company Name",
                },
              },
              industry: {
                inputProps: {
                  placeholder: "Select an industry",
                },
              },
              size: {
                inputProps: {
                  placeholder: "How big is your company?",
                },
              },
              phone: {
                inputProps: {
                  type: "tel",
                  placeholder: "XXX-XXX-XXXX",
                  pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                },
              },
              country: {
                inputProps: {
                  placeholder: "Select a country",
                },
              },
              address: {
                inputProps: {
                  placeholder: "Your company address",
                },
              },
            }}
          >
            <AutoFormSubmit className="w-full font-semibold">
              Save and Continue
            </AutoFormSubmit>
          </AutoForm>
        </div>
      </CardContent>
    </Card>
  );
}
