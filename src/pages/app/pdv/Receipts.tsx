import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Search, Receipt, Eye, Printer, XCircle, MoreHorizontal, Calendar, DollarSign 
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const mockSales = [
  {
    id: 1,
    code: 'VND-001',
    client: 'Maria Silva',
    items: 3,
    total: 4230,
    payment: 'Cartão de Crédito',
    date: '2024-01-15T10:30:00',
    status: 'completed'
  },
  {
    id: 2,
    code: 'VND-002',
    client: null,
    items: 1,
    total: 450,
    payment: 'Pix',
    date: '2024-01-15T11:15:00',
    status: 'completed'
  },
  {
    id: 3,
    code: 'VND-003',
    client: 'João Santos',
    items: 5,
    total: 2850,
    payment: 'Dinheiro',
    date: '2024-01-15T14:00:00',
    status: 'cancelled'
  },
  {
    id: 4,
    code: 'VND-004',
    client: 'Ana Costa',
    items: 2,
    total: 1280,
    payment: 'Cartão de Débito',
    date: '2024-01-15T15:30:00',
    status: 'completed'
  },
  {
    id: 5,
    code: 'VND-005',
    client: null,
    items: 4,
    total: 3600,
    payment: 'Pix',
    date: '2024-01-15T16:45:00',
    status: 'completed'
  }
];

const Receipts = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSale, setSelectedSale] = useState<typeof mockSales[0] | null>(null);

  const filteredSales = mockSales.filter(sale => {
    const matchesSearch = sale.code.toLowerCase().includes(search.toLowerCase()) ||
      sale.client?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedTotal = mockSales.filter(s => s.status === 'completed').reduce((acc, s) => acc + s.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comprovantes</h1>
          <p className="text-muted-foreground">Histórico de vendas e emissão de comprovantes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="opacity-0 animate-scale-in delay-150" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Vendas</p>
                <p className="text-xl font-bold">{mockSales.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-200" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-xl font-bold text-green-600">R$ {completedTotal.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-250" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Finalizadas</p>
                <p className="text-xl font-bold">{mockSales.filter(s => s.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-300" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Canceladas</p>
                <p className="text-xl font-bold">{mockSales.filter(s => s.status === 'cancelled').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="opacity-0 animate-slide-up delay-400" style={{ animationFillMode: 'forwards' }}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por código ou cliente..."
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
                <SelectItem value="completed">Finalizadas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Venda</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-center">Itens</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{sale.code}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(sale.date).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {sale.client || <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{sale.items}</Badge>
                  </TableCell>
                  <TableCell>{sale.payment}</TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {sale.total.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={sale.status === 'completed' ? 'default' : 'destructive'}>
                      {sale.status === 'completed' ? 'Finalizada' : 'Cancelada'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedSale(sale)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="h-4 w-4 mr-2" />
                          Imprimir
                        </DropdownMenuItem>
                        {sale.status === 'completed' && (
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancelar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Comprovante de Venda</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <p className="text-2xl font-bold">{selectedSale.code}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedSale.date).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cliente:</span>
                  <span>{selectedSale.client || 'Consumidor Final'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Itens:</span>
                  <span>{selectedSale.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pagamento:</span>
                  <span>{selectedSale.payment}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">R$ {selectedSale.total.toLocaleString('pt-BR')}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button className="flex-1" onClick={() => setSelectedSale(null)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Receipts;
