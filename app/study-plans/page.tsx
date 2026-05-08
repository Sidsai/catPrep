'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StudyPlan {
  id: number;
  title: string;
  description: string;
  focus_areas: string;
  start_date: string;
  end_date: string;
  status: string;
}

export default function StudyPlansPage() {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/study-plans');
        if (response.ok) {
          const data = await response.json();
          setPlans(data.plans || []);
        }
      } catch (error) {
        console.error('Failed to fetch study plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'default';
    }
  };

  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    
    if (now <= start) return 0;
    if (now >= end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  };

  return (
    <main className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Plans</h1>
          <p className="text-muted-foreground mt-2">Create and track your personalized study schedules</p>
        </div>
        <Button>Create New Plan</Button>
      </div>

      {loading ? (
        <div>Loading study plans...</div>
      ) : plans.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No study plans yet. Create one to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {plans.map((plan) => {
            const progress = calculateProgress(plan.start_date, plan.end_date);
            return (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{plan.title}</CardTitle>
                      <CardDescription className="mt-1">{plan.description}</CardDescription>
                    </div>
                    <Badge variant={getStatusColor(plan.status)}>{plan.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Focus Areas</p>
                    <p className="text-sm text-muted-foreground">{plan.focus_areas}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start</p>
                      <p className="font-medium">{new Date(plan.start_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End</p>
                      <p className="font-medium">{new Date(plan.end_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
