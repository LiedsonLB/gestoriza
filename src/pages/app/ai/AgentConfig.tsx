import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bot, Settings, Zap } from 'lucide-react';

const AgentConfig = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuração do Agente</h1>
        <p className="text-muted-foreground">Configure seu agente de IA para atendimento automatizado</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Informações do Agente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome do Agente</Label>
              <Input placeholder="Ex: Assistente Virtual" defaultValue="Assistente ACUTIS" />
            </div>
            <div className="space-y-2">
              <Label>Idioma Principal</Label>
              <Input defaultValue="Português (BR)" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input placeholder="Descreva a função do agente..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Comportamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Ativar Agente</p>
              <p className="text-sm text-muted-foreground">O agente responderá automaticamente</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Modo de Aprendizado</p>
              <p className="text-sm text-muted-foreground">Melhorar respostas com interações</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Transferir para Humano</p>
              <p className="text-sm text-muted-foreground">Quando o agente não souber responder</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant="default" className="bg-green-500">Ativo</Badge>
            <span className="text-sm text-muted-foreground">
              Última atualização: há 2 horas
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar Configurações</Button>
      </div>
    </div>
  );
};

export default AgentConfig;
