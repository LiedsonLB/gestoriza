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
  Plus, Search, ShoppingCart, Truck, Calendar, DollarSign, MoreHorizontal 
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const mockPurchases = [
  {
    id: 1,
    code: 'PC-001',
    supplier: 'Tech Distribuidora',
    products: 5,
    total: 15000,
    date: '2024-01-15',
    expectedDelivery: '2024-01-20',
    status: 'pending'
  },
  {
    id: 2,
    code: 'PC-002',
    supplier: 'Eletrônicos Brasil',
    products: 12,
    total: 8500,
    date: '2024-01-14',
    expectedDelivery: '2024-01-18',
    status: 'delivered'
  },
  {
    id: 3,
    code: 'PC-003',
    supplier: 'Import Tech',
    products: 3,
    total: 25000,
    date: '2024-01-12',
    expectedDelivery: '2024-01-25',
    status: 'in_transit'
  },
  {
    id: 4,
    code: 'PC-004',
    supplier: 'Tech Distribuidora',
    products: 8,
    total: 4200,
    date: '2024-01-10',
    expectedDelivery: '2024-01-15',
    status: 'delivered'
  }
];

const Purchases = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPurchases = mockPurchases.filter(purchase => {
    const matchesSearch = purchase.code.toLowerCase().includes(search.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || purchase.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-600">Pendente</Badge>;
      case 'in_transit':
        return <Badge className="bg-blue-500/20 text-blue-600">Em Trânsito</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500/20 text-green-600">Entregue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compras</h1>
          <p className="text-muted-foreground">Pedidos de compra e entrada de estoque</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover:scale-105 transition-transform">
              <Plus className="h-4 w-4 mr-2" />
              Novo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl animate-scale-in">
            <DialogHeader>
              <DialogTitle>Criar Pedido de Compra</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fornecedor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tech Distribuidora</SelectItem>
                      <SelectItem value="2">Eletrônicos Brasil</SelectItem>
                      <SelectItem value="3">Import Tech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Previsão de Entrega</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Produtos</Label>
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                  Adicione produtos ao pedido de compra...
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Criar Pedido</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="opacity-0 animate-scale-in delay-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pedidos</p>
                <p className="text-xl font-bold">{mockPurchases.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-150 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-xl font-bold">{mockPurchases.filter(p => p.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-200 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Truck className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Trânsito</p>
                <p className="text-xl font-bold">{mockPurchases.filter(p => p.status === 'in_transit').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-250 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-xl font-bold">
                  R$ {mockPurchases.reduce((acc, p) => acc + p.total, 0).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="opacity-0 animate-slide-up delay-300">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pedido..."
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
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="in_transit">Em Trânsito</SelectItem>
                <SelectItem value="delivered">Entregues</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead className="text-center">Produtos</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Previsão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{purchase.code}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(purchase.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{purchase.supplier}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{purchase.products} itens</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {purchase.total.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(purchase.expectedDelivery).toLocaleDateString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Confirmar Entrega</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
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

export default Purchases;
