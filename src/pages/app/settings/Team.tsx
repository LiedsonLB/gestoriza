import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, MoreHorizontal, Mail, Shield } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockTeam = [
  { id: 1, name: 'Carlos Silva', email: 'carlos@empresa.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Ana Paula', email: 'ana@empresa.com', role: 'Vendedor', status: 'active' },
  { id: 3, name: 'João Santos', email: 'joao@empresa.com', role: 'Operador', status: 'pending' },
];

const Team = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Equipe</h1>
          <p className="text-muted-foreground">Gerencie usuários e permissões</p>
        </div>
        <Dialog>
          <DialogTrigger asChild><Button className="hover:scale-105 transition-transform"><Plus className="h-4 w-4 mr-2" />Convidar</Button></DialogTrigger>
          <DialogContent className="animate-scale-in">
            <DialogHeader><DialogTitle>Convidar Usuário</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2"><Label>Email</Label><Input placeholder="email@exemplo.com" /></div>
              <div className="space-y-2"><Label>Permissão</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="operador">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Enviar Convite</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="opacity-0 animate-scale-in delay-100 hover:shadow-lg transition-shadow"><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center"><Users className="h-5 w-5 text-primary" /></div><div><p className="text-sm text-muted-foreground">Total</p><p className="text-xl font-bold">{mockTeam.length}</p></div></div></CardContent></Card>
        <Card className="opacity-0 animate-scale-in delay-150 hover:shadow-lg transition-shadow"><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center"><Users className="h-5 w-5 text-green-500" /></div><div><p className="text-sm text-muted-foreground">Ativos</p><p className="text-xl font-bold">{mockTeam.filter(u => u.status === 'active').length}</p></div></div></CardContent></Card>
        <Card className="opacity-0 animate-scale-in delay-200 hover:shadow-lg transition-shadow"><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center"><Mail className="h-5 w-5 text-yellow-500" /></div><div><p className="text-sm text-muted-foreground">Pendentes</p><p className="text-xl font-bold">{mockTeam.filter(u => u.status === 'pending').length}</p></div></div></CardContent></Card>
      </div>

      <Card className="opacity-0 animate-slide-up delay-300">
        <CardHeader><CardTitle>Membros da Equipe</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Usuário</TableHead><TableHead>Permissão</TableHead><TableHead>Status</TableHead><TableHead className="w-[50px]"></TableHead></TableRow></TableHeader>
            <TableBody>
              {mockTeam.map((user) => (
                <TableRow key={user.id}>
                  <TableCell><div><p className="font-medium">{user.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></div></TableCell>
                  <TableCell><Badge variant="outline"><Shield className="h-3 w-3 mr-1" />{user.role}</Badge></TableCell>
                  <TableCell><Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status === 'active' ? 'Ativo' : 'Pendente'}</Badge></TableCell>
                  <TableCell>
                    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end"><DropdownMenuItem>Editar</DropdownMenuItem><DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem></DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Team;
