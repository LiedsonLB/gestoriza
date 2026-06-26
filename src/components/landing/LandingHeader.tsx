import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass animate-slide-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className='flex gap-4'>
              <img
                src="/img/logo_gestoriza.png"
                alt="Gestoriza Logo"
                width={150}
                className="opacity-0 animate-fade-in"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#modules" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium hover:scale-105 transform opacity-0 animate-fade-in delay-100">
              Módulos
            </a>
            <a href="#segments" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium hover:scale-105 transform opacity-0 animate-fade-in delay-150">
              Segmentos
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium hover:scale-105 transform opacity-0 animate-fade-in delay-200">
              Planos
            </a>
            {/* <a href="#whitelabel" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium hover:scale-105 transform opacity-0 animate-fade-in delay-250">
              White Label
            </a> */}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/app/login" className="opacity-0 animate-fade-in delay-300">
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
                Entrar
              </Button>
            </Link>
            <Link to="/app/login" className="opacity-0 animate-fade-in delay-350">
              <Button size="sm" className="glow hover:scale-105 transition-transform">
                Começar agora
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="animate-rotate-in" /> : <Menu size={24} className="animate-rotate-in" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col gap-4">
              <a href="#modules" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium opacity-0 animate-slide-in-left delay-75">
                Módulos
              </a>
              <a href="#segments" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium opacity-0 animate-slide-in-left delay-100">
                Segmentos
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium opacity-0 animate-slide-in-left delay-150">
                Planos
              </a>
              <a href="#whitelabel" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium opacity-0 animate-slide-in-left delay-200">
                White Label
              </a>
              <div className="flex flex-col gap-2 pt-4 opacity-0 animate-fade-in delay-250">
                <Link to="/app/login">
                  <Button variant="ghost" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link to="/app/login">
                  <Button className="w-full">
                    Começar agora
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
