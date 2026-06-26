import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, DollarSign, Clock, CheckCircle, AlertCircle, Filter } from "lucide-react";

const mockReceivables = [
  { id: 1, client: "João Silva", description: "Venda #1234", value: 1500.00, dueDate: "10/01/2026", status: "pending" },
  { id: 2, client: "Maria Santos", description: "Venda #1235", value: 2800.00, dueDate: "15/01/2026", status: "pending" },
  { id: 3, client: "Pedro Costa", description: "Venda #1230", value: 950.00, dueDate: "05/01/2026", status: "overdue" },
  { id: 4, client: "Ana Oliveira", description: "Venda #1228", value: 3200.00, dueDate: "01/01/2026", status: "paid" },
  { id: 5, client: "Carlos Lima", description: "Venda #1220", value: 1750.00, dueDate: "28/12/2025", status: "paid" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge variant="default" className="bg-green-500">Pago</Badge>;
    case "pending":
      return <Badge variant="secondary">Pendente</Badge>;
    case "overdue":
      return <Badge variant="destructive">Vencido</Badge>;
    default:
      return null;
  }
};

const Receivables = () => {
  const [search, setSearch] = useState("");

  const filteredReceivables = mockReceivables.filter(r =>
    r.client.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPending = mockReceivables.filter(r => r.status === "pending").reduce((acc, r) => acc + r.value, 0);
  const totalOverdue = mockReceivables.filter(r => r.status === "overdue").reduce((acc, r) => acc + r.value, 0);
  const totalPaid = mockReceivables.filter(r => r.status === "paid").reduce((acc, r) => acc + r.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left">
        <h1 className="text-3xl font-bold">Contas a Receber</h1>
        <Button className="hover:scale-105 transition-transform">
          <Plus className="mr-2 h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="opacity-0 animate-scale-in delay-100 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(totalPending + totalOverdue).toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="opacity-0 animate-scale-in delay-150 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" /> Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">R$ {totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="opacity-0 animate-scale-in delay-200 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Vencidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">R$ {totalOverdue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="opacity-0 animate-scale-in delay-250 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Recebidos (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">R$ {totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="opacity-0 animate-slide-up delay-300">
        <CardHeader>
          <CardTitle>Contas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por cliente ou descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceivables.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.client}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>R$ {item.value.toLocaleString()}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    {item.status !== "paid" && (
                      <Button size="sm" variant="outline">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Receber
                      </Button>
                    )}
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

export default Receivables;