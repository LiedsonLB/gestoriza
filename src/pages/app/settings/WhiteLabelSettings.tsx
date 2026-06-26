import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTenant } from '@/contexts/TenantContext';
import { Palette, Upload, Check, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';

const colorPresets = [
  { name: 'Verde', value: '142 71% 45%' },
  { name: 'Azul', value: '217 91% 60%' },
  { name: 'Roxo', value: '262 83% 58%' },
  { name: 'Laranja', value: '24 95% 53%' },
  { name: 'Rosa', value: '330 81% 60%' },
  { name: 'Ciano', value: '186 94% 41%' },
  { name: 'Vermelho', value: '0 84% 60%' },
  { name: 'Amarelo', value: '45 93% 47%' },
  // more colors here
  { name: 'Turquesa', value: '174 100% 29%' },
  { name: 'Indigo', value: '231 76% 48%' },
  { name: 'Magenta', value: '302 76% 57%' },
  { name: 'Lima', value: '96 100% 50%' },
  { name: 'Vermelho Escuro', value: '348 83% 47%' },
  { name: 'Dourado', value: '51 100% 50%' },
  { name: 'Prata', value: '0 0% 75%' },
  { name: 'Bronze', value: '30 59% 40%' },
  // more colors here
  { name: 'Azul Claro', value: '197 71% 73%' },
  { name: 'Roxo Claro', value: '271 76% 72%' },
  { name: 'Verde Claro', value: '142 71% 75%' },
  { name: 'Laranja Claro', value: '24 95% 73%' },
  { name: 'Rosa Claro', value: '330 81% 70%' },
  { name: 'Ciano Claro', value: '186 94% 71%' },
  { name: 'Vermelho Claro', value: '0 84% 73%' },
  { name: 'Amarelo Claro', value: '45 93% 77%' },
];

const WhiteLabelSettings = () => {
  const { tenant, setTenant, applyTheme } = useTenant();
  const [formData, setFormData] = useState({
    name: tenant.name,
    logo: tenant.logo,
    primaryColor: tenant.primaryColor,
  });
  const [isDark, setIsDark] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  const handleColorSelect = (color: string) => {
    setFormData(prev => ({ ...prev, primaryColor: color }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("O arquivo é muito grande. Máximo 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, logo: base64String }));
        toast.success("Logo carregada com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedTenant = {
      ...tenant,
      name: formData.name,
      logo: formData.logo,
      primaryColor: formData.primaryColor,
      secondaryColor: tenant.secondaryColor,
    };
    
    setTenant(updatedTenant);
    document.documentElement.style.setProperty('--primary', formData.primaryColor);
    applyTheme();
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">White Label</h1>
        <p className="text-muted-foreground">Personalize o sistema com sua marca</p>
      </div>

      {/* Brand Name */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Nome do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="name">Nome exibido no sistema</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nome da sua empresa"
            />
          </div>
        </CardContent>
      </Card>

      {/* Logo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">
                      {formData.name?.charAt(0) || 'L'}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                {/* Input de arquivo escondido */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/svg+xml"
                  className="hidden"
                />

                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()} // Dispara o input
                >
                  <Upload size={16} />
                  Fazer upload
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG ou SVG. Máximo 2MB.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">Ou insira a URL da logo</Label>
              <Input
                id="logoUrl"
                value={formData.logo}
                onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2">{isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}Tema</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Modo Escuro</p>
              <p className="text-sm text-muted-foreground">Ativar tema escuro na plataforma</p>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette size={20} />
            Cor Primária
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Escolha a cor principal do sistema. Ela será aplicada em botões, links e destaques.
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {colorPresets.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorSelect(color.value)}
                  className={`relative w-12 h-12 rounded-lg transition-transform hover:scale-110 ${formData.primaryColor === color.value
                    ? 'ring-2 ring-offset-2 ring-foreground'
                    : ''
                    }`}
                  style={{ backgroundColor: `hsl(${color.value})` }}
                  title={color.name}
                >
                  {formData.primaryColor === color.value && (
                    <Check className="absolute inset-0 m-auto text-white" size={20} />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customColor">Cor personalizada (HSL)</Label>
              <Input
                id="customColor"
                value={formData.primaryColor}
                onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                placeholder="142 71% 45%"
              />
              <p className="text-xs text-muted-foreground">
                Formato: matiz saturação% luminosidade% (ex: 142 71% 45%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-xl border border-border bg-muted/30">
            <div className="flex items-center gap-3 mb-6">
              {formData.logo ? (
                <img src={formData.logo} alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
              ) : (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `hsl(${formData.primaryColor})` }}
                >
                  <span className="text-white font-bold">
                    {formData.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-semibold text-foreground">{formData.name}</span>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                style={{ backgroundColor: `hsl(${formData.primaryColor})` }}
              >
                Botão Primário
              </Button>
              <div
                className="h-2 rounded-full"
                style={{ backgroundColor: `hsl(${formData.primaryColor})` }}
              />
              <div className="flex gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs text-white"
                  style={{ backgroundColor: `hsl(${formData.primaryColor})` }}
                >
                  Tag ativa
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: `hsl(${formData.primaryColor} / 0.1)`,
                    color: `hsl(${formData.primaryColor})`
                  }}
                >
                  Tag secundária
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Salvar alterações
        </Button>
      </div>
    </div>
  );
};

export default WhiteLabelSettings;
