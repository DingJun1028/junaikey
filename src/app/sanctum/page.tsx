
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Terminal, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';


export default function SanctumPage() {
    const [history, setHistory] = useState<{ type: 'command' | 'response', content: string }[]>([
        { type: 'response', content: 'Welcome to the AI Core Sanctum. Paste your code into the text area and type your analysis request below.' }
    ]);
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history, isLoading]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading || !input.trim() || !code.trim()) {
            if (!code.trim()) {
                toast({ title: "Code is required", description: "Please paste some code to analyze.", variant: "destructive" });
            }
             if (!input.trim()) {
                toast({ title: "Command is required", description: "Please enter a command or question.", variant: "destructive" });
            }
            return;
        }

        const commandText = input;
        const newHistory = [...history, { type: 'command' as 'command', content: commandText }];
        setHistory(newHistory);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/execute-sacred-command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    command: {
                        endpoint: "code-analysis",
                        params: { code: code },
                        user: "PrimeArchitect",
                        context: commandText
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setHistory(prev => [...prev, { type: 'response' as 'response', content: result.response }]);

        } catch (error: any) {
            console.error("Error executing command:", error);
            toast({
                title: "Error",
                description: `Failed to execute command: ${error.message}`,
                variant: "destructive",
            });
            // remove the command from history on failure to allow retry
            setHistory(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };
    
  return (
    <div className="flex flex-col h-full gap-6">
        <Card className="flex-shrink-0">
            <CardHeader>
                <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-primary font-sans flex-shrink-0" />
                <div>
                    <CardTitle className="text-2xl font-sans">AI 核心終端 (AI Core Sanctum)</CardTitle>
                    <CardDescription className="font-sans mt-1">A direct conversational interface with the system's AI core. Paste your code and issue commands for analysis.</CardDescription>
                </div>
                </div>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder="Paste your code here..."
                    className="h-48 font-mono bg-muted"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={isLoading}
                />
            </CardContent>
        </Card>

        <Card className="flex-1 flex flex-col">
            <CardHeader>
                <CardTitle>Analysis & Output</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto" ref={terminalRef}>
                <div className="space-y-4">
                    {history.map((item, index) => (
                        <div key={index}>
                            {item.type === 'command' ? (
                                <p className="font-mono text-sm text-primary">{`> ${item.content}`}</p>
                            ) : (
                                 <div className="prose prose-sm dark:prose-invert max-w-none">
                                     <SyntaxHighlighter
                                        language="markdown"
                                        style={vscDarkPlus}
                                        customStyle={{ margin: 0, padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'hsl(var(--muted))' }}
                                        wrapLongLines
                                    >
                                        {item.content}
                                    </SyntaxHighlighter>
                                 </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Core Engine is thinking...</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardContent className="border-t pt-6">
                <form onSubmit={handleCommand} className="flex gap-2">
                    <div className="flex items-center">
                        <Terminal className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., 'Analyze this code for potential improvements' or 'Check for security issues'"
                        disabled={isLoading}
                        autoFocus
                    />
                    <Button type="submit" disabled={isLoading || !code.trim() || !input.trim()}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Execute"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
