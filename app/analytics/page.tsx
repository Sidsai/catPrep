'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CategoryPerformance {
  category: string;
  correctPercentage: number;
  totalQuestions: number;
}

interface AnalyticsData {
  categoryPerformance: CategoryPerformance[];
  accuracyTrend: Array<{ date: string; accuracy: number }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    categoryPerformance: [],
    accuracyTrend: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics/performance');
        if (response.ok) {
          const result = await response.json();
          setData(result.analytics || data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <main className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground mt-2">Detailed analysis of your test performance</p>
      </div>

      {loading ? (
        <div>Loading analytics...</div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Category-wise Performance</CardTitle>
              <CardDescription>Your accuracy in each test category</CardDescription>
            </CardHeader>
            <CardContent>
              {data.categoryPerformance.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.categoryPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="correctPercentage" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground">No category data available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accuracy Trend</CardTitle>
              <CardDescription>Your accuracy improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              {data.accuracyTrend.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.accuracyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground">No trend data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
