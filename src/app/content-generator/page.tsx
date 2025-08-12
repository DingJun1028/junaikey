
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Rocket, Loader2, Wand2 } from 'lucide-react';
import {
  generateContent,
  type GenerateContentOutput,
} from '@/ai/flows/generate-content';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
});

export default function ContentGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateContentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateContent(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to generate content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Rocket className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">內容生成器 (Content Generator)</CardTitle>
            <CardDescription>
              輸入一個主題，AI 將為您生成一份包含標題、目標和活動的完整課程計畫。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>課程主題</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 商務會議常用短語 (Common Phrases for Business Meetings)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              {isLoading ? '生成中...' : '生成課程計畫'}
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="mt-6 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <Separator />
            <Card>
              <CardHeader>
                <CardTitle>{result.courseTitle}</CardTitle>
                {result.targetAudience && (
                  <CardDescription>
                    目標學員: {result.targetAudience}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">學習目標</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {result.learningObjectives.map((obj, index) => (
                      <li key={index}>{obj}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">課程活動</h3>
                  <div className="space-y-3">
                    {result.activities.map((activity, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                        <div className="mt-2">
                          <Badge variant="outline">
                            時長: {activity.durationMinutes} 分鐘
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
