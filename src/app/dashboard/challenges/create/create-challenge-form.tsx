"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { addDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { Zen_Tokyo_Zoo } from "next/font/google";

const REPEATS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const UNIT_TYPES = [
  "General",
  "Scalar",
  "Mass",
  "Volume",
  "Duration",
  "Energy",
  "Length",
] as const;

const challengeFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  repeat: z.string().array(),
  duration: z.object({
    from: z.date(),
    to: z.date(),
  }),
  unitType: z.enum(UNIT_TYPES),
});

type ChallengeFormSchema = z.infer<typeof challengeFormSchema>;

export default function CreateChallengeForm() {
  const form = useForm<ChallengeFormSchema>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      name: "",
      unitType: "General",
      description: "",
      repeat: REPEATS,
      duration: {
        from: new Date(),
        to: addDays(new Date(), 30),
      },
    },
  });
  const unitType = form.watch("unitType");

  function onSubmit(values: ChallengeFormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an unit type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {UNIT_TYPES.map((unitType) => (
                    <SelectItem value={unitType}>{unitType}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {unitType === "General" ? (
          <GoalSelect
            key={unitType}
            units={["times", "minutes"]}
            ranges={{
              times: {
                min: 1,
                max: 1000,
                step: 1,
              },
              minutes: {
                min: 1,
                max: 1200,
                step: 1,
              },
            }}
          />
        ) : unitType === "Scalar" ? (
          <GoalSelect
            key={unitType}
            units={["times", "steps"]}
            ranges={{
              times: {
                min: 1,
                max: 1000,
                step: 1,
              },
              steps: {
                min: 1000,
                max: 9900,
                step: 1000,
              },
            }}
          />
        ) : unitType === "Mass" ? (
          <GoalSelect
            key={unitType}
            units={["kg", "grams", "mg", "oz", "pounds", "µg"]}
            ranges={{
              kg: {
                min: 1,
                max: 1000,
                step: 1,
              },
              grams: {
                min: 5,
                max: 4995,
                step: 5,
              },
              mg: {
                min: 1,
                max: 10000,
                step: 1,
              },
              oz: {
                min: 1,
                max: 1000,
                step: 1,
              },
              pounds: {
                min: 1,
                max: 1000,
                step: 1,
              },
              µg: {
                min: 5,
                max: 4995,
                step: 5,
              },
            }}
          />
        ) : unitType === "Volume" ? (
          <GoalSelect
            key={unitType}
            units={["litres", "mL", "US fl oz", "cups"]}
            ranges={{
              litres: {
                min: 1,
                max: 1000,
                step: 1,
              },
              mL: {
                min: 100,
                max: 29900,
                step: 100,
              },
              "US fl oz": {
                min: 5,
                max: 995,
                step: 5,
              },
              cups: {
                min: 1,
                max: 1000,
                step: 1,
              },
            }}
          />
        ) : unitType === "Duration" ? (
          <GoalSelect
            key={unitType}
            units={["min", "hours"]}
            ranges={{
              min: {
                min: 1,
                max: 1200,
                step: 1,
              },
              hours: {
                min: 1,
                max: 1000,
                step: 1,
              },
            }}
          />
        ) : unitType === "Energy" ? (
          <GoalSelect
            key={unitType}
            units={["kilojoules", "cal", "kcal", "joules"]}
            ranges={{
              joules: {
                min: 1000,
                max: 99000,
                step: 1000,
              },
              kilojoules: {
                min: 50,
                max: 41950,
                step: 50,
              },
              cal: {
                min: 500,
                max: 1999500,
                step: 500,
              },
              kcal: {
                min: 100,
                max: 9900,
                step: 100,
              },
            }}
          />
        ) : unitType === "Length" ? (
          <GoalSelect
            key={unitType}
            units={["km", "metres", "feet", "yards", "miles"]}
            ranges={{
              metres: {
                min: 10,
                max: 49990,
                step: 10,
              },
              km: {
                min: 1,
                max: 1000,
                step: 1,
              },
              miles: {
                min: 1,
                max: 1000,
                step: 1,
              },
              feet: {
                min: 100,
                max: 99900,
                step: 100,
              },
              yards: {
                min: 50,
                max: 49950,
                step: 50,
              },
            }}
          />
        ) : null}
        <FormField
          control={form.control}
          name="repeat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat</FormLabel>
              <FormControl>
                <MultiSelect
                  options={REPEATS.map((opt) => ({
                    value: opt,
                    label: opt,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="How often do you want the challenge to happen?"
                  variant="inverted"
                  maxCount={7}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <DatePickerWithRange
                  date={field.value}
                  setDate={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
const RECURRENCE = ["per day", "per week", "per month"] as const;

function GoalSelect<TUnit extends string>({
  ranges,
  units,
}: {
  units: TUnit[];
  ranges: {
    [key in TUnit]: {
      min: number;
      max: number;
      step: number;
    };
  };
}) {
  const [unit, setUnit] = useState<TUnit>(units[0]);
  const { minValue, maxValue, step } = useMemo(() => {
    return {
      minValue: ranges[unit].min,
      maxValue: ranges[unit].max,
      step: ranges[unit].step,
    };
  }, [unit, ranges]);

  return (
    <div className="flex gap-2">
      <Input
        key={unit}
        type="number"
        min={minValue}
        max={maxValue}
        step={step}
        defaultValue={minValue}
      />
      <Select defaultValue={unit} onValueChange={setUnit}>
        <SelectTrigger>
          <SelectValue placeholder="Select an unit" />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectItem value={unit}>{unit}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="per day">
        <SelectTrigger>
          <SelectValue placeholder="Select an recurrence" />
        </SelectTrigger>
        <SelectContent>
          {RECURRENCE.map((recurrence) => (
            <SelectItem value={recurrence}>{recurrence}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
