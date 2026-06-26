import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TenantProvider } from '@/contexts/TenantContext';
import { CashierProvider } from '@/contexts/CashierContext';
import AppSidebar from '@/components/app/AppSidebar';
import AppHeader from '@/components/app/AppHeader';
import { cn } from '@/lib/utils';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <TenantProvider>
      <CashierProvider>
        <div className="min-h-screen bg-background">
          <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          <div
            className={cn(
              'transition-all duration-300',
              sidebarOpen ? 'md:ml-64' : 'md:ml-16'
            )}
          >
            <AppHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
            <main className="p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </CashierProvider>
    </TenantProvider>
  );
};

export default AppLayout;
