import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Settings, FileText, Send, CheckCircle, Plus } from "lucide-react";

const templates = [
  { id: 1, name: "Boas-vindas", subject: "Bem-vindo à nossa plataforma!", uses: 156 },
  { id: 2, name: "Follow-up", subject: "Não se esqueça de nós!", uses: 89 },
  { id: 3, name: "Confirmação de Compra", subject: "Sua compra foi confirmada", uses: 234 },
];

const campaigns = [
  { id: 1, name: "Newsletter Janeiro", sent: 1250, opened: 780, clicked: 245, status: "enviado" },
  { id: 2, name: "Promoção de Ano Novo", sent: 890, opened: 520, clicked: 180, status: "enviado" },
  { id: 3, name: "Lançamento Produto X", sent: 0, opened: 0, clicked: 0, status: "rascunho" },
];

const Email = () => {
  const [smtpConfig, setSmtpConfig] = useState({
    host: "smtp.example.com",
    port: "587",
    user: "noreply@example.com",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Integração Email</h1>
        <Badge variant="default" className="text-lg px-4 py-2">
          <CheckCircle className="mr-2 h-5 w-5" /> SMTP Configurado
        </Badge>
      </div>

      <Tabs defaultValue="smtp">
        <TabsList>
          <TabsTrigger value="smtp">
            <Settings className="mr-2 h-4 w-4" />
            SMTP
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="campaigns">
            <Send className="mr-2 h-4 w-4" />
            Disparos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="smtp" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuração SMTP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Host SMTP</Label>
                  <Input
                    value={smtpConfig.host}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Porta</Label>
                  <Input
                    value={smtpConfig.port}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>Usuário</Label>
                <Input
                  value={smtpConfig.user}
                  onChange={(e) => setSmtpConfig({ ...smtpConfig, user: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Senha</Label>
                <Input type="password" placeholder="••••••••" className="mt-1" />
              </div>
              <div className="flex gap-4">
                <Button>Salvar Configurações</Button>
                <Button variant="outline">Testar Conexão</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Templates de Email</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Template
            </Button>
          </div>
          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{template.uses} usos</Badge>
                      <div className="mt-2">
                        <Button size="sm" variant="ghost">Editar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Campanhas de Email</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Campanha
            </Button>
          </div>
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <Badge variant={campaign.status === "enviado" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                      {campaign.sent > 0 && (
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Enviados: {campaign.sent}</span>
                          <span>Abertos: {campaign.opened} ({Math.round((campaign.opened / campaign.sent) * 100)}%)</span>
                          <span>Cliques: {campaign.clicked} ({Math.round((campaign.clicked / campaign.sent) * 100)}%)</span>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="ghost">
                      {campaign.status === "rascunho" ? "Editar" : "Ver Detalhes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Email;