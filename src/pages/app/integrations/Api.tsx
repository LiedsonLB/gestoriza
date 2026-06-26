import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Key, Webhook, FileText, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

const apiKeys = [
  { id: 1, name: "Produção", key: "pk_live_xxxxxxxxxxxxx", created: "01/01/2026", lastUsed: "03/01/2026" },
  { id: 2, name: "Desenvolvimento", key: "pk_test_xxxxxxxxxxxxx", created: "15/12/2025", lastUsed: "02/01/2026" },
];

const webhooks = [
  { id: 1, url: "https://myapp.com/webhook/sales", events: ["sale.created", "sale.updated"], status: "active" },
  { id: 2, url: "https://myapp.com/webhook/leads", events: ["lead.created"], status: "active" },
];

const logs = [
  { id: 1, endpoint: "POST /api/v1/leads", status: 200, time: "45ms", date: "03/01/2026 14:32" },
  { id: 2, endpoint: "GET /api/v1/contacts", status: 200, time: "23ms", date: "03/01/2026 14:30" },
  { id: 3, endpoint: "POST /api/v1/sales", status: 201, time: "89ms", date: "03/01/2026 14:28" },
  { id: 4, endpoint: "GET /api/v1/products", status: 200, time: "15ms", date: "03/01/2026 14:25" },
  { id: 5, endpoint: "POST /api/v1/leads", status: 400, time: "12ms", date: "03/01/2026 14:20" },
];

const Api = () => {
  const [showKeys, setShowKeys] = useState<{ [key: number]: boolean }>({});

  const toggleKeyVisibility = (id: number) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">API & Webhooks</h1>
        <Button variant="outline" asChild>
          <a href="#" target="_blank">
            <FileText className="mr-2 h-4 w-4" />
            Documentação
          </a>
        </Button>
      </div>

      <Tabs defaultValue="keys">
        <TabsList>
          <TabsTrigger value="keys">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks">
            <Webhook className="mr-2 h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="logs">
            <FileText className="mr-2 h-4 w-4" />
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Chaves de API</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Chave
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{apiKey.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {showKeys[apiKey.id] ? apiKey.key : "••••••••••••••••••••"}
                        </code>
                        <Button size="icon" variant="ghost" onClick={() => toggleKeyVisibility(apiKey.id)}>
                          {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Criada em {apiKey.created} • Último uso: {apiKey.lastUsed}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Webhooks</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Webhook
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <code className="text-sm">{webhook.url}</code>
                        <div className="flex gap-2 mt-2">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="outline">{event}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                          {webhook.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                        <Button size="icon" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Requisições</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tempo</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <code className="text-sm">{log.endpoint}</code>
                      </TableCell>
                      <TableCell>
                        <Badge variant={log.status < 400 ? "default" : "destructive"}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell className="text-muted-foreground">{log.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Api;