"use client";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, Send } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useChat } from "ai/react";

export default function ChallengeCreatePage() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat({
      maxSteps: 5,
    });
  console.log(messages);
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/challenges">
            <ChevronLeft />
          </Link>
        </Button>
        <Heading variant="h1" className="mb-0">
          Create a Challenge
        </Heading>
      </div>
      <div className="flex max-w-4xl flex-col rounded-lg bg-muted">
        <ScrollArea className="h-[calc(100dvh-56px-107px-48px)] overflow-auto">
          <AIMessage>
            Let's start by defining the main objective of your program. Are you
            focusing on physical activity, mental wellness, or something else?
            For example, if it's physical activity, a goal could be "Walk 10,000
            steps daily for a month." What would you like your team to achieve?
          </AIMessage>
          {messages.map((m) =>
            m.role === "assistant" ? (
              <AIMessage>
                {m.content}
                {m.toolInvocations?.map((toolInvocation) => {
                  const toolCallId = toolInvocation.toolCallId;
                  const addResult = (result: string) =>
                    addToolResult({ toolCallId, result });

                  // render confirmation tool (client-side tool with user interaction)
                  if (toolInvocation.toolName === "askForConfirmation") {
                    return (
                      <div key={toolCallId} className="flex flex-col gap-4">
                        {toolInvocation.args.message}
                        <div className="flex flex-col gap-4">
                          {"result" in toolInvocation ? (
                            <p>{toolInvocation.result}</p>
                          ) : (
                            <div className="flex gap-4">
                              <Button onClick={() => addResult("Yes")}>
                                Yes
                              </Button>
                              <Button onClick={() => addResult("No")}>
                                No
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // other tools:
                  return "result" in toolInvocation ? (
                    toolInvocation.toolName === "suggestHealthChallengeGoal" ? (
                      <div key={toolCallId}>
                        <div>Target: {toolInvocation.result.target}</div>
                        <div>Activity: {toolInvocation.result.activity}</div>
                      </div>
                    ) : (
                      <div key={toolCallId}>
                        Tool call {`${toolInvocation.toolName}: `}
                        {toolInvocation.result}
                      </div>
                    )
                  ) : (
                    <div key={toolCallId}>
                      Calling {toolInvocation.toolName}...
                    </div>
                  );
                })}
              </AIMessage>
            ) : (
              <Message>{m.content}</Message>
            )
          )}
        </ScrollArea>
        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-2 border-t p-4"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Send a message..."
            className="h-full w-full items-center rounded-b-lg rounded-t-none border-0 p-4 text-lg focus-visible:ring-transparent focus-visible:ring-offset-transparent"
          />
          <Button size="lg" className="h-full items-center">
            <Send />
          </Button>
        </form>
      </div>
    </>
  );
}

interface MessageProps {
  children: ReactNode;
}

function AIMessage({ children }: MessageProps) {
  return (
    <div className="flex flex-col gap-4 bg-[#102b46] p-6 first:rounded-t-lg">
      <div className="whitespace-pre-wrap font-semibold">{children}</div>
      <div className="text-gray-400">LT AI Advisor</div>
    </div>
  );
}
function Message({ children }: MessageProps) {
  return (
    <div className="flex flex-col items-end gap-4 bg-[#153555] p-6">
      <div className="whitespace-pre-wrap">{children}</div>
      <div className="text-gray-400">You</div>
    </div>
  );
}
