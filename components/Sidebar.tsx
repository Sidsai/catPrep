'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Practice Tests', href: '/practice-tests' },
  { name: 'Analytics', href: '/analytics' },
  { name: 'Recommendations', href: '/recommendations' },
  { name: 'Study Plans', href: '/study-plans' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="flex flex-col w-64 bg-slate-900 text-white h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">CAT Prep</h1>
        <p className="text-sm text-slate-400 mt-1">Tracker</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full text-left text-slate-300 hover:text-white hover:bg-slate-800"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
