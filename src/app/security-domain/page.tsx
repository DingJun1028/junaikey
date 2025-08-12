import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Shield, Lock, KeyRound, ListChecks, Radar, UserCheck } from "lucide-react";
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
    { id: 1, user: 'Agent/CoreEngine', resource: 'KnowledgeHub/K001', action: 'READ', status: 'Success', timestamp: '2024-07-29 10:00:15' },
    { id: 2, user: 'User/Admin', resource: 'SecurityDomain/Settings', action: 'UPDATE', status: 'Success', timestamp: '2024-07-29 09:45:03' },
    { id: 3, user: 'Rune/ExternalAPI', resource: 'AgentNetwork/Task05', action: 'EXECUTE', status: 'Failed', reason: 'Invalid Credentials', timestamp: '2024-07-29 09:30:41' },
    { id: 4, user: 'User/Guest', resource: 'Dashboard', action: 'LOGIN', status: 'Failed', reason: 'Unknown User', timestamp: '2024-07-29 09:25:11' },
]

export default function SecurityDomainPage() {
  return (
    <div className="container mx-auto py-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">萬能安全域 (Security Domain)</CardTitle>
              <CardDescription>存取控制、加密與威脅防護。</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <Card className="p-4">
                    <CardHeader className="p-2 pt-0">
                         <div className="flex items-center gap-3">
                            <Lock className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-lg">加密狀態</CardTitle>
                         </div>
                    </CardHeader>
                    <CardContent className="text-sm p-2 pt-0 space-y-2">
                        <div className="flex justify-between"><span>核心數據庫:</span> <Badge variant="default">AES-256 Enabled</Badge></div>
                        <div className="flex justify-between"><span>API 符文憑證:</span> <Badge variant="default">HSM-Protected</Badge></div>
                         <div className="flex justify-between"><span>通訊線路:</span> <Badge variant="default">TLS 1.3 Active</Badge></div>
                    </CardContent>
                 </Card>
                  <Card className="p-4">
                    <CardHeader className="p-2 pt-0">
                         <div className="flex items-center gap-3">
                            <Radar className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-lg">威脅情報</CardTitle>
                         </div>
                    </CardHeader>
                    <CardContent className="text-sm p-2 pt-0 space-y-2">
                        <div className="flex justify-between"><span>防火牆狀態:</span> <Badge variant="default">Active</Badge></div>
                        <p className="flex justify-between"><span>上次掃描:</span> <span className="font-mono">2024-07-29 10:00</span></p>
                         <div className="flex justify-between"><span>偵測到的威脅:</span> <Badge variant="destructive">0</Badge></div>
                    </CardContent>
                 </Card>
                 <Card className="p-4">
                    <CardHeader className="p-2 pt-0">
                         <div className="flex items-center gap-3">
                            <UserCheck className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-lg">身份驗證</CardTitle>
                         </div>
                    </CardHeader>
                    <CardContent className="text-sm p-2 pt-0 space-y-2">
                        <div className="flex justify-between"><span>MFA 啟用率:</span> <Badge>100%</Badge></div>
                        <p className="flex justify-between"><span>活躍會話:</span> <span className="font-mono">15</span></p>
                         <div className="flex justify-between"><span>登入失敗 (24h):</span> <Badge variant="secondary">3</Badge></div>
                    </CardContent>
                 </Card>
            </div>

            <div>
                 <div className="flex items-center gap-3 mb-4">
                    <ListChecks className="w-6 h-6 text-primary"/>
                    <h3 className="text-xl font-semibold">最近訪問日誌</h3>
                 </div>
                 <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>使用者/服務</TableHead>
                          <TableHead>資源</TableHead>
                          <TableHead>動作</TableHead>
                          <TableHead>狀態</TableHead>
                          <TableHead>時間戳</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {accessLog.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.user}</TableCell>
                            <TableCell>{log.resource}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>
                                <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>
                                    {log.status}
                                </Badge>
                                {log.reason && <p className="text-xs text-muted-foreground">{log.reason}</p>}
                            </TableCell>
                            <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
