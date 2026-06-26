import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Phone,
  Mail,
  DollarSign,
  GripVertical
} from 'lucide-react';

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  phone: string;
  tags: string[];
}

interface FunnelStage {
  id: string;
  title: string;
  color: string;
  deals: Deal[];
}

const initialStages: FunnelStage[] = [
  {
    id: 'lead',
    title: 'Cliente Novo',
    color: 'bg-blue-500',
    deals: [
      { id: 1, name: 'João Silva', company: 'Tech Corp', value: 2500, phone: '(11) 99999-1234', tags: ['WhatsApp'] },
      { id: 2, name: 'Maria Santos', company: 'Digital SA', value: 5000, phone: '(11) 99999-5678', tags: ['Site'] },
    ],
  },
  {
    id: 'qualification',
    title: 'Qualificação',
    color: 'bg-yellow-500',
    deals: [
      { id: 3, name: 'Pedro Costa', company: 'Startup Inc', value: 8000, phone: '(11) 99999-9012', tags: ['Indicação'] },
    ],
  },
  {
    id: 'proposal',
    title: 'Proposta',
    color: 'bg-purple-500',
    deals: [
      { id: 4, name: 'Ana Lima', company: 'Commerce Ltd', value: 12000, phone: '(11) 99999-3456', tags: ['B2B', 'Premium'] },
      { id: 5, name: 'Carlos Souza', company: 'Retail Group', value: 3500, phone: '(11) 99999-7890', tags: ['Quente'] },
    ],
  },
  {
    id: 'negotiation',
    title: 'Negociação',
    color: 'bg-orange-500',
    deals: [
      { id: 6, name: 'Fernanda Oliveira', company: 'Services Pro', value: 15000, phone: '(11) 99999-1111', tags: ['Premium'] },
    ],
  },
  {
    id: 'closed',
    title: 'Fechado',
    color: 'bg-green-500',
    deals: [
      { id: 7, name: 'Roberto Alves', company: 'Enterprise Co', value: 25000, phone: '(11) 99999-2222', tags: ['Enterprise'] },
    ],
  },
];

const Funnel = () => {
  const [stages] = useState(initialStages);

  const totalValue = stages.reduce(
    (acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + deal.value, 0),
    0
  );

  const totalDeals = stages.reduce((acc, stage) => acc + stage.deals.length, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Funil de Vendas</h1>
          <p className="text-muted-foreground">
            {totalDeals} negócios • {formatCurrency(totalValue)} em pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={16} />
            Filtros
          </Button>
          {/* <Button size="sm" className="gap-2">
            <Plus size={16} />
            Novo Negócio
          </Button> */}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4 opacity-0 animate-slide-up delay-200" style={{ animationFillMode: 'forwards' }}>
        <div className="flex gap-4 min-w-max">
          {stages.map((stage) => {
            const stageValue = stage.deals.reduce((sum, deal) => sum + deal.value, 0);
            
            return (
              <div key={stage.id} className="w-80 flex-shrink-0">
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    <h3 className="font-medium text-foreground">{stage.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {stage.deals.length}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(stageValue)}
                  </span>
                </div>

                {/* Stage Content */}
                <div className="space-y-3 min-h-[500px] p-2 rounded-lg bg-muted/30 border border-border">
                  {stage.deals.map((deal) => (
                    <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <GripVertical size={14} className="text-muted-foreground" />
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">
                                {deal.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal size={14} />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="font-medium text-foreground text-sm">{deal.name}</p>
                            <p className="text-xs text-muted-foreground">{deal.company}</p>
                          </div>

                          <div className="flex items-center gap-1 text-primary font-semibold">
                            <DollarSign size={14} />
                            <span>{formatCurrency(deal.value)}</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone size={12} />
                            <span>{deal.phone}</span>
                          </div>

                          {deal.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                              {deal.tags.map((tag) => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary" 
                                  className="text-xs py-0"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add Deal Button */}
                  {/* <Button 
                    variant="ghost" 
                    className="w-full h-10 border border-dashed border-border text-muted-foreground hover:text-foreground"
                  >
                    <Plus size={16} className="mr-2" />
                    Adicionar
                  </Button> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Funnel;
