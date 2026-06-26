import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MessageCircle, Mail, Globe, Phone, Plug } from 'lucide-react';

const integrations = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Integre o agente com sua conta do WhatsApp Business',
    icon: MessageCircle,
    connected: true,
    color: 'bg-green-500/20 text-green-500',
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Responda emails automaticamente com o agente',
    icon: Mail,
    connected: false,
    color: 'bg-blue-500/20 text-blue-500',
  },
  {
    id: 'website',
    name: 'Chat do Site',
    description: 'Widget de chat para seu site',
    icon: Globe,
    connected: true,
    color: 'bg-purple-500/20 text-purple-500',
  },
  {
    id: 'phone',
    name: 'Telefone (URA)',
    description: 'Atendimento por voz com IA',
    icon: Phone,
    connected: false,
    color: 'bg-orange-500/20 text-orange-500',
  },
];

const AgentIntegrations = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Integrações do Agente</h1>
        <p className="text-muted-foreground">Conecte o agente a diferentes canais de atendimento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                    <integration.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <Badge variant={integration.connected ? 'default' : 'secondary'}>
                  {integration.connected ? 'Conectado' : 'Desconectado'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch checked={integration.connected} />
                  <span className="text-sm text-muted-foreground">
                    {integration.connected ? 'Agente ativo neste canal' : 'Agente desativado'}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            API do Agente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Use a API para integrar o agente em suas próprias aplicações.
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <code>POST https://api.acutis.com/v1/agent/chat</code>
          </div>
          <Button variant="outline">Ver Documentação</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentIntegrations;
