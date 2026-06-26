import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleName: string;
  moduleDescription?: string;
}

const UpgradeModal = ({ open, onOpenChange, moduleName, moduleDescription }: UpgradeModalProps) => {

  const navigate = useNavigate();

  const handleUpgrade = () => {
    onOpenChange(false);
    navigate('/app/billing');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <DialogTitle className="text-center text-xl">
            Recurso indisponível no seu plano
          </DialogTitle>
          <DialogDescription className="text-center">
            O módulo <strong className="text-foreground">{moduleName}</strong> não está
            incluído no seu plano atual.
          </DialogDescription>
        </DialogHeader>

        {moduleDescription && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">{moduleDescription}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-4">
          <Button className="w-full gap-2" onClick={handleUpgrade}>
            {/* <Sparkles size={16} /> */}
            Fazer upgrade
          </Button>

          <Button variant="outline" className="w-full" onClick={handleUpgrade}>
            Ver planos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
