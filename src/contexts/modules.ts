export interface ModuleFeature {
  id: string;
  label: string;
  path: string;
  enabled?: boolean;
}

export interface Module {
  id: string;
  label: string;
  enabled: boolean;
  features?: ModuleFeature[];
}

export const SYSTEM_MODULES: Module[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    enabled: true,
  },

  {
    id: 'crm',
    label: 'CRM',
    enabled: true,
    features: [
      { id: 'leads', label: 'Leads', path: '/app/crm/leads' },
      { id: 'contacts', label: 'Contatos', path: '/app/crm/contacts' },
      { id: 'funnel', label: 'Funil de Vendas', path: '/app/crm/funnel' },
      { id: 'deals', label: 'Negócios', path: '/app/crm/deals' },
      { id: 'history', label: 'Histórico', path: '/app/crm/history' },
    ],
  },

  {
    id: 'operacional',
    label: 'Operacional',
    enabled: false,
    features: [
      { id: 'products', label: 'Produtos', path: '/app/operacional/products' },
      { id: 'inventory', label: 'Estoque', path: '/app/operacional/inventory' },
      { id: 'purchases', label: 'Compras', path: '/app/operacional/purchases' },
      { id: 'suppliers', label: 'Fornecedores', path: '/app/operacional/suppliers' },
    ],
  },

  {
    id: 'pdv',
    label: 'PDV',
    enabled: false,
    features: [
      { id: 'quick-sales', label: 'Vendas Rápidas', path: '/app/pdv/quick-sales' },
      { id: 'cashier', label: 'Caixa', path: '/app/pdv/cashier' },
      { id: 'payments', label: 'Pagamentos', path: '/app/pdv/payments' },
      { id: 'receipts', label: 'Comprovantes', path: '/app/pdv/receipts' },
    ],
  },

  {
    id: 'ai',
    label: 'IA',
    enabled: false,
    features: [
      { id: 'agent-config', label: 'Configuração do Agente', path: '/app/ai/agent-config' },
      { id: 'knowledge-base', label: 'Base de Conhecimento', path: '/app/ai/knowledge-base' },
      { id: 'prompt', label: 'Prompt / Comportamento', path: '/app/ai/prompt' },
      { id: 'integrations', label: 'Integrações do Agente', path: '/app/ai/integrations' },
      { id: 'testing', label: 'Testes do Agente', path: '/app/ai/testing' },
    ],
  },

  {
    id: 'reports',
    label: 'Relatórios',
    enabled: true,
    features: [
      { id: 'sales', label: 'Vendas', path: '/app/reports/sales' },
      { id: 'performance', label: 'Performance', path: '/app/reports/performance' },
      { id: 'custom', label: 'Personalizado', path: '/app/reports/custom' },
    ],
  },

  {
    id: 'integrations',
    label: 'Integrações',
    enabled: false,
    features: [
      { id: 'whatsapp', label: 'WhatsApp', path: '/app/integrations/whatsapp' },
      // { id: 'email', label: 'Email', path: '/app/integrations/email' },
      // { id: 'api', label: 'API', path: '/app/integrations/api' },
    ],
  },

  {
    id: 'financial',
    label: 'Financeiro',
    enabled: false,
    features: [
      { id: 'receivables', label: 'Contas a Receber', path: '/app/financial/receivables' },
      { id: 'payables', label: 'Contas a Pagar', path: '/app/financial/payables' },
      { id: 'cashflow', label: 'Fluxo de Caixa', path: '/app/financial/cashflow' },
    ],
  },

  {
    id: 'settings',
    label: 'Configurações',
    enabled: true,
    features: [
      { id: 'whitelabel', label: 'Perfil', path: '/app/settings/whitelabel' },
      { id: 'team', label: 'Equipe', path: '/app/settings/team' },
      { id: 'billing', label: 'Cobrança', path: '/app/settings/billing' },
    ],
  },
];
