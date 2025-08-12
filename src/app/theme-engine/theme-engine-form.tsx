"use client";

import { useState, useEffect } from "react";
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
  generateUiTheme,
  type GenerateUiThemeOutput,
} from "@/ai/flows/generate-ui-theme";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  themePrompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});

const ThemePreview = ({
  theme,
  isLoading,
}: {
  theme: GenerateUiThemeOutput | null;
  isLoading: boolean;
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (theme) {
      setStyle({
        '--preview-primary': `hsl(${theme.colors.primary})`,
        '--preview-background': `hsl(${theme.colors.background})`,
        '--preview-accent': `hsl(${theme.colors.accent})`,
      } as React.CSSProperties);
    }
  }, [theme]);
  
  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!theme) {
    return null;
  }

  return (
    <Card className="mt-6 w-full" style={style}>
      <CardHeader>
        <CardTitle>{theme.vocabulary.title}</CardTitle>
        <CardDescription>{theme.vocabulary.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 rounded-lg bg-[var(--preview-background)] border"
             style={{ borderColor: 'var(--preview-accent)' }}>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg" style={{ color: 'var(--preview-primary)' }}>
              Theme Preview
            </h4>
            <div className="flex justify-around items-center">
              <div className="w-16 h-16 rounded-full bg-[var(--preview-primary)] flex items-center justify-center text-primary-foreground">
                Primary
              </div>
              <div className="w-16 h-16 rounded-lg bg-[var(--preview-accent)] flex items-center justify-center text-accent-foreground">
                Accent
              </div>
              <Button style={{ 
                backgroundColor: 'var(--preview-primary)', 
                color: 'hsl(var(--primary-foreground))'
              }}>
                Styled Button
              </Button>
            </div>
            <Separator className="my-4" style={{ backgroundColor: 'var(--preview-accent)' }} />
            <p className="text-sm" style={{ fontFamily: theme.font }}>
              This text is rendered in the generated font: '{theme.font}'. It demonstrates how the typography feels within the theme.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function ThemeEngineForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateUiThemeOutput | null>(null);
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
      setResult(output);

      // Optional: Apply theme to root for instant preview
      // document.documentElement.style.setProperty('--primary', output.colors.primary);
      // document.documentElement.style.setProperty('--background', output.colors.background);
      // document.documentElement.style.setProperty('--accent', output.colors.accent);

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

      <ThemePreview theme={result} isLoading={isLoading} />
      
      {result && !isLoading && (
        <Card className="mt-6 bg-background">
          <CardHeader>
            <CardTitle>Generated Theme Configuration</CardTitle>
            <CardDescription>You can copy this into your globals.css file.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
