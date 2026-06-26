import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="opacity-0 animate-slide-up">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <img
                src="/img/logo_gestoriza.png"
                alt="Gestoriza Logo"
                width={150}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Tecnologia de grandes empresas para negócios locais.
            </p>
          </div>

          {/* Produto */}
          <div className="opacity-0 animate-slide-up delay-100">
            <h4 className="font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Módulos</a></li>
              <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Planos</a></li>
              {/* <li><a href="#whitelabel" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">White Label</a></li> */}
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Integrações</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="opacity-0 animate-slide-up delay-200">
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Sobre nós</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Carreiras</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Contato</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="opacity-0 animate-slide-up delay-300">
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Termos de uso</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Privacidade</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 opacity-0 animate-fade-in delay-400">
          <p className="text-sm text-muted-foreground">
            © 2024 Gestoriza. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            gestoriza.com.br
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
