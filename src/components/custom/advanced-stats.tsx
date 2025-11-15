'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Target, Brain } from 'lucide-react';

const weeklyData = [
  { day: 'Seg', cards: 12, correct: 10, time: 25 },
  { day: 'Ter', cards: 18, correct: 15, time: 35 },
  { day: 'Qua', cards: 15, correct: 13, time: 30 },
  { day: 'Qui', cards: 22, correct: 19, time: 45 },
  { day: 'Sex', cards: 20, correct: 17, time: 40 },
  { day: 'Sáb', cards: 16, correct: 14, time: 32 },
  { day: 'Dom', cards: 12, correct: 11, time: 28 },
];

const categoryData = [
  { name: 'Técnicas de Estudo', value: 35, color: '#8b5cf6' },
  { name: 'Geografia', value: 20, color: '#ec4899' },
  { name: 'Literatura', value: 25, color: '#06b6d4' },
  { name: 'Biologia', value: 20, color: '#10b981' },
];

const performanceData = [
  { month: 'Jan', accuracy: 75, cards: 120 },
  { month: 'Fev', accuracy: 78, cards: 145 },
  { month: 'Mar', accuracy: 82, cards: 168 },
  { month: 'Abr', accuracy: 85, cards: 195 },
  { month: 'Mai', accuracy: 87, cards: 220 },
];

export default function AdvancedStats() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
        </TabsList>

        {/* Weekly Stats */}
        <TabsContent value="weekly" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cards Studied Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  Cards Estudados por Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="cards" fill="url(#colorCards)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorCards" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Time Spent Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Tempo de Estudo (minutos)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      dot={{ fill: '#06b6d4', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Accuracy Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Taxa de Acerto Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="cards" name="Total" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="correct" name="Corretos" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Stats */}
        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  Distribuição por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Detalhes por Categoria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.value} cards</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${category.value}%`,
                          backgroundColor: category.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Stats */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Evolução de Desempenho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="accuracy"
                    name="Taxa de Acerto (%)"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cards"
                    name="Total de Cards"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-3xl font-bold text-green-600">87%</p>
                  <p className="text-sm text-gray-600">Taxa de Acerto Média</p>
                  <p className="text-xs text-gray-500">↑ 12% vs. mês anterior</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-3xl font-bold text-blue-600">24h 30min</p>
                  <p className="text-sm text-gray-600">Tempo Total de Estudo</p>
                  <p className="text-xs text-gray-500">↑ 8% vs. mês anterior</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-3xl font-bold text-purple-600">156</p>
                  <p className="text-sm text-gray-600">Cards Revisados</p>
                  <p className="text-xs text-gray-500">↑ 23% vs. mês anterior</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
