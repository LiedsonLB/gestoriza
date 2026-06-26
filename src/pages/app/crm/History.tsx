import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, MessageSquare, DollarSign, ShoppingCart, FileText, Paperclip, Filter, User 
} from 'lucide-react';

const mockHistory = [
  {
    id: 1,
    type: 'message',
    title: 'Mensagem via WhatsApp',
    description: 'Cliente solicitou orçamento para novo projeto',
    client: 'Maria Silva',
    date: '2024-01-15T10:30:00',
    user: 'Carlos'
  },
  {
    id: 2,
    type: 'deal',
    title: 'Negócio Criado',
    description: 'Projeto Website Corporativo - R$ 15.000',
    client: 'Maria Silva',
    date: '2024-01-15T11:00:00',
    user: 'Carlos'
  },
  {
    id: 3,
    type: 'purchase',
    title: 'Compra Realizada',
    description: 'Pedido #1234 - R$ 850,00',
    client: 'João Santos',
    date: '2024-01-14T15:45:00',
    user: 'Sistema'
  },
  {
    id: 4,
    type: 'note',
    title: 'Anotação Interna',
    description: 'Cliente preferência por contato via email no período da manhã',
    client: 'Ana Costa',
    date: '2024-01-14T09:20:00',
    user: 'Ana Paula'
  },
  {
    id: 5,
    type: 'file',
    title: 'Arquivo Anexado',
    description: 'proposta_comercial_v2.pdf',
    client: 'Maria Silva',
    date: '2024-01-13T16:00:00',
    user: 'Carlos'
  },
  {
    id: 6,
    type: 'message',
    title: 'Mensagem via Email',
    description: 'Confirmação de reunião para terça-feira',
    client: 'João Santos',
    date: '2024-01-13T14:30:00',
    user: 'Ana Paula'
  },
  {
    id: 7,
    type: 'deal',
    title: 'Negócio Ganho',
    description: 'Consultoria ERP - R$ 45.000',
    client: 'Santos & Cia',
    date: '2024-01-12T17:00:00',
    user: 'Ana Paula'
  },
  {
    id: 8,
    type: 'purchase',
    title: 'Compra Realizada',
    description: 'Pedido #1230 - R$ 1.250,00',
    client: 'Maria Silva',
    date: '2024-01-12T10:15:00',
    user: 'Sistema'
  }
];

const History = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.client.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesClient = clientFilter === 'all' || item.client === clientFilter;
    return matchesSearch && matchesType && matchesClient;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'deal':
        return <DollarSign className="h-4 w-4" />;
      case 'purchase':
        return <ShoppingCart className="h-4 w-4" />;
      case 'note':
        return <FileText className="h-4 w-4" />;
      case 'file':
        return <Paperclip className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-500';
      case 'deal':
        return 'bg-green-500';
      case 'purchase':
        return 'bg-purple-500';
      case 'note':
        return 'bg-yellow-500';
      case 'file':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      message: 'Mensagem',
      deal: 'Negócio',
      purchase: 'Compra',
      note: 'Anotação',
      file: 'Arquivo'
    };
    return labels[type] || type;
  };

  const clients = [...new Set(mockHistory.map(h => h.client))];

  return (
    <div className="space-y-6">
      <div className="opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <h1 className="text-2xl font-bold text-foreground">Histórico do Cliente</h1>
        <p className="text-muted-foreground">Visão 360° das interações</p>
      </div>

      <Card className="opacity-0 animate-slide-up delay-200" style={{ animationFillMode: 'forwards' }}>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar no histórico..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-40">
                  <User className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {clients.map(client => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="message">Mensagens</SelectItem>
                  <SelectItem value="deal">Negócios</SelectItem>
                  <SelectItem value="purchase">Compras</SelectItem>
                  <SelectItem value="note">Anotações</SelectItem>
                  <SelectItem value="file">Arquivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredHistory.map((item, index) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${getTypeColor(item.type)} flex items-center justify-center text-white`}>
                      {getTypeIcon(item.type)}
                    </div>
                    {index < filteredHistory.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {getTypeBadge(item.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <div className="flex items-center gap-4 pt-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {item.client}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Por: {item.user}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(item.date).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
