"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { RECURRENCE, REPEATS, UNIT_RANGES, UNIT_TYPES } from "../constants";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "@/api";
import { useRouter } from "next/navigation";
import { challengeFormSchema, ChallengeFormSchema } from "../schema";

export default function CreateChallengeForm() {
  const router = useRouter();
  const createChallenge = useMutation(api.challenges.createChallenge);
  const form = useForm<ChallengeFormSchema>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      unitType: "General",
      unitValue: 1,
      unit: "times",
      recurrence: "per day",
      repeat: REPEATS,
      duration: {
        from: new Date(),
        to: addDays(new Date(), 30),
      },
    },
  });

  const unitType = form.watch("unitType");
  const unit = form.watch("unit");

  const units = Object.keys(UNIT_RANGES[unitType]);

  const minValue = UNIT_RANGES[unitType][unit].min;
  const maxValue = UNIT_RANGES[unitType][unit].max;
  const step = UNIT_RANGES[unitType][unit].step;

  async function onSubmit(values: ChallengeFormSchema) {
    console.log(values);
    await createChallenge({
      name: values.name,
      description: values.description,
      repeat: values.repeat,
      unitType: values.unitType,
      unit: values.unit,
      unitValue: values.unitValue,
      recurrence: values.recurrence,
      startDate: values.duration.from.getTime(),
      endDate: values.duration.to.getTime(),
    });
    router.replace("/dashboard/challenges");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-8"
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
              <Select
                onValueChange={(unitType: (typeof UNIT_TYPES)[number]) => {
                  const units = Object.keys(UNIT_RANGES[unitType]);
                  form.setValue("unit", units[0]);
                  form.setValue(
                    "unitValue",
                    UNIT_RANGES[unitType][units[0]].min
                  );
                  field.onChange(unitType);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an unit type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {UNIT_TYPES.map((unitType) => (
                    <SelectItem key={unitType} value={unitType}>
                      {unitType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Label>Goal</Label>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="unitValue"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="number"
                      min={minValue}
                      max={maxValue}
                      step={step}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    key={unitType}
                    onValueChange={(unit) => {
                      form.setValue(
                        "unitValue",
                        UNIT_RANGES[unitType][unit].min
                      );
                      field.onChange(unit);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recurrence"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a recurrence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RECURRENCE.map((recurrence) => (
                        <SelectItem key={recurrence} value={recurrence}>
                          {recurrence}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
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
        <Button type="submit" size="lg" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
