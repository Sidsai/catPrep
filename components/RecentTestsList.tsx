'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TestAttempt {
  id: number;
  practice_test_id: number;
  score: number;
  accuracy_percentage: number;
  completed_at: string;
}

export function RecentTestsList() {
  const [tests, setTests] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('/api/test-attempts?limit=5');
        if (response.ok) {
          const data = await response.json();
          setTests(data.attempts || []);
        }
      } catch (error) {
        console.error('Failed to fetch tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tests</CardTitle>
        <CardDescription>Your last 5 practice test attempts</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : tests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tests completed yet. Start by taking a practice test!</p>
        ) : (
          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Test #{test.practice_test_id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(test.completed_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{test.score}</p>
                  <p className="text-sm text-muted-foreground">{test.accuracy_percentage.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button className="w-full mt-4" variant="outline">View All Tests</Button>
      </CardContent>
    </Card>
  );
}
