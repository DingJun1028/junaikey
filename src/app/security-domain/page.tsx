import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Shield, Lock, Radar, UserCheck, ListChecks } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const accessLog = [
    { id: 1, user: 'Agent/CoreEngine', resource: 'KnowledgeHub/K001', action: 'READ', status: 'Success', reason: 'Routine Sync', timestamp: '2024-07-29 10:00:15' },
    { id: 2, user: 'User/Admin', resource: 'SecurityDomain/Settings', action: 'UPDATE', status: 'Success', reason: 'Policy Update', timestamp: '2024-07-29 09:45:03' },
    { id: 3, user: 'Rune/ExternalAPI', resource: 'AgentNetwork/Task05', action: 'EXECUTE', status: 'Failed', reason: 'Invalid Credentials', timestamp: '2024-07-29 09:30:41' },
    { id: 4, user: 'User/Guest', resource: 'Dashboard', action: 'LOGIN', status: 'Failed', reason: 'Unknown User', timestamp: '2024-07-29 09:25:11' },
]

export default function SecurityDomainPage() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <CardTitle className="text-2xl">萬能安全域 (Security Domain)</CardTitle>
            <CardDescription className="mt-1">Access control, encryption, and threat protection for the entire system.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               <Card>
                  <CardHeader className="pb-2">
                       <div className="flex items-center gap-3">
                          <Lock className="w-6 h-6 text-primary"/>
                          <CardTitle className="text-lg">Encryption Status</CardTitle>
                       </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                      <div className="flex justify-between items-center"><span>Core Database:</span> <Badge variant="default">AES-256 Enabled</Badge></div>
                      <div className="flex justify-between items-center"><span>API Rune Credentials:</span> <Badge variant="default">HSM-Protected</Badge></div>
                       <div className="flex justify-between items-center"><span>Communication Lines:</span> <Badge variant="default">TLS 1.3 Active</Badge></div>
                  </CardContent>
               </Card>
                <Card>
                  <CardHeader className="pb-2">
                       <div className="flex items-center gap-3">
                          <Radar className="w-6 h-6 text-primary"/>
                          <CardTitle className="text-lg">Threat Intelligence</CardTitle>
                       </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                      <div className="flex justify-between items-center"><span>Firewall Status:</span> <Badge variant="default">Active</Badge></div>
                      <p className="flex justify-between items-center"><span>Last Scan:</span> <span className="font-mono">2024-07-29 10:00</span></p>
                       <div className="flex justify-between items-center"><span>Threats Detected (24h):</span> <Badge variant="secondary">0</Badge></div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="pb-2">
                       <div className="flex items-center gap-3">
                          <UserCheck className="w-6 h-6 text-primary"/>
                          <CardTitle className="text-lg">Authentication</CardTitle>
                       </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                      <div className="flex justify-between items-center"><span>MFA Enabled:</span> <Badge>100%</Badge></div>
                      <p className="flex justify-between items-center"><span>Active Sessions:</span> <span className="font-mono">15</span></p>
                       <div className="flex justify-between items-center"><span>Login Failures (24h):</span> <Badge variant="destructive">3</Badge></div>
                  </CardContent>
               </Card>
          </div>

          <div>
               <div className="flex items-center gap-3 mb-4">
                  <ListChecks className="w-6 h-6 text-primary"/>
                  <h3 className="text-xl font-semibold">Recent Access Logs</h3>
               </div>
               <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User/Service</TableHead>
                        <TableHead>Resource</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Status</TableHead>
                         <TableHead>Reason</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accessLog.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.user}</TableCell>
                          <TableCell className="font-mono text-xs">{log.resource}</TableCell>
                          <TableCell>
                             <Badge variant="outline">{log.action}</Badge>
                          </TableCell>
                          <TableCell>
                              <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>
                                  {log.status}
                              </Badge>
                          </TableCell>
                           <TableCell className="text-muted-foreground">{log.reason}</TableCell>
                          <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
          </div>
      </CardContent>
    </Card>
  );
}
