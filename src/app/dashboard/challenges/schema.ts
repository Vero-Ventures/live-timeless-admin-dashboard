import { z } from "zod";
import { RECURRENCE, UNIT_TYPES } from "./constants";

export const challengeFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  repeat: z.string().array(),
  duration: z.object({
    from: z.date(),
    to: z.date(),
  }),
  unitType: z.enum(UNIT_TYPES),
  unitValue: z.coerce.number(),
  unit: z.string(),
  recurrence: z.enum(RECURRENCE),
  tokens: z.coerce
    .number()
    .min(0, "Please enter a token value to award your employees with."),
});

export type ChallengeFormSchema = z.infer<typeof challengeFormSchema>;
