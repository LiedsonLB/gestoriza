import { useState } from 'react';
import { Menu, Bell, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTenant } from '@/contexts/TenantContext';
import TutorialModal from './TutorialModal';

interface AppHeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

const AppHeader = ({ onMenuToggle, sidebarOpen }: AppHeaderProps) => {
  const { plan } = useTenant();
  const [tutorialOpen, setTutorialOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-background border-b border-border flex items-center px-4 gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          onClick={onMenuToggle}
        >
          <Menu size={20} />
        </Button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Tutorial button */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setTutorialOpen(true)}
          >
            <PlayCircle size={16} />
            <span className="hidden sm:inline">Como usar</span>
          </Button>

          {/* Plan badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            Plano {plan.plan}
          </div>

          {/* Notifications */}
          {/* <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
          </Button> */}
        </div>
      </header>

      <TutorialModal open={tutorialOpen} onOpenChange={setTutorialOpen} />
    </>
  );
};

export default AppHeader;
