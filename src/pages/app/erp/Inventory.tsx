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
  ArrowDownCircle, ArrowUpCircle, Search, Package, AlertTriangle, History, Plus 
} from 'lucide-react';

const mockInventory = [
  {
    id: 1,
    product: 'Notebook Dell Inspiron',
    sku: 'NB-DELL-001',
    currentStock: 15,
    minStock: 5,
    lastMovement: '2024-01-15',
    movementType: 'entrada'
  },
  {
    id: 2,
    product: 'Mouse Logitech MX Master',
    sku: 'MS-LOG-002',
    currentStock: 45,
    minStock: 10,
    lastMovement: '2024-01-14',
    movementType: 'saída'
  },
  {
    id: 3,
    product: 'Teclado Mecânico Redragon',
    sku: 'TC-RED-003',
    currentStock: 0,
    minStock: 5,
    lastMovement: '2024-01-10',
    movementType: 'saída'
  },
  {
    id: 4,
    product: 'Monitor LG 27"',
    sku: 'MN-LG-004',
    currentStock: 3,
    minStock: 5,
    lastMovement: '2024-01-12',
    movementType: 'entrada'
  }
];

const mockMovements = [
  { id: 1, product: 'Notebook Dell', type: 'entrada', quantity: 10, date: '2024-01-15', user: 'Carlos' },
  { id: 2, product: 'Mouse Logitech', type: 'saída', quantity: 5, date: '2024-01-14', user: 'Ana' },
  { id: 3, product: 'Monitor LG', type: 'entrada', quantity: 3, date: '2024-01-12', user: 'Carlos' },
  { id: 4, product: 'Teclado Redragon', type: 'saída', quantity: 8, date: '2024-01-10', user: 'Ana' }
];

const Inventory = () => {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [movementType, setMovementType] = useState('entrada');

  const filteredInventory = mockInventory.filter(item =>
    item.product.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockItems = mockInventory.filter(i => i.currentStock <= i.minStock);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Estoque</h1>
          <p className="text-muted-foreground">Controle de entrada e saída</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover:scale-105 transition-transform">
              <Plus className="h-4 w-4 mr-2" />
              Nova Movimentação
            </Button>
          </DialogTrigger>
          <DialogContent className="animate-scale-in">
            <DialogHeader>
              <DialogTitle>Registrar Movimentação</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Tipo de Movimentação</Label>
                <Select value={movementType} onValueChange={setMovementType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saída">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Produto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInventory.map(item => (
                      <SelectItem key={item.id} value={item.id.toString()}>{item.product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantidade</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Registrar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-yellow-500/50 bg-yellow-500/10 opacity-0 animate-scale-in delay-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 animate-pulse" />
              <div>
                <p className="font-medium text-foreground">Alerta de Estoque Baixo</p>
                <p className="text-sm text-muted-foreground">
                  {lowStockItems.length} produto(s) abaixo do estoque mínimo
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="opacity-0 animate-scale-in delay-150 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total em Estoque</p>
                <p className="text-xl font-bold">
                  {mockInventory.reduce((acc, i) => acc + i.currentStock, 0)} itens
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-200 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <ArrowDownCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entradas (mês)</p>
                <p className="text-xl font-bold">156 itens</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-250 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <ArrowUpCircle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saídas (mês)</p>
                <p className="text-xl font-bold">89 itens</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 opacity-0 animate-slide-up delay-300">
          <CardHeader>
            <CardTitle>Posição de Estoque</CardTitle>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-center">Atual</TableHead>
                  <TableHead className="text-center">Mínimo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.product}</p>
                        <p className="text-sm text-muted-foreground">{item.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={item.currentStock === 0 ? 'destructive' : item.currentStock <= item.minStock ? 'secondary' : 'default'}>
                        {item.currentStock}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {item.minStock}
                    </TableCell>
                    <TableCell>
                      {item.currentStock === 0 ? (
                        <Badge variant="destructive">Sem estoque</Badge>
                      ) : item.currentStock <= item.minStock ? (
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600">Baixo</Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-500/20 text-green-600">Normal</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="opacity-0 animate-slide-in-right delay-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Últimas Movimentações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMovements.map((mov) => (
                <div key={mov.id} className="flex items-center gap-3 pb-3 border-b last:border-0">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${mov.type === 'entrada' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {mov.type === 'entrada' ? (
                      <ArrowDownCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowUpCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{mov.product}</p>
                    <p className="text-xs text-muted-foreground">
                      {mov.quantity} un • {mov.user}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(mov.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
