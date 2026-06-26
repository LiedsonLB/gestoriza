import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLocation } from 'react-router-dom';

interface TutorialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tutorialVideos: Record<string, { title: string; videoId: string; description: string }> = {
  '/app/dashboard': {
    title: 'Dashboard',
    videoId: 'dQw4w9WgXcQ',
    description: 'Aprenda a usar o dashboard para visualizar métricas e acompanhar o desempenho do seu negócio.',
  },
  '/app/crm/leads': {
    title: 'Gerenciamento de Clientes',
    videoId: 'dQw4w9WgXcQ',
    description: 'Aprenda a capturar, organizar e converter leads em clientes.',
  },
  '/app/crm/contacts': {
    title: 'Contatos',
    videoId: 'dQw4w9WgXcQ',
    description: 'Gerencie sua base central de clientes e mantenha o histórico de interações.',
  },
  '/app/crm/funnel': {
    title: 'Funil de Vendas',
    videoId: 'dQw4w9WgXcQ',
    description: 'Visualize e gerencie seu pipeline de vendas com o kanban interativo.',
  },
  '/app/crm/deals': {
    title: 'Negócios',
    videoId: 'dQw4w9WgXcQ',
    description: 'Controle suas negociações e acompanhe o progresso de cada oportunidade.',
  },
  '/app/pdv/quick-sales': {
    title: 'Venda Rápida',
    videoId: 'dQw4w9WgXcQ',
    description: 'Realize vendas de forma rápida e eficiente no ponto de venda.',
  },
  '/app/pdv/cashier': {
    title: 'Caixa',
    videoId: 'dQw4w9WgXcQ',
    description: 'Aprenda a abrir, fechar e gerenciar o caixa do seu estabelecimento.',
  },
  '/app/erp/products': {
    title: 'Produtos',
    videoId: 'dQw4w9WgXcQ',
    description: 'Cadastre e gerencie seus produtos de forma eficiente.',
  },
  '/app/settings/whitelabel': {
    title: 'Personalização',
    videoId: 'dQw4w9WgXcQ',
    description: 'Personalize o sistema com a identidade visual da sua empresa.',
  },
};

const TutorialModal = ({ open, onOpenChange }: TutorialModalProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Find the best matching tutorial
  const tutorial = tutorialVideos[currentPath] || {
    title: 'Tutorial',
    videoId: 'dQw4w9WgXcQ',
    description: 'Aprenda a usar esta funcionalidade do sistema.',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Como usar: {tutorial.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">{tutorial.description}</p>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${tutorial.videoId}`}
              title={tutorial.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
