// Flash Genius - Types

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: Date;
  reviewCount: number;
  correctCount: number;
  lastReviewed?: Date;
}

export interface UserStats {
  totalCards: number;
  cardsReviewed: number;
  streak: number;
  points: number;
  level: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface StudySession {
  id: string;
  date: Date;
  cardsStudied: number;
  correctAnswers: number;
  pointsEarned: number;
}
