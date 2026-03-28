import { Topbar } from '@/components/topbar';
import { TabNav } from '@/components/tab-nav';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <main className="dashboard-main">
        <TabNav />
        {children}
      </main>
    </>
  );
}
