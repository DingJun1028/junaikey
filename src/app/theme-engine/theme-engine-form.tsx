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
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateUiTheme } from "@/ai/flows/generate-ui-theme";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  themePrompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});

export function ThemeEngineForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      themePrompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateUiTheme(values);
      setResult(output.theme);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate theme. Please try again.",
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
            name="themePrompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., A theme for a space exploration app, with dark blues, purples, and glowing accents. Modern and futuristic."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate Theme"}
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
            <CardTitle>Generated Theme Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
              <code>{result}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
