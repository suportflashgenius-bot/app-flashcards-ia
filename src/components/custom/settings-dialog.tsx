'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Settings as SettingsIcon, Clock, Zap, Moon, Sun } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [cardsPerSession, setCardsPerSession] = useState([20]);
  const [reminderTime, setReminderTime] = useState('09:00');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-purple-500" />
            Configurações
          </DialogTitle>
          <DialogDescription>
            Personalize sua experiência no Flash Genius
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="study">
              <Clock className="h-4 w-4 mr-2" />
              Estudo
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Zap className="h-4 w-4 mr-2" />
              Aparência
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-base">
                      Notificações Push
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receba lembretes e atualizações
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-reminder" className="text-base">
                      Lembrete Diário
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receba um lembrete para estudar todos os dias
                    </p>
                  </div>
                  <Switch
                    id="daily-reminder"
                    checked={dailyReminder}
                    onCheckedChange={setDailyReminder}
                    disabled={!notifications}
                  />
                </div>

                {dailyReminder && notifications && (
                  <div className="space-y-2 pl-4 border-l-2 border-purple-200">
                    <Label htmlFor="reminder-time" className="text-sm">
                      Horário do Lembrete
                    </Label>
                    <Select value={reminderTime} onValueChange={setReminderTime}>
                      <SelectTrigger id="reminder-time">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="07:00">07:00</SelectItem>
                        <SelectItem value="08:00">08:00</SelectItem>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                        <SelectItem value="19:00">19:00</SelectItem>
                        <SelectItem value="20:00">20:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="achievement-alerts" className="text-base">
                      Alertas de Conquistas
                    </Label>
                    <p className="text-sm text-gray-500">
                      Seja notificado quando desbloquear conquistas
                    </p>
                  </div>
                  <Switch id="achievement-alerts" defaultChecked disabled={!notifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="streak-reminder" className="text-base">
                      Lembrete de Sequência
                    </Label>
                    <p className="text-sm text-gray-500">
                      Aviso quando sua sequência estiver em risco
                    </p>
                  </div>
                  <Switch id="streak-reminder" defaultChecked disabled={!notifications} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Tab */}
          <TabsContent value="study" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cards-per-session" className="text-base">
                        Cards por Sessão
                      </Label>
                      <Badge variant="secondary">{cardsPerSession[0]} cards</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Defina quantos cards você quer estudar por sessão
                    </p>
                    <Slider
                      id="cards-per-session"
                      min={5}
                      max={50}
                      step={5}
                      value={cardsPerSession}
                      onValueChange={setCardsPerSession}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>5</span>
                      <span>50</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-algorithm" className="text-base">
                    Algoritmo de Revisão
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Escolha como os cards serão agendados para revisão
                  </p>
                  <Select defaultValue="spaced">
                    <SelectTrigger id="review-algorithm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spaced">Repetição Espaçada (Recomendado)</SelectItem>
                      <SelectItem value="random">Aleatório</SelectItem>
                      <SelectItem value="sequential">Sequencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-flip" className="text-base">
                      Virar Card Automaticamente
                    </Label>
                    <p className="text-sm text-gray-500">
                      Vire o card após 5 segundos automaticamente
                    </p>
                  </div>
                  <Switch id="auto-flip" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-effects" className="text-base">
                      Efeitos Sonoros
                    </Label>
                    <p className="text-sm text-gray-500">
                      Sons ao acertar ou errar respostas
                    </p>
                  </div>
                  <Switch
                    id="sound-effects"
                    checked={soundEffects}
                    onCheckedChange={setSoundEffects}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-base flex items-center gap-2">
                      {darkMode ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                      Modo Escuro
                    </Label>
                    <p className="text-sm text-gray-500">
                      Ative o tema escuro para estudar à noite
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme-color" className="text-base">
                    Cor do Tema
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Personalize a cor principal do aplicativo
                  </p>
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { name: 'Roxo', color: 'bg-purple-500' },
                      { name: 'Rosa', color: 'bg-pink-500' },
                      { name: 'Azul', color: 'bg-blue-500' },
                      { name: 'Verde', color: 'bg-green-500' },
                      { name: 'Laranja', color: 'bg-orange-500' },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className={`${theme.color} h-12 rounded-lg hover:scale-110 transition-transform border-2 border-transparent hover:border-gray-300`}
                        title={theme.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-size" className="text-base">
                    Tamanho da Fonte
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="font-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequeno</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations" className="text-base">
                      Animações
                    </Label>
                    <p className="text-sm text-gray-500">
                      Ative animações e transições suaves
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              // Aqui você salvaria as configurações
            }}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
