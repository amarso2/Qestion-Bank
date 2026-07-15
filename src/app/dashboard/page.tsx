import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardTopBar from './components/DashboardTopBar';
import MetricsBentoGrid from './components/MetricsBentoGrid';
import DashboardChartsRow from './components/DashboardChartsRow';
import RecentAttemptsTable from './components/RecentAttemptsTable';
import DashboardRightPanel from './components/DashboardRightPanel';

const quickActions = [
  { label: 'Start practice', description: 'Launch a timed mock exam', style: 'bg-blue-600 text-white' },
  { label: 'Review weak topics', description: 'Focus on low accuracy areas', style: 'bg-slate-900 text-white' },
  { label: 'Revision plan', description: 'See your daily study agenda', style: 'bg-white text-slate-900 border border-border' },
  { label: 'Leaderboard', description: 'Compare with peers', style: 'bg-white text-slate-900 border border-border' },
];

const questionCategories = [
  { label: 'Quantitative Aptitude', progress: 78, subtext: '36 / 45 Topic Mastery' },
  { label: 'Reasoning Ability', progress: 64, subtext: '22 / 34 Topic Mastery' },
  { label: 'General Awareness', progress: 55, subtext: '18 / 33 Topic Mastery' },
  { label: 'English Language', progress: 71, subtext: '29 / 41 Topic Mastery' },
];

const notifications = [
  { title: 'AI review complete', detail: 'Your latest mixed mock is ready.', time: '10m ago' },
  { title: 'Live exam scheduled', detail: 'SSC CGL Tier-I Mock #40 starts in 2h.', time: '45m ago' },
  { title: 'Practice reminder', detail: 'Review reasoning drills today.', time: '2h ago' },
];

export default function DashboardPage() {
  return (
    <AppLayout activeRoute="/dashboard">
      <div className="flex flex-col xl:flex-row min-h-screen">
        {/* Main content */}
        <div className="flex-1 min-w-0 p-6 xl:p-8 2xl:p-10 space-y-6">
          <DashboardTopBar />

          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="card-elevated bg-white dark:bg-slate-900 border border-border dark:border-slate-700 p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Profile overview</p>
                  <h2 className="mt-3 text-2xl font-semibold text-foreground dark:text-slate-100">Amardip Kumar</h2>
                  <p className="mt-2 text-sm text-muted-foreground dark:text-slate-400 max-w-2xl">
                    Fast-track your SSC CGL preparation with smart mocks, adaptive review, and progress analytics.
                  </p>
                </div>
                <div className="inline-flex items-center gap-3 rounded-3xl border border-border dark:border-slate-700 bg-muted dark:bg-slate-800 p-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-sky-600 text-white text-lg font-bold">AK</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground dark:text-slate-100">SSC CGL Aspirant</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">47 days until Tier I</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: 'Progress', value: '76%', label: 'Current mastery' },
                  { title: 'Streak', value: '14 days', label: 'Continuous practice' },
                  { title: 'Accuracy', value: '72.4%', label: 'Monthly average' },
                  { title: 'Rank', value: '3,241', label: 'All-India' },
                ].map((metric) => (
                  <div key={metric.title} className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-4">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground dark:text-slate-400">{metric.title}</p>
                    <p className="mt-3 text-2xl font-semibold text-foreground dark:text-white">{metric.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground dark:text-slate-400">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="card-elevated bg-white dark:bg-slate-900 border border-border dark:border-slate-700 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Quick actions</p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground dark:text-slate-100">Tackle your next step</h3>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {quickActions.map((action) => (
                    <button
                      type="button"
                      key={action.label}
                      className={`rounded-3xl p-4 text-left text-sm font-semibold shadow-sm transition-all ${action.style} hover:shadow-card-hover`}
                    >
                      <span>{action.label}</span>
                      <p className="mt-2 text-xs font-normal text-slate-100/85">{action.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card-elevated bg-white dark:bg-slate-900 border border-border dark:border-slate-700 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Notifications</p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground dark:text-slate-100">Recent alerts</h3>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {notifications.map((note) => (
                    <div key={note.title} className="rounded-3xl border border-border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground dark:text-slate-100">{note.title}</p>
                          <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1">{note.detail}</p>
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground dark:text-slate-500">{note.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {questionCategories.map((category) => (
              <div key={category.label} className="card-elevated bg-white dark:bg-slate-900 border border-border dark:border-slate-700 p-5 shadow-sm">
                <p className="text-sm font-semibold text-foreground dark:text-slate-100">{category.label}</p>
                <p className="text-xs text-muted-foreground dark:text-slate-400 mt-2">{category.subtext}</p>
                <div className="mt-4 h-2.5 rounded-full bg-muted dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-500" style={{ width: `${category.progress}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground dark:text-slate-400">{category.progress}% mastery</p>
              </div>
            ))}
          </section>

          <MetricsBentoGrid />
          <DashboardChartsRow />
          <RecentAttemptsTable />
        </div>

        {/* Right panel */}
        <div className="xl:w-80 2xl:w-96 border-t border-border xl:border-t-0 xl:border-l bg-card/50 p-5 flex-shrink-0">
          <DashboardRightPanel />
        </div>
      </div>
    </AppLayout>
  );
}
