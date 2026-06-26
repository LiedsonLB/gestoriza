import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, ShoppingCart, Plus, Minus, Trash2, User, Percent, CreditCard, Banknote, QrCode, Lock, CalendarIcon, Clock, UserPlus 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { useCashier } from '@/contexts/CashierContext';
import NewLeadModal from '@/components/app/NewLeadModal';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const mockProducts = [
  { id: 1, name: 'Notebook Dell Inspiron', price: 3500, stock: 15 },
  { id: 2, name: 'Mouse Logitech MX Master', price: 450, stock: 45 },
  { id: 3, name: 'Teclado Mecânico Redragon', price: 280, stock: 12 },
  { id: 4, name: 'Monitor LG 27"', price: 1800, stock: 8 },
  { id: 5, name: 'Cadeira Gamer DT3', price: 1200, stock: 3 },
  { id: 6, name: 'Headset HyperX', price: 350, stock: 20 },
  { id: 7, name: 'Webcam Logitech C920', price: 500, stock: 15 },
  { id: 8, name: 'SSD Kingston 500GB', price: 280, stock: 30 }
];

const mockLeads = [
  { id: 1, name: 'Maria Silva', phone: '(11) 99999-1234' },
  { id: 2, name: 'João Santos', phone: '(11) 99999-5678' },
  { id: 3, name: 'Ana Costa', phone: '(11) 99999-9012' },
  { id: 4, name: 'Pedro Lima', phone: '(11) 99999-3456' },
  { id: 5, name: 'Carla Oliveira', phone: '(11) 99999-7890' },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const QuickSales = () => {
  const { hasModule } = useTenant();
  const { isOpen: cashierOpen } = useCashier();
  const hasCRM = hasModule('crm');
  
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [clientName, setClientName] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [fiadoDate, setFiadoDate] = useState<Date | undefined>(undefined);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLeads = useMemo(() => {
    if (!clientSearch.trim()) return [];
    return mockLeads.filter(lead =>
      lead.name.toLowerCase().includes(clientSearch.toLowerCase())
    );
  }, [clientSearch]);

  const similarLeads = useMemo(() => {
    if (!clientName.trim() || clientName.length < 2) return [];
    return mockLeads.filter(lead =>
      lead.name.toLowerCase().includes(clientName.toLowerCase())
    );
  }, [clientName]);

  const addToCart = (product: typeof mockProducts[0]) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountValue = (subtotal * discount) / 100;
  const total = subtotal - discountValue;

  const clearSale = () => {
    setCart([]);
    setDiscount(0);
    setClientName('');
    setSelectedPaymentMethod(null);
    setFiadoDate(undefined);
  };

  const selectClient = (lead: typeof mockLeads[0]) => {
    setClientName(lead.name);
    setClientSearch('');
    setShowClientSuggestions(false);
  };

  const handleFinalizePayment = () => {
    if (selectedPaymentMethod === 'fiado' && !clientName.trim()) {
      return; // Cannot finalize fiado without client
    }
    setPaymentDialogOpen(false);
    clearSale();
  };

  // If cashier is closed, show message
  if (!cashierOpen) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Caixa Fechado</h2>
            <p className="text-muted-foreground mb-6">
              Para realizar vendas, é necessário abrir o caixa primeiro.
            </p>
            <Link to="/app/pdv/cashier">
              <Button size="lg" className="gap-2">
                <Lock className="h-4 w-4" />
                Abrir Caixa
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6 opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Venda Rápida</h1>
          <p className="text-muted-foreground">PDV - Ponto de Venda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Products */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-white">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all group opacity-0 animate-scale-in"
                  style={{ animationDelay: `${100 + index * 50}ms`, animationFillMode: 'forwards' }}
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="h-24 w-full mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                        <ShoppingCart className="h-10 w-10 text-primary" />
                      </div>
                      <p className="font-semibold text-base line-clamp-2 min-h-[3rem]">{product.name}</p>
                      <p className="text-xl font-bold text-primary mt-2">
                        R$ {product.price.toLocaleString('pt-BR')}
                      </p>
                      <Badge variant="outline" className="mt-3">
                        Estoque: {product.stock}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Cart */}
        <Card className="flex flex-col h-full opacity-0 animate-slide-in-right delay-200" style={{ animationFillMode: 'forwards' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Carrinho
              {cart.length > 0 && (
                <Badge className="ml-auto">{cart.length} itens</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Client */}
            <div className="mb-4 space-y-2">
              <Label className="text-xs text-muted-foreground">Cliente</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite o nome do cliente..."
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    setShowClientSuggestions(true);
                  }}
                  onFocus={() => setShowClientSuggestions(true)}
                  className="pl-10"
                />
              </div>

              {/* Similar clients suggestion */}
              {showClientSuggestions && similarLeads.length > 0 && clientName.trim() && (
                <div className="bg-muted rounded-lg p-2 space-y-1">
                  <p className="text-xs text-muted-foreground px-2">Clientes semelhantes:</p>
                  {similarLeads.slice(0, 3).map(lead => (
                    <button
                      key={lead.id}
                      className="w-full text-left p-2 hover:bg-background rounded text-sm flex justify-between"
                      onClick={() => selectClient(lead)}
                    >
                      <span>{lead.name}</span>
                      <span className="text-muted-foreground">{lead.phone}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Create new client if name doesn't match */}
              {clientName.trim() && similarLeads.length === 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => setNewLeadModalOpen(true)}
                >
                  <UserPlus size={14} />
                  Criar novo cliente "{clientName}"
                </Button>
              )}

              {/* CRM-only: Search leads */}
              {/* {hasCRM && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar em leads..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="pl-10 text-sm"
                  />
                  {filteredLeads.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-popover border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {filteredLeads.map(lead => (
                        <button
                          key={lead.id}
                          className="w-full text-left p-2 hover:bg-muted text-sm flex justify-between"
                          onClick={() => selectClient(lead)}
                        >
                          <span>{lead.name}</span>
                          <span className="text-muted-foreground">{lead.phone}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )} */}

              {/* <Button
                variant="ghost"
                size="sm"
                className="w-full gap-2 text-muted-foreground"
                onClick={() => setNewLeadModalOpen(true)}
              >
                <UserPlus size={14} />
                Criar novo {hasCRM ? 'cliente' : 'cliente'}
              </Button> */}
            </div>

            <Separator className="mb-4" />

            {/* Items */}
            <ScrollArea className="flex-1 -mx-4 px-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Carrinho vazio</p>
                  <p className="text-sm">Clique em um produto para adicionar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          R$ {item.price.toLocaleString('pt-BR')} un
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <Separator className="my-4" />

            {/* Discount */}
            <div className="flex items-center gap-2 mb-4">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Desconto %"
                value={discount || ''}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="h-9"
              />
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {subtotal.toLocaleString('pt-BR')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto ({discount}%)</span>
                  <span>- R$ {discountValue.toLocaleString('pt-BR')}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">R$ {total.toLocaleString('pt-BR')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button 
                className="w-full h-12 text-lg" 
                disabled={cart.length === 0}
                onClick={() => setPaymentDialogOpen(true)}
              >
                Finalizar Venda
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={clearSale}
              >
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Forma de Pagamento</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button 
              variant={selectedPaymentMethod === 'dinheiro' ? 'default' : 'outline'} 
              className="h-20 flex-col gap-2" 
              onClick={() => setSelectedPaymentMethod('dinheiro')}
            >
              <Banknote className="h-6 w-6" />
              <span>Dinheiro</span>
            </Button>
            <Button 
              variant={selectedPaymentMethod === 'cartao' ? 'default' : 'outline'} 
              className="h-20 flex-col gap-2" 
              onClick={() => setSelectedPaymentMethod('cartao')}
            >
              <CreditCard className="h-6 w-6" />
              <span>Cartão</span>
            </Button>
            <Button 
              variant={selectedPaymentMethod === 'pix' ? 'default' : 'outline'} 
              className="h-20 flex-col gap-2" 
              onClick={() => setSelectedPaymentMethod('pix')}
            >
              <QrCode className="h-6 w-6" />
              <span>Pix</span>
            </Button>
            <Button 
              variant={selectedPaymentMethod === 'fiado' ? 'default' : 'outline'} 
              className="h-20 flex-col gap-2" 
              onClick={() => setSelectedPaymentMethod('fiado')}
            >
              <Clock className="h-6 w-6" />
              <span>Fiado</span>
            </Button>
          </div>

          {/* Fiado options */}
          {selectedPaymentMethod === 'fiado' && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center gap-2 text-yellow-600 bg-yellow-500/10 p-3 rounded-lg text-sm">
                <User className="h-4 w-4" />
                <span>É necessário informar o cliente para venda à prazo</span>
              </div>
              
              {clientName.trim() ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-500/10 p-3 rounded-lg text-sm">
                  <User className="h-4 w-4" />
                  <span>Cliente: {clientName}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 bg-red-500/10 p-3 rounded-lg text-sm">
                  <User className="h-4 w-4" />
                  <span>Nenhum cliente selecionado</span>
                </div>
              )}

              <div className="space-y-2">
                <Label>Data de Vencimento *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fiadoDate ? format(fiadoDate, 'PPP', { locale: ptBR }) : 'Selecionar data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fiadoDate}
                      onSelect={setFiadoDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <p className="text-xs text-muted-foreground">
                Uma conta a receber será criada automaticamente para esta venda.
              </p>
            </div>
          )}

          <div className="text-center pt-4 border-t">
            <p className="text-2xl font-bold text-primary">R$ {total.toLocaleString('pt-BR')}</p>
            <p className="text-sm text-muted-foreground">{cart.length} item(s)</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleFinalizePayment}
              disabled={
                !selectedPaymentMethod || 
                (selectedPaymentMethod === 'fiado' && (!clientName.trim() || !fiadoDate))
              }
            >
              Confirmar Pagamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Lead Modal */}
      <NewLeadModal
        open={newLeadModalOpen}
        onOpenChange={setNewLeadModalOpen}
        initialName={clientName}
        onSave={(lead) => {
          setClientName(lead.name);
          setNewLeadModalOpen(false);
        }}
      />
    </div>
  );
};

export default QuickSales;
