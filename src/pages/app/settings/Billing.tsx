import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTenant } from '@/contexts/TenantContext';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

const plans = [
  {
    id: 'STARTER',
    name: 'Starter',
    price: 97,
    description: 'Para começar a digitalizar',
    icon: Zap,
    features: [
      'CRM básico',
      '1 usuário',
      '500 leads',
      'Suporte por email',
    ],
    modules: ['DASHBOARD', 'CRM', 'SETTINGS'],
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: 197,
    description: 'Para negócios em crescimento',
    icon: Sparkles,
    popular: true,
    features: [
      'CRM + Bot de Atendimento',
      '5 usuários',
      'Leads ilimitados',
      '1.000 mensagens/mês',
      'Automações',
      'Suporte prioritário',
    ],
    modules: ['DASHBOARD', 'CRM', 'BOT', 'AUTOMATION', 'REPORTS', 'INTEGRATIONS', 'FINANCIAL', 'SETTINGS'],
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: 497,
    description: 'Para operações robustas',
    icon: Crown,
    features: [
      'Todos os módulos',
      'Usuários ilimitados',
      'Mensagens ilimitadas',
      'White Label completo',
      'API personalizada',
      'Gerente de sucesso',
    ],
    modules: ['DASHBOARD', 'CRM', 'ERP', 'PDV', 'BOT', 'AUTOMATION', 'REPORTS', 'INTEGRATIONS', 'FINANCIAL', 'SETTINGS'],
  },
];

const invoices = [
  { id: 1, date: '01/01/2024', amount: 0, status: 'Pago' },
  { id: 2, date: '01/12/2023', amount: 0, status: 'Pago' },
  { id: 3, date: '01/11/2023', amount: 0, status: 'Pago' },
];

const Billing = () => {
  const { plan } = useTenant();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="opacity-0 animate-slide-in-left">
        <h1 className="text-2xl font-bold text-foreground">Cobrança</h1>
        <p className="text-muted-foreground">Gerencie seu plano e pagamentos</p>
      </div>

      {/* Current Plan */}
      <Card className="border-primary/20 bg-primary/5 opacity-0 animate-scale-in delay-100">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground">Plano atual</Badge>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{plan.plan}</h2>
              <p className="text-muted-foreground">
                Próxima cobrança em 01/02/2024
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">
                R$ {plans.find(p => p.id === plan.plan)?.price || 0}
                <span className="text-lg font-normal text-muted-foreground">/mês</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="opacity-0 animate-slide-up delay-200">
        <h2 className="text-lg font-semibold text-foreground mb-4">Alterar plano</h2>
        {/* <div className="grid md:grid-cols-3 gap-4">
          {plans.map((planOption) => {
            const isCurrentPlan = plan.plan === planOption.id;
            const Icon = planOption.icon;
            
            return (
              <Card 
                key={planOption.id}
                className={`relative flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                  planOption.popular 
                    ? 'border-primary shadow-lg' 
                    : isCurrentPlan 
                      ? 'border-primary/50' 
                      : ''
                }`}
              >
                {planOption.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Mais popular
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon size={20} className="text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{planOption.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{planOption.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-foreground">R$ {planOption.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col flex-1">
                  <ul className="space-y-2 mb-6">
                    {planOption.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-primary shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full mt-auto"
                    variant={isCurrentPlan ? 'outline' : 'default'}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Plano atual' : 'Fazer upgrade'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div> */}
      </div>

      {/* Invoices */}
      <Card className="opacity-0 animate-slide-up delay-300">
        <CardHeader>
          <CardTitle className="text-lg">Histórico de faturas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div 
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div>
                  <p className="font-medium text-foreground">Fatura #{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-foreground">R$ {invoice.amount}</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Baixar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
