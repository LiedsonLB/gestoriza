import { 
  Users, 
  MessageSquare, 
  ShoppingCart, 
  BarChart3, 
  Wallet,
  Bot,
  Zap,
  Brain
} from 'lucide-react';

const modules = [
  {
    icon: Users,
    title: 'CRM',
    description: 'Gerencie clientes, contatos e fluxo de vendas com funil visual e automações.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: Bot,
    title: 'Bot de Atendimento',
    description: 'Automação inteligente de WhatsApp com fluxos personalizados e respostas automáticas.',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    icon: ShoppingCart,
    title: 'PDV',
    description: 'Vendas rápidas, controle de caixa, múltiplas formas de pagamento e emissão de comprovantes.',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    icon: BarChart3,
    title: 'ERP',
    description: 'Produtos, estoque, compras, fornecedores e gestão completa do seu negócio.',
    color: 'bg-orange-500/10 text-orange-500',
  },
  {
    icon: Wallet,
    title: 'Financeiro',
    description: 'Contas a pagar e receber, fluxo de caixa e relatórios financeiros detalhados.',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    icon: Brain,
    title: 'Inteligência Artificial',
    description: 'Resumo de conversas, score de clientes, sugestão de respostas e previsão de vendas.',
    color: 'bg-pink-500/10 text-pink-500',
  },
  {
    icon: Zap,
    title: 'Automação (Em breve)',
    description: 'Workflows visuais com triggers e ações automáticas para otimizar processos.',
    color: 'bg-yellow-500/10 text-yellow-500',
  },
  {
    icon: MessageSquare,
    title: 'Integrações',
    description: 'WhatsApp, Email, Instagram e Facebook para conectar com suas ferramentas favoritas.',
    color: 'bg-cyan-500/10 text-cyan-500',
  },
];

const ModulesSection = () => {
  return (
    <section id="modules" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 opacity-0 animate-fade-in">
            <span className="text-sm font-medium text-primary">Módulos completos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 opacity-0 animate-slide-up delay-100">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-slide-up delay-200">
            Automação que vende, atende e organiza. Escolha os módulos que sua empresa precisa e pague apenas pelo que usar.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <div 
              key={module.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 opacity-0 animate-scale-in"
              style={{ animationDelay: `${300 + index * 75}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <module.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{module.title}</h3>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
