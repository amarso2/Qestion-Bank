import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardTopBar from './components/DashboardTopBar';
import MetricsBentoGrid from './components/MetricsBentoGrid';
import DashboardChartsRow from './components/DashboardChartsRow';
import RecentAttemptsTable from './components/RecentAttemptsTable';
import DashboardRightPanel from './components/DashboardRightPanel';

export default function DashboardPage() {
  return (
    <AppLayout activeRoute="/dashboard">
      <div className="flex flex-col xl:flex-row min-h-screen">
        {/* Main content */}
        <div className="flex-1 min-w-0 p-6 xl:p-8 2xl:p-10 space-y-6">
          <DashboardTopBar />
          <MetricsBentoGrid />
          <DashboardChartsRow />
          <RecentAttemptsTable />
        </div>

        {/* Right panel */}
        <div className="xl:w-80 2xl:w-96 border-l border-border bg-card/50 p-5 flex-shrink-0">
          <DashboardRightPanel />
        </div>
      </div>
    </AppLayout>
  );
}