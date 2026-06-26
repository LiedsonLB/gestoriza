import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useRef, useEffect } from 'react';

const HeroSection = () => {
  const features = [
    'CRM completo',
    'Bot de Atendimento',
    'PDV integrado',
    'Financeiro',
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Tenta reproduzir automaticamente quando o componente montar
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Silencia o erro de autoplay (alguns navegadores bloqueiam)
        console.log('Autoplay blocked:', error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 opacity-0 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">100% White Label</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-slide-up delay-100">
              <span className="text-foreground">Tecnologia de</span>
              <br />
              <span className="gradient-text">grandes empresas</span>
              <br />
              <span className="text-foreground">para negócios locais</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl opacity-0 animate-slide-up delay-200">
              Seu sistema, sua marca. Plataforma SaaS completa para CRM, Operacional, PDV e 
              automação de atendimento. Pague apenas pelo que usar.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={feature}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-sm opacity-0 animate-scale-in"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <CheckCircle size={14} className="text-primary" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-700">
              <Link to="/app/register">
                <Button size="lg" className="gap-2 glow w-full sm:w-auto hover:scale-105 transition-transform">
                  Começar agora
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/app/login">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto hover:scale-105 transition-transform">
                  <Play size={18} />
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="relative opacity-0 animate-slide-in-right delay-300">
            <div className="relative rounded-2xl border border-border bg-card shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-500">
              {/* Video Container */}
              <div className="relative aspect-video bg-black/5 group">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/img/gestoriza_tumbnail3.png"
                >
                  <source src="/video/gestorizavideo.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
                
                {/* Play Button Overlay - visível apenas quando o vídeo está pausado */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Play size={28} className="text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Video Info Bar */}
              <div className="flex items-center justify-between p-3 border-t border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">Demonstração do Gestoriza</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-4 -left-4 p-4 rounded-xl bg-card border border-border shadow-lg animate-float opacity-0 animate-scale-bounce delay-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle size={16} className="text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Venda concluída</div>
                  <div className="text-xs text-muted-foreground">R$ 1.250,00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;