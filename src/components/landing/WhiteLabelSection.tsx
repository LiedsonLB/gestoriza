import { Palette, Globe, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Sua identidade visual',
    description: 'Logo, cores primária e secundária totalmente customizáveis.',
  },
  {
    icon: Globe,
    title: 'Domínio próprio',
    description: 'Use seu próprio domínio ou subdomínio para acesso ao sistema.',
  },
  {
    icon: Shield,
    title: 'Sem marca ACUTIS',
    description: 'Seus clientes verão apenas a sua marca, 100% white label.',
  },
  {
    icon: Sparkles,
    title: 'Textos personalizados',
    description: 'Customize textos, emails e mensagens automáticas.',
  },
];

const WhiteLabelSection = () => {
  return (
    <section id="whitelabel" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 opacity-0 animate-slide-in-left">
              <span className="text-sm font-medium text-primary">White Label</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 opacity-0 animate-slide-in-left delay-100">
              Sistema com a <span className="gradient-text">sua marca</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 opacity-0 animate-slide-in-left delay-200">
              Revenda sistemas CRM, Operacional e PDV personalizados com sua identidade visual. 
              Diversifique seu portfólio e expanda seus negócios.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1 opacity-0 animate-scale-in"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative opacity-0 animate-slide-in-right delay-200">
            <div className="relative rounded-2xl border border-border bg-card p-6 shadow-lg hover:shadow-xl transition-shadow duration-500">
              {/* Config Panel Mock */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-4">Configurações White Label</h4>
                
                <div className="space-y-4">
                  <div className="opacity-0 animate-fade-in delay-400">
                    <label className="text-xs text-muted-foreground mb-2 block">Nome do Sistema</label>
                    <div className="h-10 rounded-lg bg-muted border border-border flex items-center px-3">
                      <span className="text-sm text-foreground">Minha Empresa CRM</span>
                    </div>
                  </div>

                  <div className="opacity-0 animate-fade-in delay-500">
                    <label className="text-xs text-muted-foreground mb-2 block">Cor Primária</label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 border-2 border-border hover:scale-110 transition-transform cursor-pointer" />
                      <div className="w-10 h-10 rounded-lg bg-green-500 border-2 border-transparent cursor-pointer hover:scale-110 transition-transform" />
                      <div className="w-10 h-10 rounded-lg bg-purple-500 border-2 border-transparent cursor-pointer hover:scale-110 transition-transform" />
                      <div className="w-10 h-10 rounded-lg bg-orange-500 border-2 border-transparent cursor-pointer hover:scale-110 transition-transform" />
                      <div className="w-10 h-10 rounded-lg bg-pink-500 border-2 border-transparent cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div className="opacity-0 animate-fade-in delay-600">
                    <label className="text-xs text-muted-foreground mb-2 block">Logo</label>
                    <div className="h-20 rounded-lg bg-muted border border-dashed border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Arraste sua logo aqui</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-border bg-muted p-4 opacity-0 animate-scale-in delay-700">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-blue-500" />
                  <span className="text-sm font-medium text-foreground">Minha Empresa CRM</span>
                </div>
                <div className="text-xs text-muted-foreground">Preview do sistema</div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -z-10 inset-0 blur-3xl bg-primary/10 rounded-full animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelSection;
