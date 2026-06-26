import { 
  Store, 
  Stethoscope, 
  Scissors, 
  UtensilsCrossed, 
  Wheat,
  Building2
} from 'lucide-react';

const segments = [
  {
    icon: Store,
    title: 'Comércio',
    description: 'Lojas, varejos e atacados com PDV e controle de estoque.',
  },
  {
    icon: Stethoscope,
    title: 'Clínicas',
    description: 'Agendamentos, prontuários e gestão de pacientes.',
  },
  {
    icon: Scissors,
    title: 'Salões',
    description: 'Agenda de profissionais, comandas e fidelização.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurantes',
    description: 'PDV, comandas, delivery e controle de mesas.',
  },
  {
    icon: Wheat,
    title: 'Agronegócio',
    description: 'Gestão de safras, insumos e comercialização.',
  },
  {
    icon: Building2,
    title: 'Serviços',
    description: 'Prestadores de serviço com CRM e propostas.',
  },
];

const SegmentsSection = () => {
  return (
    <section id="segments" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 opacity-0 animate-fade-in">
            <span className="text-sm font-medium text-primary">Segmentos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 opacity-0 animate-slide-up delay-100">
            Soluções para diversos segmentos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-slide-up delay-200">
            Sistema flexível que se adapta às necessidades do seu negócio, 
            independente do tamanho ou segmento de atuação.
          </p>
        </div>

        {/* Segments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((segment, index) => (
            <div 
              key={segment.title}
              className="group flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 animate-slide-in-left"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <segment.icon size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{segment.title}</h3>
                <p className="text-sm text-muted-foreground">{segment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SegmentsSection;
