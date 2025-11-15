// Flash Genius - Sample Data

import { Flashcard, UserStats, Achievement } from './types';

export const sampleFlashcards: Flashcard[] = [
  {
    id: '1',
    front: 'O que é Repetição Espaçada?',
    back: 'É uma técnica de aprendizado que envolve revisar informações em intervalos crescentes de tempo para melhorar a retenção na memória de longo prazo.',
    category: 'Técnicas de Estudo',
    difficulty: 'medium',
    nextReview: new Date(Date.now() + 86400000),
    reviewCount: 5,
    correctCount: 4,
  },
  {
    id: '2',
    front: 'Qual a capital da França?',
    back: 'Paris',
    category: 'Geografia',
    difficulty: 'easy',
    nextReview: new Date(Date.now() + 172800000),
    reviewCount: 3,
    correctCount: 3,
  },
  {
    id: '3',
    front: 'O que é Recuperação Ativa?',
    back: 'É o processo de tentar lembrar informações sem olhar as respostas, fortalecendo as conexões neurais e melhorando a memória.',
    category: 'Técnicas de Estudo',
    difficulty: 'medium',
    nextReview: new Date(),
    reviewCount: 2,
    correctCount: 1,
  },
  {
    id: '4',
    front: 'Quem escreveu "Dom Casmurro"?',
    back: 'Machado de Assis',
    category: 'Literatura',
    difficulty: 'easy',
    nextReview: new Date(),
    reviewCount: 4,
    correctCount: 4,
  },
  {
    id: '5',
    front: 'O que é fotossíntese?',
    back: 'Processo pelo qual plantas convertem luz solar, água e CO2 em glicose e oxigênio.',
    category: 'Biologia',
    difficulty: 'medium',
    nextReview: new Date(Date.now() + 259200000),
    reviewCount: 6,
    correctCount: 5,
  },
];

export const achievements: Achievement[] = [
  {
    id: 'first-card',
    title: 'Primeiro Passo',
    description: 'Criou seu primeiro flashcard',
    icon: '🎯',
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
  },
  {
    id: 'streak-7',
    title: 'Semana Dedicada',
    description: 'Manteve 7 dias de sequência',
    icon: '🔥',
    unlocked: true,
    unlockedAt: new Date('2024-01-20'),
  },
  {
    id: 'master-100',
    title: 'Mestre do Conhecimento',
    description: 'Revisou 100 flashcards',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'perfect-week',
    title: 'Semana Perfeita',
    description: 'Acertou todos os cards por 7 dias',
    icon: '⭐',
    unlocked: false,
  },
];

export const userStats: UserStats = {
  totalCards: 24,
  cardsReviewed: 156,
  streak: 7,
  points: 2840,
  level: 5,
  achievements: achievements,
};
