import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpCircle, ArrowDownCircle, Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from "recharts";

const cashflowData = [
  { date: "01/01", entradas: 8500, saidas: 5200, saldo: 3300 },
  { date: "05/01", entradas: 6200, saidas: 4800, saldo: 4700 },
  { date: "10/01", entradas: 9800, saidas: 7200, saldo: 7300 },
  { date: "15/01", entradas: 5400, saidas: 8100, saldo: 4600 },
  { date: "20/01", entradas: 11200, saidas: 6500, saldo: 9300 },
  { date: "25/01", entradas: 7800, saidas: 5900, saldo: 11200 },
  { date: "30/01", entradas: 9100, saidas: 6800, saldo: 13500 },
];

const dailyDetails = [
  { date: "03/01/2026", entradas: 4500, saidas: 1200, saldo: 15800 },
  { date: "02/01/2026", entradas: 2800, saidas: 3500, saldo: 12500 },
  { date: "01/01/2026", entradas: 6200, saidas: 2100, saldo: 13200 },
];

const Cashflow = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between opacity-0 animate-slide-in-left">
        <h1 className="text-3xl font-bold">Fluxo de Caixa</h1>
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
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="opacity-0 animate-scale-in delay-100 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 15.800</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" /> +12% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="opacity-0 animate-scale-in delay-150 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowUpCircle className="h-4 w-4 text-green-500" /> Entradas (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">R$ 58.000</div>
          </CardContent>
        </Card>

        <Card className="opacity-0 animate-scale-in delay-200 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowDownCircle className="h-4 w-4 text-red-500" /> Saídas (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">R$ 44.500</div>
          </CardContent>
        </Card>

        <Card className="opacity-0 animate-scale-in delay-250 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resultado (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+ R$ 13.500</div>
          </CardContent>
        </Card>
      </div>

      <Card className="opacity-0 animate-slide-up delay-300">
        <CardHeader>
          <CardTitle>Evolução do Saldo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toLocaleString()}`, ""]}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="saldo" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                  name="Saldo"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="opacity-0 animate-slide-up delay-400">
        <CardHeader>
          <CardTitle>Entradas vs Saídas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toLocaleString()}`, ""]}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                />
                <Bar dataKey="entradas" fill="#22c55e" name="Entradas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saidas" fill="#ef4444" name="Saídas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span className="text-sm">Entradas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span className="text-sm">Saídas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="opacity-0 animate-slide-up delay-500">
        <CardHeader>
          <CardTitle>Movimentações Diárias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyDetails.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="font-medium">{day.date}</div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-green-500 font-medium">+ R$ {day.entradas.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Entradas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-500 font-medium">- R$ {day.saidas.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Saídas</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">R$ {day.saldo.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Saldo</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cashflow;