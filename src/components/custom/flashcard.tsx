'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Check, X } from 'lucide-react';
import { Flashcard as FlashcardType } from '@/lib/types';

interface FlashcardProps {
  card: FlashcardType;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

export default function Flashcard({ card, onCorrect, onIncorrect }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card
        className="relative h-80 cursor-pointer transition-all duration-300 hover:shadow-2xl"
        onClick={handleFlip}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <Badge className={getDifficultyColor(card.difficulty)}>
              {card.difficulty === 'easy' && 'Fácil'}
              {card.difficulty === 'medium' && 'Médio'}
              {card.difficulty === 'hard' && 'Difícil'}
            </Badge>
            <Badge variant="outline">{card.category}</Badge>
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
              {card.front}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Clique para revelar a resposta
            </p>
          </div>

          <div className="absolute bottom-4 right-4">
            <RotateCcw className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <Badge className={getDifficultyColor(card.difficulty)}>
              {card.difficulty === 'easy' && 'Fácil'}
              {card.difficulty === 'medium' && 'Médio'}
              {card.difficulty === 'hard' && 'Difícil'}
            </Badge>
            <Badge variant="outline">{card.category}</Badge>
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
              {card.back}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Revisões: {card.reviewCount} | Acertos: {card.correctCount}
            </p>
          </div>

          <div className="absolute bottom-4 right-4">
            <RotateCcw className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      {isFlipped && (
        <div className="flex gap-4 mt-6 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 max-w-xs border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
            onClick={(e) => {
              e.stopPropagation();
              onIncorrect?.();
              setIsFlipped(false);
            }}
          >
            <X className="h-5 w-5 mr-2 text-red-500" />
            Errei
          </Button>
          <Button
            size="lg"
            className="flex-1 max-w-xs bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onCorrect?.();
              setIsFlipped(false);
            }}
          >
            <Check className="h-5 w-5 mr-2" />
            Acertei
          </Button>
        </div>
      )}
    </div>
  );
}
