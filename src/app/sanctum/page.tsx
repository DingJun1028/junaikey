
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Terminal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SanctumPage() {
    const [history, setHistory] = useState<string[]>(['Welcome to the AI Core Sanctum. Type `help` to see available commands.']);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);

    const commands: { [key: string]: () => Promise<string> } = {
        'help': async () => 'Available commands: `help`, `core-analyze`, `status`, `clear`',
        'core-analyze': async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
            return `
SYSTEM HEALTH ANALYSIS REPORT
-----------------------------
Timestamp: ${new Date().toISOString()}
Overall Status: \x1b[32mOK\x1b[0m

[Core Engine]
- CPU Load: 15.7%
- Memory Usage: 2.3GB / 8GB
- Uptime: 7d 4h 12m

[Agent Network]
- Active Agents: 48
- Avg. Response Time: 120ms
- Task Success Rate: 99.8%

[Knowledge Hub]
- Vector DB Size: 1.2M vectors
- Last Sync: 2 minutes ago
- Sync Status: \x1b[32mOperational\x1b[0m

[Security Domain]
- Threats Detected (24h): 0
- Firewall Status: \x1b[32mActive\x1b[0m
- RLS Policies: 128 active

Analysis Complete.
`;
        },
        'status': async () => 'All systems operational. Ready for your command, First Architect.',
        'clear': async () => {
            setHistory([]);
            return '';
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        const command = input.trim().toLowerCase();
        const newHistory = [...history, `> ${input}`];
        setInput('');

        if (command in commands) {
            const output = await commands[command]();
            if(output) newHistory.push(output);
            setHistory(newHistory);
        } else if(command) {
            newHistory.push(`Command not found: ${command}. Type 'help' for available commands.`);
            setHistory(newHistory);
        } else {
             setHistory(newHistory);
        }
    };
    
    // Function to parse ANSI escape codes for color
    const parseAnsi = (text: string) => {
        const ansiRegex = /(\x1b\[(\d+)?m)/g;
        let parts = text.split(ansiRegex);
        let result = [];
        let style = {};

        for(let i = 0; i < parts.length; i++) {
            if (parts[i] && parts[i].startsWith('\x1b[')) {
                 const code = parts[i+1];
                 if(code === '32') style = {color: '#22c55e'}; // green
                 if(code === '0') style = {};
                 i += 2; // Skip the ansi code parts
            } else if (parts[i]) {
                result.push(<span style={style} key={i}>{parts[i]}</span>);
            }
        }
        return result;
    }


  return (
    <Card className="font-mono">
      <CardHeader>
        <div className="flex items-center gap-4">
          <FileText className="w-8 h-8 text-primary font-sans" />
          <div>
            <CardTitle className="text-2xl font-sans">AI 核心終端 (AI Core Sanctum)</CardTitle>
            <CardDescription className="font-sans">與系統的 AI 核心直接對話。</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-black text-white rounded-lg p-4 h-96 overflow-y-auto" ref={terminalRef}>
            {history.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap text-sm leading-6">
                    {parseAnsi(line)}
                </div>
            ))}
            {isLoading && <Loader2 className="h-5 w-5 animate-spin mt-2" />}
        </div>
        <form onSubmit={handleCommand} className="mt-4 flex gap-2">
            <div className="flex items-center">
                <Terminal className="h-5 w-5 text-muted-foreground" />
                <span className="ml-2 text-primary">{'>'}</span>
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 p-0"
                placeholder="Enter a command..."
                disabled={isLoading}
                autoFocus
            />
        </form>
      </CardContent>
    </Card>
  );
}
