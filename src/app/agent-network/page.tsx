import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Network, Search, UserPlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
const agents = [
    { id: 'agent-001', name: 'Market Analysis Agent', level: 3, engagement: 92, accuracy: 95, status: 'Active' },
    { id: 'agent-002', name: 'Customer Support Bot', level: 2, engagement: 88, accuracy: 91, status: 'Active' },
    { id: 'agent-003', name: 'Data Sync Core', level: 4, engagement: 99, accuracy: 99.8, status: 'Active' },
    { id: 'agent-004', name: 'Content Generation Sprite', level: 2, engagement: 85, accuracy: 89, status: 'Idle' },
    { id: 'agent-005', name: 'Security Audit Guardian', level: 5, engagement: 100, accuracy: 100, status: 'System' },
 { id: 'jules-agent-001', name: 'Jules Conversational Agent', level: 1, engagement: 75, accuracy: 80, status: 'Active' },
 { id: 'straico-agent-001', name: 'Straico AI Agent', level: 1, engagement: 70, accuracy: 85, status: 'Active' },

];

export default function AgentNetworkPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 const [conversation, setConversation] = useState<{ sender: 'user' | 'agent'; text: string }[]>([]);
 const [selectedAgent, setSelectedAgent] = useState('jules');
 
  const sendMessageToJules = async () => {
    if (!message.trim()) {
      alert("Message cannot be empty."); // Or use a more sophisticated notification system
      return;
    }
    setIsLoading(true);
 setConversation([...conversation, { sender: 'user', text: message }]);
 const endpoint = `/api/aiIntegration`; // Use the generic endpoint
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        // Add Authorization header here with your API key if you implemented authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, agentType: selectedAgent }), // Include selectedAgent
      });
 const data: { reply: string } = await res.json();
      setConversation(prevConversation => [...prevConversation, { sender: 'agent', text: data.reply }]);
    } catch (error) {
      console.error("Error interacting with Jules agent:", error);
      setConversation(prevConversation => [...prevConversation, { sender: 'agent', text: "Error communicating with the agent." }]);
    } finally {
      setIsLoading(false);
      setMessage(""); // Reset message input after sending
    }
    }
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Network className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>萬能代理網絡</CardTitle>
              <CardDescription>Agent Network: Manage and monitor all AI agents operating within the system.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Agent Fleet</CardTitle>
                    <CardDescription>An overview of all active and idle agents.</CardDescription>
                </div>
                <Button><UserPlus className="mr-2 h-4 w-4"/>New Agent</Button>
            </div>
             <div className="pt-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by agent name or ID..." className="pl-8" />
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono">Lv.{agent.level}</Badge>
                    </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={agent.engagement} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{agent.engagement}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Progress value={agent.accuracy} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{agent.accuracy}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={agent.status === 'Active' ? 'default' : agent.status === 'System' ? 'secondary' : 'outline' }>{agent.status}</Badge>
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interact with Jules Agent</CardTitle>
          <CardDescription>Send a message to the integrated Jules agent.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessageToJules} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </div>
          <div className="space-y-4 h-64 overflow-y-auto border p-4 rounded-md">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-lg p-3 max-w-[70%] ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-center">Loading...</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
