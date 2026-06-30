import { Button } from '@/components/ui/button';
import { Mail, Phone, Send, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const PricingSection = () => {
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nome, setNome] = useState('');
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
          mensagem: `Interessado em orçamento personalizado - ${new Date().toLocaleString('pt-BR')}`
        })
      });

      setMensagem({ 
        tipo: 'sucesso', 
        texto: '✅ Contato salvo! Em breve nossa equipe entrará em contato com uma avaliação personalizada para o seu negócio.' 
      });
      
      setEmail('');
      setTelefone('');
      setNome('');

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

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">
              Planos Gestoriza
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Preços <span className="gradient-text">personalizados</span> para o seu negócio
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cada negócio é único. Conte-nos sobre o seu e receba uma avaliação 
            sob medida com o melhor custo-benefício.
          </p>
        </div>

        {/* Main Card - Formulário de Contato */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
            {/* Background Decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 md:p-12">
              {/* Badge de Confiança */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">
                    Atendimento personalizado
                  </span>
                </div>
              </div>

              {/* Benefícios rápidos */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: '🚀', text: 'Sem burocracia' },
                  { icon: '💰', text: 'Preço justo' },
                  { icon: '📊', text: 'Sob medida' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="text-center p-3 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs font-medium text-foreground">{item.text}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu melhor email"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full gap-2 hover:scale-[1.02] transition-transform"
                  disabled={enviando}
                >
                  {enviando ? (
                    'Enviando...'
                  ) : (
                    <>
                      Quero uma avaliação personalizada
                      <Send size={18} />
                    </>
                  )}
                </Button>
              </form>

              {/* Mensagem de segurança */}
              <p className="text-center text-xs text-muted-foreground mt-4">
                🔒 Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </div>
          </div>

          {/* Feedback Message */}
          {mensagem.texto && (
            <div 
              id="contato-feedback"
              className={`mt-6 p-4 rounded-xl text-center transition-all duration-500 ${
                mensagem.tipo === 'sucesso' 
                  ? 'bg-success/10 border border-success/20 text-success' 
                  : 'bg-destructive/10 border border-destructive/20 text-destructive'
              }`}
            >
              <p className="font-medium">{mensagem.texto}</p>
            </div>
          )}

          {/* Contatos alternativos */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground flex-wrap">
              <span>📞 Prefere falar agora?</span>
              <a 
                href="tel:+5511999999999" 
                className="text-primary hover:underline font-medium"
              >
                (11) 99999-9999
              </a>
              <span>ou</span>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>💬</span> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;