import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Brain,
  BarChart3,
  Plug,
  Wallet,
  Settings,
  ChevronDown,
  ChevronRight,
  Lock,
  Menu,
  X,
  LogOut,
  UserCircle,
  ArrowBigLeft,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import UpgradeModal from './UpgradeModal';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SubItem {
  title: string;
  path: string;
}

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/app/dashboard',
  },
  {
    id: 'operacional',
    title: 'Operacional',
    icon: Package,
    subItems: [
      { title: 'Produtos e Serviços', path: '/app/operacional/products' },
      { title: 'Estoque', path: '/app/operacional/inventory' },
      { title: 'Compras', path: '/app/operacional/purchases' },
      { title: 'Fornecedores', path: '/app/operacional/suppliers' },
    ],
  },
  {
    id: 'pdv',
    title: 'PDV',
    icon: ShoppingCart,
    subItems: [
      { title: 'Vendas Rápidas', path: '/app/pdv/quick-sales' },
      { title: 'Caixa', path: '/app/pdv/cashier' },
      { title: 'Pagamentos', path: '/app/pdv/payments' },
      { title: 'Comprovantes', path: '/app/pdv/receipts' },
    ],
  },
  {
    id: 'crm',
    title: 'CRM',
    icon: Users,
    subItems: [
      { title: 'Clientes', path: '/app/crm/leads' },
      { title: 'Contatos', path: '/app/crm/contacts' },
      { title: 'Funil de Vendas', path: '/app/crm/funnel' },
      { title: 'Negócios', path: '/app/crm/deals' },
      { title: 'Histórico', path: '/app/crm/history' },
    ],
  },
  {
    id: 'ai',
    title: 'IA',
    icon: Brain,
    subItems: [
      { title: 'Configuração do Agente', path: '/app/ai/agent-config' },
      { title: 'Base de Conhecimento', path: '/app/ai/knowledge-base' },
      { title: 'Prompt / Comportamento', path: '/app/ai/prompt' },
      { title: 'Integrações do Agente', path: '/app/ai/integrations' },
      { title: 'Testes do Agente', path: '/app/ai/testing' },
    ],
  },
  {
    id: 'reports',
    title: 'Relatórios',
    icon: BarChart3,
    subItems: [
      { title: 'Vendas', path: '/app/reports/sales' },
      { title: 'Performance', path: '/app/reports/performance' },
      { title: 'Personalizado', path: '/app/reports/custom' },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrações',
    icon: Plug,
    subItems: [
      { title: 'WhatsApp', path: '/app/integrations/whatsapp' },
      // { title: 'Email', path: '/app/integrations/email' },
      // { title: 'API', path: '/app/integrations/api' },
    ],
  },
  {
    id: 'financial',
    title: 'Financeiro',
    icon: Wallet,
    subItems: [
      { title: 'Contas a Receber', path: '/app/financial/receivables' },
      { title: 'Contas a Pagar', path: '/app/financial/payables' },
      { title: 'Fluxo de Caixa', path: '/app/financial/cashflow' },
    ],
  },
  {
    id: 'settings',
    title: 'Configurações',
    icon: Settings,
    subItems: [
      { title: 'Perfil', path: '/app/settings/whitelabel' },
      // { title: 'Equipe', path: '/app/settings/team' },
      { title: 'Cobrança', path: '/app/settings/billing' },
    ],
  },
];

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AppSidebar = ({ isOpen, onToggle }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tenant, hasModule } = useTenant();
  const [openMenus, setOpenMenus] = useState<string[]>(['dashboard']);
  const [upgradeModal, setUpgradeModal] = useState<{ open: boolean; module: string; description: string }>({
    open: false,
    module: '',
    description: '',
  });

  const toggleMenu = (id: string) => {
    setOpenMenus(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isModuleActive = (item: MenuItem) => {
    if (item.path) return isActive(item.path);
    return item.subItems?.some(sub => isActive(sub.path));
  };

  const handleLockedClick = (moduleName: string, description: string) => {
    setUpgradeModal({ open: true, module: moduleName, description });
  };

  const moduleDescriptions: Record<string, string> = {
    Operacional: 'Gerencie produtos, estoque, compras e fornecedores de forma integrada.',
    PDV: 'Ponto de venda rápido com controle de caixa e múltiplos pagamentos.',
    AI: 'Configure seu agente de IA para atendimento automatizado.',
  };

  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300',
          isOpen ? 'w-64' : 'w-0 md:w-16',
          'overflow-hidden'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            {isOpen ? (
              <div className="flex items-center gap-2">
                {tenant.logo ? (
                  <img src={tenant.logo} alt={tenant.name} className="w-8 h-8 rounded-lg object-contain" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      {tenant.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="font-semibold text-sidebar-foreground truncate">{tenant.name}</span>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex h-8 w-8 text-sidebar-foreground"
                onClick={onToggle}
              >
                <ArrowRight size={16} />
              </Button>
            )}
            {isOpen && (
              <Button
                variant="ghost"

                size="icon"
                className="h-8 w-8 text-sidebar-foreground"
                onClick={onToggle}
              >
                <ArrowLeft size={16} />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isLocked = !hasModule(item.id);
                const isCurrentModuleActive = isModuleActive(item);
                const isMenuOpen = openMenus.includes(item.id);

                if (isLocked) {
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleLockedClick(item.title, moduleDescriptions[item.id] || '')}
                        className={cn(
                          'sidebar-item w-full sidebar-item-disabled',
                          !isOpen && 'justify-center px-0'
                        )}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {isOpen && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            <Lock size={14} className="text-muted-foreground" />
                          </>
                        )}
                      </button>
                    </li>
                  );
                }

                if (item.path) {
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        className={cn(
                          'sidebar-item text-muted-foreground hover:text-sidebar-foreground',
                          isActive(item.path) && 'sidebar-item-active text-sidebar-foreground',
                          !isOpen && 'justify-center px-0'
                        )}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {isOpen && <span>{item.title}</span>}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <Collapsible open={isMenuOpen && isOpen}>
                      <CollapsibleTrigger asChild>
                        <button
                          className={cn(
                            'sidebar-item w-full text-muted-foreground hover:text-sidebar-foreground hover:sidebar-item-active',
                            isCurrentModuleActive && 'sidebar-item-active text-sidebar-foreground',
                            !isOpen && 'justify-center px-0'
                          )}
                          onClick={() => isOpen && toggleMenu(item.id)}
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          {isOpen && (
                            <>
                              <span className="flex-1 text-left">{item.title}</span>
                              {isMenuOpen ? (
                                <ChevronDown size={14} />
                              ) : (
                                <ChevronRight size={14} />
                              )}
                            </>
                          )}
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {isOpen && item.subItems && (
                          <ul className="ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.path}>
                                <Link
                                  to={subItem.path}
                                  className={cn(
                                    'sidebar-item text-sm text-muted-foreground hover:text-sidebar-foreground hover:sidebar-item-active',
                                    isActive(subItem.path) && 'sidebar-item-active text-sidebar-foreground'
                                  )}
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            {isOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  {/* if image */}
                  {tenant.logo ? (
                    <img src={tenant.logo} alt={tenant.name} className="w-8 h-8 rounded-full object-contain" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">
                        {tenant.name.charAt(0)}
                      </span>
                    </div>
                    // <UserCircle size={24} className="text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{tenant.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{tenant.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                  navigate('/');
                }}>
                  <LogOut size={16} className="text-muted-foreground" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="w-full h-8" onClick={() => {
                navigate('/');
              }}>
                <LogOut size={16} className="text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      <UpgradeModal
        open={upgradeModal.open}
        onOpenChange={(open) => setUpgradeModal(prev => ({ ...prev, open }))}
        moduleName={upgradeModal.module}
        moduleDescription={upgradeModal.description}
      />
    </>
  );
};

export default AppSidebar;
