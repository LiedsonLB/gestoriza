import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTenant } from '@/contexts/TenantContext';
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  QrCode,
  UserPlus,
  Box,
  Lock,
  Unlock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { plan, tenant, modules } = useTenant();

  const stats = [
    {
      title: 'Total de Clientes',
      value: '1.248',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Vendas do Mês',
      value: 'R$ 45.830',
      change: '+8%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Taxa de Conversão',
      value: '24.5%',
      change: '-2%',
      changeType: 'negative' as const,
      icon: TrendingUp,
    },
    {
      title: 'Mensagens Enviadas',
      value: '3.892',
      change: '+18%',
      changeType: 'positive' as const,
      icon: MessageSquare,
    },
  ];

  const recentLeads = [
    { name: 'João Silva', email: 'joao@email.com', status: 'Novo', value: 'R$ 2.500' },
    { name: 'Maria Santos', email: 'maria@email.com', status: 'Em negociação', value: 'R$ 5.000' },
    { name: 'Pedro Costa', email: 'pedro@email.com', status: 'Qualificado', value: 'R$ 1.200' },
    { name: 'Ana Lima', email: 'ana@email.com', status: 'Novo', value: 'R$ 3.800' },
  ];

  const quickActions = [
    { 
      title: 'Venda Rápida', 
      icon: Zap, 
      path: '/app/pdv/quick-sales',
      color: 'bg-yellow-500/10 text-yellow-600',
      iconBg: 'bg-yellow-500/20',
      moduleId: 'pdv'
    },
    { 
      title: 'Novo Cliente', 
      icon: UserPlus, 
      path: '/app/crm/leads',
      color: 'bg-blue-500/10 text-blue-600',
      iconBg: 'bg-blue-500/20',
      moduleId: 'crm'
    },
    { 
      title: 'WhatsApp', 
      icon: QrCode, 
      path: '/app/integrations/whatsapp',
      color: 'bg-green-500/10 text-green-600',
      iconBg: 'bg-green-500/20',
      moduleId: 'integrations'
    },
    { 
      title: 'Entrada de Estoque', 
      icon: Box, 
      path: '/app/erp/inventory',
      color: 'bg-purple-500/10 text-purple-600',
      iconBg: 'bg-purple-500/20',
      moduleId: 'erp'
    },
    { 
      title: 'Contas a Pagar', 
      icon: DollarSign, 
      path: '/app/financial/payables',
      color: 'bg-red-500/10 text-red-600',
      iconBg: 'bg-red-500/20',
      moduleId: 'financial'
    },
  ];

  // Get active modules for display
  const activeModules = modules.filter(m => m.enabled).map(m => m.label);

  const filteredQuickActions = quickActions.filter(action => {
    const module = modules.find(m => m.id === action.moduleId);
    return module?.enabled;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo de volta, {tenant.name}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="opacity-0 animate-slide-up transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ animationDelay: `${350 + index * 75}ms`, animationFillMode: 'forwards' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon size={20} className="text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="opacity-0 animate-slide-up delay-150" style={{ animationFillMode: 'forwards' }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredQuickActions.map((action, index) => (
            <Link key={action.title} to={action.path}>
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 animate-scale-in ${action.color}`}
                style={{ animationDelay: `${200 + index * 75}ms`, animationFillMode: 'forwards' }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className={`p-4 rounded-xl ${action.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <action.icon size={28} />
                    </div>
                    <span className="font-semibold text-base">{action.title}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Upgrade Banner */}
      {plan.plan !== 'ENTERPRISE' && (
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 opacity-0 animate-scale-in delay-300" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Unlock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Desbloqueie mais recursos</h3>
                <p className="text-sm text-muted-foreground">
                  Faça upgrade para acessar módulos avançados e funcionalidades premium.
                </p>
              </div>
            </div>
            <Link to="/app/settings/billing">
              <Button size="sm">Fazer upgrade</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="opacity-0 animate-slide-in-left delay-500" style={{ animationFillMode: 'forwards' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Clientes Recentes</CardTitle>
            <Link to="/app/crm/leads">
              <Button variant="ghost" size="sm">Ver todos</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 transition-all duration-200 hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {lead.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{lead.value}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card className="opacity-0 animate-slide-in-right delay-500" style={{ animationFillMode: 'forwards' }}>
          <CardHeader>
            <CardTitle className="text-lg">Uso do Plano</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Usuários</span>
                <span className="font-medium text-foreground">3 / {plan.limits.users}</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div 
                  className="h-full rounded-full bg-primary" 
                  style={{ width: `${(3 / plan.limits.users) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Mensagens</span>
                <span className="font-medium text-foreground">654 / {plan.limits.messages}</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div 
                  className="h-full rounded-full bg-primary" 
                  style={{ width: `${(654 / plan.limits.messages) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Armazenamento</span>
                <span className="font-medium text-foreground">2.4 GB / {plan.limits.storage / 1000} GB</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div 
                  className="h-full rounded-full bg-primary" 
                  style={{ width: `${(2400 / plan.limits.storage) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Módulos ativos</p>
              <div className="flex flex-wrap gap-2">
                {activeModules.map((module) => (
                  <span 
                    key={module}
                    className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;