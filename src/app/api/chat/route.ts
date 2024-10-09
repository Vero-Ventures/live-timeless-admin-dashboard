import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    system:
      "Sets a single specific health target for user's employees health and fitness based on the user's general goal",
    messages: convertToCoreMessages(messages),
    maxSteps: 5,
    toolChoice: "required",
    tools: {
      // server-side tool with execute function:
      getWeatherInformation: tool({
        description:
          "Show the weather in a given city to the user. Always ask for confirmation before using this tool.",
        parameters: z.object({ city: z.string() }),
        execute: async ({}: { city: string }) => {
          const weatherOptions = ["sunny", "cloudy", "rainy", "snowy", "windy"];
          return weatherOptions[
            Math.floor(Math.random() * weatherOptions.length)
          ];
        },
      }),
      // server-side tool with execute function:
      suggestHealthChallengeGoal: tool({
        description:
          "Suggests a specific measureable health challenge target based on the user's general goal. (example: { activity: Practice mindfulness, target: 10 minutes each day })",
        parameters: z.object({
          goal: z
            .string()
            .describe("The health system the user wants to improve"),
          target: z
            .string()
            .describe("the specific health challenge goal target"),
          activity: z.string().describe("the activity recommended to the user"),
        }),
        execute: async ({ target, activity }) => {
          return {
            target,
            activity,
          };
        },
      }),
      // client-side tool that starts user interaction:
      askForConfirmation: tool({
        description: "Ask the user for confirmation.",
        parameters: z.object({
          message: z.string().describe("The message to ask for confirmation."),
        }),
      }),
      // client-side tool that is automatically executed on the client:
      getLocation: tool({
        description:
          "Get the user location. Always ask for confirmation before using this tool.",
        parameters: z.object({}),
        execute: async () => {},
      }),
    },
  });

  return result.toDataStreamResponse();
}
