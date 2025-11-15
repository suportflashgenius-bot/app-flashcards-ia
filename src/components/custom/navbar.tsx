'use client';

import { Brain, Trophy, Flame, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Flash Genius
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Aprenda com IA
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-4 mr-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                  7 dias
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/30">
                <Trophy className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  2840 pts
                </span>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Novo Card</span>
              <span className="sm:hidden">Novo</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
