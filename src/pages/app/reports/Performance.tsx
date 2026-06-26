import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Target, Clock, TrendingUp, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const userPerformance = [
  { name: "João Silva", sales: 45, target: 40, conversion: 28, sla: 95 },
  { name: "Maria Santos", sales: 38, target: 40, conversion: 24, sla: 92 },
  { name: "Pedro Costa", sales: 52, target: 45, conversion: 32, sla: 88 },
  { name: "Ana Oliveira", sales: 41, target: 40, conversion: 26, sla: 96 },
];

const funnelData = [
  { stage: "Leads", value: 1000 },
  { stage: "Qualificados", value: 450 },
  { stage: "Propostas", value: 180 },
  { stage: "Negociação", value: 95 },
  { stage: "Fechados", value: 42 },
];

const Performance = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Relatório de Performance</h1>
        <div className="flex gap-4">
          <Select defaultValue="30d">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Meta da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">107%</div>
            <Progress value={107} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversão Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27.5%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" /> +3% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SLA Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">93%</div>
            <p className="text-xs text-muted-foreground">Meta: 90%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Meta: 4h
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Performance por Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userPerformance.map((user) => (
              <div key={user.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge variant={user.sales >= user.target ? "default" : "secondary"}>
                        {user.sales >= user.target ? "Meta alcançada" : "Em progresso"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{user.sales}</div>
                    <div className="text-xs text-muted-foreground">Vendas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Math.round((user.sales / user.target) * 100)}%</div>
                    <div className="text-xs text-muted-foreground">da Meta</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{user.conversion}%</div>
                    <div className="text-xs text-muted-foreground">Conversão</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${user.sla >= 90 ? "text-green-500" : "text-yellow-500"}`}>
                      {user.sla}%
                    </div>
                    <div className="text-xs text-muted-foreground">SLA</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance do Funil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="stage" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Performance;