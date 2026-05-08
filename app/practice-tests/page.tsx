'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface PracticeTest {
  id: number;
  title: string;
  description: string;
  total_questions: number;
  time_limit_minutes: number;
  difficulty_level: string;
}

export default function PracticeTestsPage() {
  const [tests, setTests] = useState<PracticeTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('/api/practice-tests');
        if (response.ok) {
          const data = await response.json();
          setTests(data.tests || []);
        }
      } catch (error) {
        console.error('Failed to fetch practice tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const filteredTests = tests.filter((test) =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const difficultyColors: Record<string, string> = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  const handleStartTest = async (testId: number) => {
    try {
      const response = await fetch('/api/test-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ practice_test_id: testId }),
      });
      if (response.ok) {
        window.location.href = `/practice-tests/${testId}/attempt`;
      }
    } catch (error) {
      console.error('Failed to start test:', error);
    }
  };

  return (
    <main className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Practice Tests</h1>
        <p className="text-muted-foreground mt-2">Take full-length CAT practice tests</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search tests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button>Create New Test</Button>
      </div>

      {loading ? (
        <div>Loading tests...</div>
      ) : filteredTests.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No practice tests available</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription className="mt-2">{test.description}</CardDescription>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      difficultyColors[test.difficulty_level] || 'bg-gray-100'
                    }`}
                  >
                    {test.difficulty_level}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Questions</p>
                    <p className="text-lg font-semibold">{test.total_questions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-lg font-semibold">{test.time_limit_minutes} min</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleStartTest(test.id)}
                >
                  Start Test
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
