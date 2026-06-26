import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  CreditCard, Banknote, QrCode, Wallet, Settings, CheckCircle2 
} from 'lucide-react';

const paymentMethods = [
  {
    id: 'cash',
    name: 'Dinheiro',
    icon: Banknote,
    enabled: true,
    description: 'Pagamento em espécie',
    transactions: 45,
    total: 12500
  },
  {
    id: 'credit',
    name: 'Cartão de Crédito',
    icon: CreditCard,
    enabled: true,
    description: 'Visa, Master, Elo, Amex',
    transactions: 128,
    total: 85000
  },
  {
    id: 'debit',
    name: 'Cartão de Débito',
    icon: CreditCard,
    enabled: true,
    description: 'Todas as bandeiras',
    transactions: 89,
    total: 32000
  },
  {
    id: 'pix',
    name: 'Pix',
    icon: QrCode,
    enabled: true,
    description: 'Pagamento instantâneo',
    transactions: 156,
    total: 48000
  },
];

const Payments = () => {
  const totalTransactions = paymentMethods.reduce((acc, m) => acc + m.transactions, 0);
  const totalValue = paymentMethods.reduce((acc, m) => acc + m.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Formas de Pagamento</h1>
          <p className="text-muted-foreground">Configure os métodos aceitos no PDV</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configurar Integração
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="opacity-0 animate-scale-in delay-150" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Recebido</p>
                <p className="text-xl font-bold">R$ {totalValue.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-200" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transações</p>
                <p className="text-xl font-bold">{totalTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-scale-in delay-250" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Métodos Ativos</p>
                <p className="text-xl font-bold">{paymentMethods.filter(m => m.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method, index) => (
          <Card key={method.id} className={`transition-all duration-300 hover:shadow-lg opacity-0 animate-slide-up ${!method.enabled ? 'opacity-60' : ''}`} style={{ animationDelay: `${300 + index * 75}ms`, animationFillMode: 'forwards' }}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${method.enabled ? 'bg-primary/20' : 'bg-muted'}`}>
                    <method.icon className={`h-6 w-6 ${method.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                    {method.enabled && (
                      <div className="flex gap-4 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Transações</p>
                          <p className="font-semibold">{method.transactions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="font-semibold">R$ {method.total.toLocaleString('pt-BR')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={method.enabled ? 'default' : 'secondary'}>
                    {method.enabled ? 'Ativo' : 'Inativo'}
                  </Badge>
                  <Switch checked={method.enabled} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="opacity-0 animate-slide-up delay-500" style={{ animationFillMode: 'forwards' }}>
        <CardHeader>
          <CardTitle>Integração com Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">Sincronização Automática</p>
                <p className="text-sm text-muted-foreground">
                  Todas as vendas são automaticamente registradas no módulo financeiro
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
