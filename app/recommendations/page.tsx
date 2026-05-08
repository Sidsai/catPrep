'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Recommendation {
  id: number;
  category: string;
  recommendation_type: string;
  description: string;
  priority: number;
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/recommendations');
        if (response.ok) {
          const data = await response.json();
          setRecommendations(data.recommendations || []);
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'destructive';
    if (priority >= 5) return 'default';
    return 'secondary';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority >= 8) return 'High';
    if (priority >= 5) return 'Medium';
    return 'Low';
  };

  return (
    <main className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Personalized Recommendations</h1>
        <p className="text-muted-foreground mt-2">AI-powered study suggestions based on your performance</p>
      </div>

      {loading ? (
        <div>Loading recommendations...</div>
      ) : recommendations.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No recommendations yet. Take more tests to get personalized suggestions.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{rec.category}</CardTitle>
                    <CardDescription className="mt-1">{rec.recommendation_type}</CardDescription>
                  </div>
                  <Badge variant={getPriorityColor(rec.priority)}>
                    {getPriorityLabel(rec.priority)} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{rec.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
