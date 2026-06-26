import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, RotateCcw } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'agent';
  content: string;
}

const AgentTesting = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'agent', content: 'Olá! 👋 Sou o assistente virtual da ACUTIS. Como posso ajudar você hoje?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
    };
    
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: messages.length + 2,
        role: 'agent',
        content: 'Obrigado pela sua mensagem! Esta é uma resposta de teste do agente. Em produção, a resposta seria gerada pela IA baseada na sua base de conhecimento e prompt configurado.',
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const resetChat = () => {
    setMessages([
      { id: 1, role: 'agent', content: 'Olá! 👋 Sou o assistente virtual da ACUTIS. Como posso ajudar você hoje?' }
    ]);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testes do Agente</h1>
          <p className="text-muted-foreground">Teste as respostas do agente antes de publicar</p>
        </div>
        <Button variant="outline" onClick={resetChat} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </Button>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="h-5 w-5 text-primary" />
            Simulador de Conversa
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Digite uma mensagem para testar..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dicas de Teste</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Teste perguntas sobre produtos e serviços</li>
            <li>Verifique se o agente usa a base de conhecimento corretamente</li>
            <li>Teste cenários onde o agente não sabe a resposta</li>
            <li>Verifique o tom e a personalidade das respostas</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentTesting;
