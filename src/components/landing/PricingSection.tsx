import { Button } from '@/components/ui/button';
import { 
  Mail, Phone, Send, CheckCircle, MessageCircle, 
  Play, Sparkles, Users, Clock, Shield, ArrowRight 
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PricingSection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nome, setNome] = useState('');
  const [mensagemTexto, setMensagemTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  // SUA URL DO GOOGLE APPS SCRIPT
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEY8d5b7X207AGdqpDnXo-3Z98ukUGOnvmkQJpCVt1Rmkro1Q6vra3f-zeWsBSsvR-jw/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !telefone) {
      setMensagem({
        tipo: 'erro',
        texto: '💡 Preencha pelo menos um contato (email ou telefone) para falarmos com você!'
      });
      return;
    }

    setEnviando(true);
    setMensagem({ tipo: '', texto: '' });

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome || 'Não informado',
          email: email || 'Não informado',
          telefone: telefone || 'Não informado',
          mensagem: mensagemTexto
            ? `${mensagemTexto} | Demonstração de interesse`
            : `Demonstração de interesse - ${new Date().toLocaleString('pt-BR')}`
        })
      });

      setMensagem({
        tipo: 'sucesso',
        texto: '✅ Obrigado! Em breve nossa equipe entrará em contato para uma conversa personalizada.'
      });

      setEmail('');
      setTelefone('');
      setNome('');
      setMensagemTexto('');

      setTimeout(() => {
        document.getElementById('contato-feedback')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);

    } catch (error) {
      setMensagem({
        tipo: 'erro',
        texto: '❌ Ops! Não foi possível salvar. Tente novamente ou fale conosco pelo WhatsApp.'
      });
      console.error('Erro ao salvar contato:', error);
    } finally {
      setEnviando(false);
    }
  };

  const handleDemo = () => {
    navigate('/app/dashboard');
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects Aprimorados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Aprimorado */}
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">
              Gestoriza
            </span>
          </div> */}

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Vamos <span className="gradient-text">conversar</span> sobre 
            <br />
            <span className="text-foreground">o futuro do seu negócio?</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Descubra como a Gestoriza pode transformar sua operação. 
            Deixe seu contato e agende uma conversa sem compromisso.
          </p>
        </div>

        {/* Grid: Formulário + Call to Action */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Formulário - ocupa 3 colunas */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-xl hover:shadow-2xl transition-shadow duration-500">
              {/* Background Decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

              <div className="relative z-10 p-8 md:p-10">
                {/* Badge de Confiança */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
                    <CheckCircle size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">
                      Atendimento humano
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Clock size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Sem pressão
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full px-4 py-3.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu melhor email"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="Seu telefone (com DDD)"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                    <textarea
                      value={mensagemTexto}
                      onChange={(e) => setMensagemTexto(e.target.value)}
                      placeholder="Conte um pouco sobre seu negócio ou o que você busca (opcional)"
                      rows={3}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                    <span className="absolute right-3 bottom-3 text-xs text-muted-foreground">
                      {mensagemTexto.length > 0 ? `${mensagemTexto.length} caracteres` : 'Opcional'}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 hover:scale-[1.02] transition-transform h-14 text-base"
                    disabled={enviando}
                  >
                    {enviando ? (
                      'Enviando...'
                    ) : (
                      <>
                        Quero conversar
                      </>
                    )}
                  </Button>
                </form>

                {/* Mensagem de segurança */}
                <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <Shield size={12} />
                  Seus dados estão seguros. Não compartilhamos com terceiros.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - ocupa 2 colunas */}
          <div className="lg:col-span-2 space-y-4">
            {/* Card: Ver Demonstração */}
            <div className="relative rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 text-center hover:shadow-xl transition-all duration-500 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Play size={32} className="text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Veja na prática
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Explore a plataforma e veja como a Gestoriza pode organizar seu negócio.
                </p>
                
                <Button 
                  onClick={handleDemo}
                  variant="outline" 
                  className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  Acessar demonstração
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            {/* Card: WhatsApp direto */}
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card p-8 text-center hover:shadow-xl transition-shadow duration-500">
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-1">
                Prefere WhatsApp?
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                Fale diretamente com nossa equipe
              </p>
              
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
              >
                <span>Chamar agora</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Feedback Message - Movido para baixo do grid */}
        {mensagem.texto && (
          <div 
            id="contato-feedback"
            className={`max-w-3xl mx-auto mt-8 p-4 rounded-xl text-center transition-all duration-500 ${
              mensagem.tipo === 'sucesso' 
                ? 'bg-success/10 border border-success/20 text-success' 
                : 'bg-destructive/10 border border-destructive/20 text-destructive'
            }`}
          >
            <p className="font-medium">{mensagem.texto}</p>
          </div>
        )}

        {/* Depoimentos rápidos */}
        {/* <div className="max-w-3xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          {[
            { nome: 'João Silva', texto: 'Transformou a gestão da minha padaria', empresa: 'Padaria do João' },
            { nome: 'Maria Santos', texto: 'Atendimento incrível e plataforma intuitiva', empresa: 'Studio Maria' },
            { nome: 'Carlos Lima', texto: 'Minhas vendas aumentaram 40%', empresa: 'Auto Center' }
          ].map((depoimento, index) => (
            <div 
              key={index}
              className="text-center p-4 rounded-xl bg-muted/30 border border-border opacity-0 animate-scale-in"
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              <p className="text-sm text-foreground font-medium">"{depoimento.texto}"</p>
              <p className="text-xs text-muted-foreground mt-2">
                {depoimento.nome}
                <span className="block text-[10px] text-muted-foreground/60">{depoimento.empresa}</span>
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default PricingSection;