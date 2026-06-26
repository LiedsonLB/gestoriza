import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DollarSign, Lock, Unlock, ArrowDownCircle, ArrowUpCircle, Wallet, AlertCircle 
} from 'lucide-react';
import { useCashier } from '@/contexts/CashierContext';

const mockCashHistory = [
  { id: 1, type: 'abertura', value: 500, time: '08:00', user: 'Carlos' },
  { id: 2, type: 'venda', value: 150, time: '09:30', user: 'Carlos' },
  { id: 3, type: 'venda', value: 280, time: '10:15', user: 'Carlos' },
  { id: 4, type: 'sangria', value: -300, time: '11:00', user: 'Carlos' },
  { id: 5, type: 'venda', value: 450, time: '12:30', user: 'Carlos' },
  { id: 6, type: 'venda', value: 95, time: '14:00', user: 'Carlos' }
];

const Cashier = () => {
  const { isOpen: cashierOpen, openCashier: openCashierContext, closeCashier: closeCashierContext } = useCashier();
  const [openDialogOpen, setOpenDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [sangriaDialogOpen, setSangriaDialogOpen] = useState(false);
  const [initialValue, setInitialValue] = useState('');
  const [sangriaValue, setSangriaValue] = useState('');

  const handleOpenCashier = () => {
    openCashierContext(Number(initialValue) || 0);
    setOpenDialogOpen(false);
    setInitialValue('');
  };

  const handleCloseCashier = () => {
    closeCashierContext();
    setCloseDialogOpen(false);
  };

  const currentBalance = mockCashHistory.reduce((acc, item) => acc + item.value, 0);
  const salesTotal = mockCashHistory.filter(i => i.type === 'venda').reduce((acc, i) => acc + i.value, 0);
  const sangriaTotal = Math.abs(mockCashHistory.filter(i => i.type === 'sangria').reduce((acc, i) => acc + i.value, 0));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Caixa</h1>
          <p className="text-muted-foreground">Controle de abertura e fechamento</p>
        </div>
        <Badge variant={cashierOpen ? 'default' : 'secondary'} className="text-lg px-4 py-2">
          {cashierOpen ? (
            <><Unlock className="h-4 w-4 mr-2" /> Caixa Aberto</>
          ) : (
            <><Lock className="h-4 w-4 mr-2" /> Caixa Fechado</>
          )}
        </Badge>
      </div>

      {!cashierOpen ? (
        <Card className="border-dashed opacity-0 animate-scale-in delay-200" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Caixa Fechado</h3>
              <p className="text-muted-foreground mb-6">Abra o caixa para iniciar as operações</p>
              <Dialog open={openDialogOpen} onOpenChange={setOpenDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Unlock className="h-5 w-5 mr-2" />
                    Abrir Caixa
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Abrir Caixa</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Label>Saldo Inicial</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="0,00"
                        value={initialValue}
                        onChange={(e) => setInitialValue(e.target.value)}
                        className="pl-10 text-lg h-12"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Informe o valor inicial em dinheiro no caixa
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleOpenCashier}>Confirmar Abertura</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="opacity-0 animate-scale-in delay-150" style={{ animationFillMode: 'forwards' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Saldo Atual</p>
                    <p className="text-xl font-bold">R$ {currentBalance.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="opacity-0 animate-scale-in delay-200" style={{ animationFillMode: 'forwards' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <ArrowUpCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vendas</p>
                    <p className="text-xl font-bold text-green-600">R$ {salesTotal.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="opacity-0 animate-scale-in delay-250" style={{ animationFillMode: 'forwards' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sangrias</p>
                    <p className="text-xl font-bold text-red-600">R$ {sangriaTotal.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="opacity-0 animate-scale-in delay-300" style={{ animationFillMode: 'forwards' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Abertura</p>
                    <p className="text-xl font-bold">R$ 500</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Dialog open={sangriaDialogOpen} onOpenChange={setSangriaDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <ArrowDownCircle className="h-4 w-4 mr-2" />
                  Sangria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Sangria</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label>Valor da Sangria</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={sangriaValue}
                      onChange={(e) => setSangriaValue(e.target.value)}
                      className="pl-10 text-lg h-12"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Informe o valor a ser retirado do caixa
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSangriaDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setSangriaDialogOpen(false)}>Confirmar Sangria</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={closeDialogOpen} onOpenChange={setCloseDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Lock className="h-4 w-4 mr-2" />
                  Fechar Caixa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Fechar Caixa</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="flex items-center gap-2 text-yellow-600 bg-yellow-500/10 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">Confirme os valores antes de fechar</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saldo Inicial:</span>
                      <span className="font-medium">R$ 500,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Vendas:</span>
                      <span className="font-medium text-green-600">+ R$ {salesTotal.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Sangrias:</span>
                      <span className="font-medium text-red-600">- R$ {sangriaTotal.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold">Saldo Final:</span>
                      <span className="font-bold text-primary">R$ {currentBalance.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCloseDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={handleCloseCashier}>Confirmar Fechamento</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="opacity-0 animate-slide-up delay-400" style={{ animationFillMode: 'forwards' }}>
            <CardHeader>
              <CardTitle>Movimentações do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCashHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>
                        <Badge variant={item.type === 'venda' ? 'default' : item.type === 'sangria' ? 'destructive' : 'secondary'}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.user}</TableCell>
                      <TableCell className={`text-right font-medium ${item.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.value >= 0 ? '+' : ''} R$ {Math.abs(item.value).toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Cashier;
