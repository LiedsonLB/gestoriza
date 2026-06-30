import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    "id": "comercial-starter",
    "name": "Comercial Starter",
    "segment": "Comercial",
    "description": "Ideal para pequenos negócios iniciando a digitalização",
    "price": 99,
    "featured": false,
    "image": "https://cdls.org.br/wp-content/uploads/cndl/2020/05/reabertura-com%C3%A9rcio.jpg",
    "features": ["PDV", "Operacional", "Financeiro"]
  },
  {
    "id": "comercial-pro",
    "name": "Comercial Pro",
    "segment": "Comercial",
    "description": "Automação e crescimento com inteligência artificial",
    "price": 199,
    "featured": true,
    "image": "https://rohden.com/wp-content/uploads/2018/01/Vendedor-capacitado.jpg",
    "features": [
      "CRM",
      // "Agente de IA",
      "PDV",
      "Operacional",
      "Financeiro"
    ]
  },
  // {
  //   "id": "comercial-enterprise",
  //   "name": "Comercial Enterprise",
  //   "segment": "Comercial",
  //   "description": "Operações robustas e personalizadas",
  //   "price": 299,
  //   "featured": false,
  //   "image": "https://www.pontotel.com.br/local/wp-content/uploads/2024/07/o-que-e-enterprise.webp",
  //   "features": [
  //     "Tudo do Comercial Pro",
  //     // "Usuários ilimitados",
  //     "Automações avançadas",
  //     "Integrações personalizadas",
  //     "Suporte prioritário"
  //   ]
  // },
  // {
  //   "id": "barbearia",
  //   "name": "Barbearia",
  //   "segment": "Serviços",
  //   "description": "Gestão moderna para barbearias",
  //   "price": 129,
  //   "featured": false,
  //   "image": "https://megaprofissional.com.br/upload/blog/24/mega-profissional-7-dicas-incriveis-para-fazer-sua-barbearia-bombar-1-media.jpg",
  //   "features": ["CRM", "Agente de IA", "Agendamento", "Financeiro"]
  // },
  // {
  //   "id": "restaurante-app",
  //   "name": "Restaurante App",
  //   "segment": "Restaurante",
  //   "description": "Foco em delivery e atendimento digital",
  //   "price": 149,
  //   "featured": false,
  //   "image": "https://img.freepik.com/fotos-gratis/pessoas-tirando-fotos-de-comida_23-2149303524.jpg?semt=ais_hybrid&w=740&q=80",
  //   "features": ["CRM", "Agente de IA", "Delivery", "Financeiro"]
  // },
  // {
  //   "id": "restaurante-store",
  //   "name": "Restaurante Store",
  //   "segment": "Restaurante",
  //   "description": "Operação física com controle de pedidos",
  //   "price": 179,
  //   "featured": false,
  //   "image": "https://www.viajenaviagem.com/wp-content/uploads/2024/12/recife-restaurante-leite-16x9-1.jpg.webp",
  //   "features": ["PDV", "Delivery", "Comandas", "Financeiro"]
  // },
  // {
  //   "id": "restaurante-pro",
  //   "name": "Restaurante Pro",
  //   "segment": "Restaurante",
  //   "description": "Gestão completa para restaurantes",
  //   "price": 249,
  //   "featured": false,
  //   "image": "https://portal-foodjobs.curriculum.com.br/wp-content/uploads/2017/04/dreamstime_xl_64656038.jpg",
  //   "features": [
  //     "PDV",
  //     "CRM",
  //     "Agente de IA",
  //     "Comandas",
  //     "Delivery",
  //     "Financeiro"
  //   ]
  // },
  // {
  //   "id": "academia",
  //   "name": "Academia",
  //   "segment": "Saúde",
  //   "description": "Controle básico de alunos",
  //   "price": 79,
  //   "featured": false,
  //   "image": "https://pratiquefitness.com.br/blog/wp-content/uploads/2023/07/Como-montar-e-manter-uma-rotina-de-treino-na-academia-2.jpg",
  //   "features": ["CRM"]
  // },
  // {
  //   "id": "academia-pro",
  //   "name": "Academia Pro",
  //   "segment": "Saúde",
  //   "description": "Gestão avançada de academias",
  //   "price": 159,
  //   "featured": false,
  //   "image": "https://gestaofitness.com.br/files/2016/10/Untitled-design7.jpg",
  //   "features": ["CRM", "Ficha de Treino", "Mensalidades"]
  // },
  // {
  //   "id": "consultorio",
  //   "name": "Consultório",
  //   "segment": "Saúde",
  //   "description": "Organização e atendimento profissional",
  //   "price": 139,
  //   "featured": false,
  //   "image": "https://www.amplum.solutions/wp-content/uploads/2020/11/como-otimizar-a-gestao-do-consultorio-medico.jpg",
  //   "features": ["CRM", "Agenda", "Financeiro"]
  // }
]


const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">
              Planos Gestoriza
            </span>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">
            Escolha o plano ideal para o seu negócio
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções pensadas para cada tipo de operação. Escale quando quiser,
            sem burocracia.
          </p>
        </div>

        {/* Cards */}
        {/* <div
          className="grid gap-8 max-w-6xl mx-auto"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative group rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-3 ${plan.featured
                ? 'border-primary shadow-2xl shadow-primary/20'
                : 'border-border'
                }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${plan.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

              <div className="absolute inset-0 bg-[url('/img/hex-pattern.svg')] opacity-20 mix-blend-overlay" />

              {plan.featured && (
                <div className="absolute top-5 right-5 z-20 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs flex items-center gap-1">
                  <Sparkles size={12} />
                  Mais popular
                </div>
              )}

              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-lg border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {plan.segment}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>

                <p className="text-sm text-white/70 mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    R$ {plan.price}
                  </span>
                  <span className="text-white/60"> / mês</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <Check size={16} className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/app/login" className="mt-auto">
                  <Button
                    className={`w-full ${plan.featured ? 'glow' : ''
                      }`}
                    variant={plan.featured ? 'default' : 'outline'}
                  >
                    Começar agora
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}

export default PricingSection
