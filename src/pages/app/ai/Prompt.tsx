import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Sparkles, AlertCircle } from 'lucide-react';

const Prompt = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Prompt / Comportamento</h1>
        <p className="text-muted-foreground">Defina como o agente deve se comportar e responder</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Prompt do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span>Este prompt define a personalidade e comportamento base do agente.</span>
          </div>
          <div className="space-y-2">
            <Label>Prompt Principal</Label>
            <Textarea 
              placeholder="Você é um assistente virtual especializado em atendimento ao cliente..."
              className="min-h-[200px]"
              defaultValue={`Você é um assistente virtual da empresa ACUTIS. Seu objetivo é ajudar clientes com dúvidas sobre produtos, serviços e suporte técnico.

Diretrizes:
- Seja sempre educado e profissional
- Responda de forma clara e objetiva
- Se não souber a resposta, encaminhe para um atendente humano
- Use o contexto da base de conhecimento para responder
- Nunca invente informações`}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Exemplos de Respostas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Saudação Inicial</Label>
              <Textarea 
                placeholder="Olá! Como posso ajudar?"
                className="min-h-[100px]"
                defaultValue="Olá! 👋 Sou o assistente virtual da ACUTIS. Como posso ajudar você hoje?"
              />
            </div>
            <div className="space-y-2">
              <Label>Despedida</Label>
              <Textarea 
                placeholder="Obrigado por entrar em contato..."
                className="min-h-[100px]"
                defaultValue="Foi um prazer ajudar! Se tiver mais dúvidas, estou por aqui. Tenha um ótimo dia! 😊"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Quando não souber responder</Label>
            <Textarea 
              placeholder="Desculpe, não encontrei essa informação..."
              className="min-h-[100px]"
              defaultValue="Essa é uma ótima pergunta! Para te ajudar melhor, vou transferir você para um de nossos especialistas. Um momento, por favor."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Restaurar Padrão</Button>
        <Button>Salvar Alterações</Button>
      </div>
    </div>
  );
};

export default Prompt;
