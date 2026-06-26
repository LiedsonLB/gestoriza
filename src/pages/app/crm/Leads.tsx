import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Phone,
  Upload,
} from 'lucide-react';
import NewLeadModal from '@/components/app/NewLeadModal';

const mockLeads = [
  { id: 1, name: 'João Silva', phone: '(11) 99999-1234', email: 'joao@email.com', origin: 'WhatsApp', status: 'Novo', tags: ['Quente'], responsible: 'Maria', createdAt: '2024-01-15' },
  { id: 2, name: 'Maria Santos', phone: '(11) 99999-5678', email: 'maria@email.com', origin: 'Site', status: 'Em contato', tags: ['B2B'], responsible: 'João', createdAt: '2024-01-14' },
  { id: 3, name: 'Pedro Costa', phone: '(11) 99999-9012', email: 'pedro@email.com', origin: 'Indicação', status: 'Qualificado', tags: ['Premium'], responsible: 'Maria', createdAt: '2024-01-13' },
  { id: 4, name: 'Ana Lima', phone: '(11) 99999-3456', email: 'ana@email.com', origin: 'WhatsApp', status: 'Novo', tags: ['Quente', 'Urgente'], responsible: 'João', createdAt: '2024-01-12' },
  { id: 5, name: 'Carlos Souza', phone: '(11) 99999-7890', email: 'carlos@email.com', origin: 'Facebook', status: 'Perdido', tags: [], responsible: 'Maria', createdAt: '2024-01-11' },
];

const statusColors: Record<string, string> = {
  'Novo': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Em contato': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  'Qualificado': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Perdido': 'bg-red-500/10 text-red-600 border-red-500/20',
};

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leads] = useState(mockLeads);
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 opacity-0 animate-slide-in-left delay-100" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie seus clientes e oportunidades</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload size={16} />
            Importar
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setNewLeadModalOpen(true)}>
            <Plus size={16} />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="opacity-0 animate-slide-up delay-100" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{leads.length}</div>
            <div className="text-sm text-muted-foreground">Total de leads</div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-slide-up delay-150" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {leads.filter(l => l.status === 'Novo').length}
            </div>
            <div className="text-sm text-muted-foreground">Novos</div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-slide-up delay-200" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.status === 'Qualificado').length}
            </div>
            <div className="text-sm text-muted-foreground">Qualificados</div>
          </CardContent>
        </Card>
        <Card className="opacity-0 animate-slide-up delay-250" style={{ animationFillMode: 'forwards' }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {leads.filter(l => l.status === 'Em contato').length}
            </div>
            <div className="text-sm text-muted-foreground">Em contato</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="opacity-0 animate-slide-up delay-300" style={{ animationFillMode: 'forwards' }}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="opacity-0 animate-slide-up delay-350" style={{ animationFillMode: 'forwards' }}>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead className="hidden md:table-cell">Origem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Tags</TableHead>
                <TableHead className="hidden md:table-cell">Responsável</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone size={12} />
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{lead.origin}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex gap-1">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{lead.responsible}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Converter em contato</DropdownMenuItem>
                        <DropdownMenuItem>Enviar mensagem</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Lead Modal */}
      <NewLeadModal
        open={newLeadModalOpen}
        onOpenChange={setNewLeadModalOpen}
        onSave={(lead) => console.log('New lead:', lead)}
      />
    </div>
  );
};

export default Leads;
