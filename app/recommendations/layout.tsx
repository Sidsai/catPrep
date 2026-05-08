import { Sidebar } from '@/components/Sidebar';

export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-slate-50">
        {children}
      </div>
    </div>
  );
}
