
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KeyRound, User, Users, Building } from 'lucide-react';

export default function OmniKeySolutionsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <KeyRound className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <CardTitle>萬能元鑰方案中心</CardTitle>
              <CardDescription className="mt-1">
                Omni-Key Solution Center: Explore, configure, and acquire customized solutions for your specific needs.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <p className="max-w-3xl text-muted-foreground">
                The "Omni-Key" is the key to unlocking the potential of the JunAiKey system. Each key is a comprehensive solution package designed for a specific scenario, goal, or challenge. It may include preset AI agents, automation flows (OmniFlow), knowledge base templates, and UI configurations.
            </p>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6">
          <Card>
              <CardHeader>
                  <div className="flex items-center gap-3">
                      <User className="w-6 h-6 text-primary" />
                      <CardTitle>Personal Augmentation</CardTitle>
                  </div>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground flex-grow">
                      Keys designed to enhance personal productivity and creativity, such as the "Personal Knowledge Management Master" or "Automated Content Creation Assistant."
                  </p>
                  <Button variant="outline" className="w-full">Explore Personal Solutions</Button>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-primary" />
                      <CardTitle>Team Collaboration</CardTitle>
                  </div>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground flex-grow">
                      Keys aimed at optimizing team communication, project management, and collective intelligence, like "High-Efficiency Agile Team" or "Market Research Collaboration Space."
                  </p>
                  <Button variant="outline" className="w-full">Explore Team Solutions</Button>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                   <div className="flex items-center gap-3">
                      <Building className="w-6 h-6 text-primary" />
                      <CardTitle>Enterprise Architecture</CardTitle>
                  </div>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground flex-grow">
                      Keys providing enterprise-level system integration, security compliance, and large-scale automation deployment, such as "Omni-Channel Customer Support Center."
                  </p>
                  <Button variant="outline" className="w-full">Explore Enterprise Solutions</Button>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
