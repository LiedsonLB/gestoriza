import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Plus, Search, DollarSign, User, Calendar, Package, MoreHorizontal, TrendingUp, TrendingDown 
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const mockDeals = [
  {
    id: 1,
    title: 'Projeto Website Corporativo',
    value: 15000,
    client: 'Tech Solutions',
    responsible: 'Carlos Silva',
    products: ['Web Design', 'Hosting'],
    expectedClose: '2024-02-15',
    status: 'open',
    stage: 'Proposta'
  },
  {
    id: 2,
    title: 'Consultoria ERP',
    value: 45000,
    client: 'Santos & Cia',
    responsible: 'Ana Paula',
    products: ['Consultoria', 'Implementação'],
    expectedClose: '2024-03-01',
    status: 'won',
    stage: 'Fechado'
  },
  {
    id: 3,
    title: 'Manutenção Anual',
    value: 8000,
    client: 'Loja Express',
    responsible: 'Carlos Silva',
    products: ['Suporte'],
    expectedClose: '2024-01-30',
    status: 'lost',
    stage: 'Perdido'
  },
  {
    id: 4,
    title: 'Sistema PDV Completo',
    value: 25000,
    client: 'Mercado Central',
    responsible: 'Ana Paula',
    products: ['PDV', 'Hardware', 'Treinamento'],
    expectedClose: '2024-02-28',
    status: 'open',
    stage: 'Negociação'
  }
];

const Deals = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.client.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30">Ganho</Badge>;
      case 'lost':
        return <Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/30">Perdido</Badge>;
      default:
        return <Badge className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/30">Em Aberto</Badge>;
    }
  };

  const totalOpen = mockDeals.filter(d => d.status === 'open').reduce((acc, d) => acc + d.value, 0);
  const totalWon = mockDeals.filter(d => d.status === 'won').reduce((acc, d) => acc + d.value, 0);
  const totalLost = mockDeals.filter(d => d.status === 'lost').reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Negócios</h1>
          <p className="text-muted-foreground">Controle de negociações</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Negócio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Negócio</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título do Negócio</Label>
                  <Input placeholder="Ex: Projeto Website" />
                </div>
                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tech Solutions</SelectItem>
                      <SelectItem value="2">Santos & Cia</SelectItem>
                      <SelectItem value="3">Loja Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Responsável</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Carlos Silva</SelectItem>
                      <SelectItem value="2">Ana Paula</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Produtos Vinculados</Label>
                  <Input placeholder="Web Design, Hosting..." />
                </div>
                <div className="space-y-2">
                  <Label>Previsão de Fechamento</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Criar Negócio</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="opacity-0 animate-scale-in delay-150" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Aberto</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {totalOpen.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-200" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ganhos</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {totalWon.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-250" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Perdidos</p>
                <p className="text-2xl font-bold text-red-600">
                  R$ {totalLost.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="opacity-0 animate-slide-up delay-300" style={{ animationFillMode: 'forwards' }}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar negócio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="open">Em Aberto</SelectItem>
                <SelectItem value="won">Ganhos</SelectItem>
                <SelectItem value="lost">Perdidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Negócio</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Previsão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{deal.title}</p>
                      <p className="text-sm text-muted-foreground">{deal.client}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      R$ {deal.value.toLocaleString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {deal.responsible}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {deal.products.map((product) => (
                        <Badge key={product} variant="outline" className="text-xs">
                          <Package className="h-3 w-3 mr-1" />
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(deal.expectedClose).toLocaleDateString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(deal.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Marcar como Ganho</DropdownMenuItem>
                        <DropdownMenuItem>Marcar como Perdido</DropdownMenuItem>
                        <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deals;
