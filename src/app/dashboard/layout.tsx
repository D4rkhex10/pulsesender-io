import { Topbar } from '@/components/topbar';
import { TabNav } from '@/components/tab-nav';

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
