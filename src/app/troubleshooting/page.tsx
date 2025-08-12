"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LifeBuoy, Send } from 'lucide-react';

export default function TroubleshootingPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <LifeBuoy className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-2xl">疑難雜症需求中心 (Troubleshooting & Request Center)</CardTitle>
              <CardDescription className="mt-1">
                Encountered an issue or have a new feature idea? Submit your request here and let the system evolve with you.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Card>
          <CardHeader>
            <CardTitle>Submit a New Request</CardTitle>
            <CardDescription>Provide details about your bug report or feature suggestion.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Request Title</Label>
                    <Input id="title" placeholder="e.g., Integration with Google Calendar" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="type">Request Type</Label>
                     <Select>
                        <SelectTrigger id="type">
                            <SelectValue placeholder="Select a type..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="integration">Integration Request</SelectItem>
                             <SelectItem value="other">Other Inquiry</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea id="description" rows={6} placeholder="Please describe the issue, your expectation, or how the new feature should work in as much detail as possible." />
                </div>
                <div className="flex justify-end">
                    <Button>
                        <Send className="mr-2" />
                        Submit Request
                    </Button>
                </div>
            </form>
          </CardContent>
      </Card>
    </div>
  );
}
