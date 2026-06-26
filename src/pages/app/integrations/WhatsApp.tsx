import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, CheckCircle2, AlertCircle, QrCode, RefreshCw } from 'lucide-react';

const WhatsAppIntegration = () => {
  const isConnected = true;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">WhatsApp</h1>
        <p className="text-muted-foreground">Conecte seu WhatsApp para automações</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${isConnected ? 'bg-green-500/20' : 'bg-muted'}`}>
                <MessageSquare className={`h-7 w-7 ${isConnected ? 'text-green-500' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">WhatsApp Business</h3>
                <div className="flex items-center gap-2 mt-1">
                  {isConnected ? (
                    <Badge className="bg-green-500/20 text-green-600"><CheckCircle2 className="h-3 w-3 mr-1" />Conectado</Badge>
                  ) : (
                    <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Desconectado</Badge>
                  )}
                  <span className="text-sm text-muted-foreground">+55 11 99999-0000</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><RefreshCw className="h-4 w-4 mr-2" />Reconectar</Button>
              <Button variant="destructive">Desconectar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Mensagens Enviadas</p><p className="text-2xl font-bold">1.250</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Mensagens Recebidas</p><p className="text-2xl font-bold">890</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Limite Mensal</p><p className="text-2xl font-bold">5.000</p></CardContent></Card>
      </div>

      {!isConnected && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center py-12">
            <QrCode className="h-32 w-32 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Escaneie o QR Code</h3>
            <p className="text-muted-foreground">Abra o WhatsApp no seu celular e escaneie o código</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WhatsAppIntegration;
