import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, Plus, Filter, Calendar } from "lucide-react";

const availableFields = [
  { id: "name", label: "Nome do Cliente" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Telefone" },
  { id: "sales", label: "Total de Vendas" },
  { id: "lastPurchase", label: "Última Compra" },
  { id: "status", label: "Status" },
  { id: "source", label: "Origem" },
  { id: "responsible", label: "Responsável" },
];

const savedReports = [
  { id: 1, name: "Vendas por Região", created: "01/01/2026", lastRun: "03/01/2026" },
  { id: 2, name: "Leads Qualificados", created: "15/12/2025", lastRun: "02/01/2026" },
  { id: 3, name: "Performance Mensal", created: "01/12/2025", lastRun: "01/01/2026" },
];

const Custom = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(["name", "email", "sales"]);
  const [reportName, setReportName] = useState("");

  const toggleField = (fieldId: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldId)
        ? prev.filter(f => f !== fieldId)
        : [...prev, fieldId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Relatórios Customizados</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Construtor de Relatório
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Nome do Relatório</Label>
                <Input
                  placeholder="Ex: Vendas do Trimestre"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Tipo de Dados</Label>
                <Select defaultValue="sales">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Vendas</SelectItem>
                    <SelectItem value="leads">Leads</SelectItem>
                    <SelectItem value="contacts">Contatos</SelectItem>
                    <SelectItem value="products">Produtos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Período</Label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div>
                    <Input type="date" />
                  </div>
                  <div>
                    <Input type="date" />
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Campos do Relatório</Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableFields.map((field) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={field.id}
                        checked={selectedFields.includes(field.id)}
                        onCheckedChange={() => toggleField(field.id)}
                      />
                      <label
                        htmlFor={field.id}
                        className="text-sm cursor-pointer"
                      >
                        {field.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  Gerar Relatório
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Relatórios Salvos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Criado em {report.created}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Última execução: {report.lastRun}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Custom;