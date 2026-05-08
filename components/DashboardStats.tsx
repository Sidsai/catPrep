'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
  totalTests: number;
  averageScore: number;
  totalStudyHours: number;
  currentStreak: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalTests: 0,
    averageScore: 0,
    totalStudyHours: 0,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/analytics/performance');
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats || stats);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Tests Completed', value: stats.totalTests, unit: '' },
    { title: 'Average Score', value: stats.averageScore.toFixed(1), unit: '%' },
    { title: 'Study Hours', value: stats.totalStudyHours, unit: 'h' },
    { title: 'Current Streak', value: stats.currentStreak, unit: 'd' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '-' : card.value}
              {card.unit && <span className="text-sm">{card.unit}</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
