"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  delegateTaskToAgent,
  type DelegateTaskToAgentOutput,
} from "@/ai/flows/delegate-task-to-agent";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  taskDescription: z.string().min(10, {
    message: "Task description must be at least 10 characters.",
  }),
  parameters: z.string().refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch (e) {
        return false;
      }
    },
    { message: "Parameters must be a valid JSON string." }
  ),
});

export function AgentNetworkForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DelegateTaskToAgentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskDescription: "",
      parameters: "{\n  \n}",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await delegateTaskToAgent(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delegate task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="taskDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Summarize the provided text."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parameters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parameters (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='e.g., { "maxLength": 100, "format": "bullet-points" }'
                    rows={4}
                    className="font-mono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Delegating..." : "Delegate Task"}
          </Button>
        </form>
      </Form>
      
      {isLoading && (
         <div className="mt-6 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
      )}

      {result && (
        <Card className="mt-6 bg-background">
          <CardHeader>
            <CardTitle>Agent Response</CardTitle>
            <CardDescription>
              Status:{" "}
              <Badge
                variant={
                  result.status === "completed"
                    ? "default"
                    : result.status === "error"
                    ? "destructive"
                    : "secondary"
                }
              >
                {result.status}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
              <code>{result.agentResponse}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
