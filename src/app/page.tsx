'use client';

import { useState } from 'react';
import Navbar from '@/components/custom/navbar';
import Flashcard from '@/components/custom/flashcard';
import StatsCard from '@/components/custom/stats-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Target,
  Flame,
  Trophy,
  TrendingUp,
  Sparkles,
  Award,
  Calendar,
  Brain,
} from 'lucide-react';
import { sampleFlashcards, userStats } from '@/lib/flashcard-data';

export default function Home() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studiedToday, setStudiedToday] = useState(12);

  const currentCard = sampleFlashcards[currentCardIndex];
  const cardsToReview = sampleFlashcards.filter(
    (card) => card.nextReview <= new Date()
  ).length;

  const handleCorrect = () => {
    setStudiedToday((prev) => prev + 1);
    if (currentCardIndex < sampleFlashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handleIncorrect = () => {
    if (currentCardIndex < sampleFlashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const levelProgress = ((userStats.points % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-pink-950/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Nível {userStats.level} • {userStats.points} pontos
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Você tem <span className="font-bold text-purple-600 dark:text-purple-400">{cardsToReview} cards</span> prontos para revisar hoje
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Sequência"
            value={`${userStats.streak} dias`}
            icon={Flame}
            description="Continue assim!"
            gradient="from-orange-400 to-red-500"
          />
          <StatsCard
            title="Total de Cards"
            value={userStats.totalCards}
            icon={BookOpen}
            description="Criados"
            gradient="from-blue-400 to-cyan-500"
          />
          <StatsCard
            title="Estudados Hoje"
            value={studiedToday}
            icon={Target}
            description="Meta: 20 cards"
            gradient="from-green-400 to-emerald-500"
          />
          <StatsCard
            title="Pontos"
            value={userStats.points}
            icon={Trophy}
            description={`Nível ${userStats.level}`}
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        {/* Level Progress */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Progresso do Nível {userStats.level}
              </CardTitle>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {userStats.points % 1000}/1000 XP
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={levelProgress} className="h-3" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Faltam {1000 - (userStats.points % 1000)} pontos para o próximo nível
            </p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="study" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="study">
              <Brain className="h-4 w-4 mr-2" />
              Estudar
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="h-4 w-4 mr-2" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="stats">
              <Calendar className="h-4 w-4 mr-2" />
              Estatísticas
            </TabsTrigger>
          </TabsList>

          {/* Study Tab */}
          <TabsContent value="study" className="space-y-6">
            <div className="text-center mb-4">
              <Badge variant="outline" className="text-sm">
                Card {currentCardIndex + 1} de {sampleFlashcards.length}
              </Badge>
            </div>
            <Flashcard
              card={currentCard}
              onCorrect={handleCorrect}
              onIncorrect={handleIncorrect}
            />
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userStats.achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800'
                      : 'opacity-60 grayscale'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {achievement.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                            Desbloqueado em{' '}
                            {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          Desbloqueado
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    Resumo Geral
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total de Cards</span>
                    <span className="font-bold text-xl">{userStats.totalCards}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Cards Revisados</span>
                    <span className="font-bold text-xl">{userStats.cardsReviewed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Taxa de Acerto</span>
                    <span className="font-bold text-xl text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Tempo Total</span>
                    <span className="font-bold text-xl">24h 30min</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Hoje</p>
                      <p className="text-xs text-gray-500">{studiedToday} cards estudados</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">+120 pts</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Ontem</p>
                      <p className="text-xs text-gray-500">18 cards estudados</p>
                    </div>
                    <span className="text-sm font-bold text-blue-600">+180 pts</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">2 dias atrás</p>
                      <p className="text-xs text-gray-500">22 cards estudados</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600">+220 pts</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Pronto para criar seus próprios flashcards?
            </h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Use nossa IA para gerar flashcards personalizados baseados no que você está estudando
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Gerar com IA
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
