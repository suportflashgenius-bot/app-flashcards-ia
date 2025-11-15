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
import { Input } from '@/components/ui/input';
import { Users, Trophy, Search, TrendingUp, Medal, Crown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  level: number;
  rank: number;
  streak: number;
}

const mockLeaderboard: LeaderboardUser[] = [
  { id: '1', name: 'Ana Silva', points: 5420, level: 8, rank: 1, streak: 15 },
  { id: '2', name: 'Carlos Santos', points: 4890, level: 7, rank: 2, streak: 12 },
  { id: '3', name: 'Maria Oliveira', points: 4320, level: 7, rank: 3, streak: 10 },
  { id: '4', name: 'João Costa', points: 3850, level: 6, rank: 4, streak: 8 },
  { id: '5', name: 'Você', points: 2840, level: 5, rank: 5, streak: 7 },
  { id: '6', name: 'Pedro Lima', points: 2650, level: 5, rank: 6, streak: 6 },
  { id: '7', name: 'Lucia Ferreira', points: 2340, level: 4, rank: 7, streak: 5 },
  { id: '8', name: 'Rafael Souza', points: 2120, level: 4, rank: 8, streak: 4 },
];

export default function LeaderboardDialog() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeaderboard = mockLeaderboard.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-orange-600" />;
      default:
        return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-purple-400 to-pink-500';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trophy className="h-4 w-4 mr-2" />
          Ranking
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Trophy className="h-6 w-6 text-purple-500" />
            Ranking Global
          </DialogTitle>
          <DialogDescription>
            Veja como você se compara com outros usuários do Flash Genius
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-y-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar usuário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {/* 2nd Place */}
            <div className="flex flex-col items-center pt-8">
              <div className="relative">
                <Avatar className="h-16 w-16 border-4 border-gray-300">
                  <AvatarFallback className="bg-gradient-to-br from-gray-300 to-gray-500 text-white font-bold">
                    {mockLeaderboard[1].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full p-1">
                  <Medal className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="font-semibold text-sm mt-2 text-center">{mockLeaderboard[1].name}</p>
              <Badge variant="secondary" className="mt-1">
                {mockLeaderboard[1].points} pts
              </Badge>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-yellow-400">
                  <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-bold text-xl">
                    {mockLeaderboard[0].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-3 -right-2 bg-yellow-500 rounded-full p-1.5">
                  <Crown className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="font-bold text-base mt-2 text-center">{mockLeaderboard[0].name}</p>
              <Badge className="mt-1 bg-gradient-to-r from-yellow-400 to-yellow-600">
                {mockLeaderboard[0].points} pts
              </Badge>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-8">
              <div className="relative">
                <Avatar className="h-16 w-16 border-4 border-orange-400">
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold">
                    {mockLeaderboard[2].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-orange-500 rounded-full p-1">
                  <Medal className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="font-semibold text-sm mt-2 text-center">{mockLeaderboard[2].name}</p>
              <Badge variant="secondary" className="mt-1">
                {mockLeaderboard[2].points} pts
              </Badge>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="space-y-2">
            {filteredLeaderboard.map((user) => (
              <Card
                key={user.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  user.name === 'Você'
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-300 dark:border-purple-700'
                    : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Avatar */}
                    <Avatar className={`h-12 w-12 border-2 ${user.rank <= 3 ? `border-${getRankColor(user.rank)}` : 'border-gray-300'}`}>
                      <AvatarFallback className={`bg-gradient-to-br ${getRankColor(user.rank)} text-white font-bold`}>
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-base">
                        {user.name}
                        {user.name === 'Você' && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Você
                          </Badge>
                        )}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Nível {user.level}
                        </span>
                        <span className="flex items-center gap-1">
                          🔥 {user.streak} dias
                        </span>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-purple-600 dark:text-purple-400">
                        {user.points.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">pontos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
