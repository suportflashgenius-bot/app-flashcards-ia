'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  gradient?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  gradient = 'from-purple-500 to-pink-500',
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
