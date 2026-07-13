'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
  Target,
  Clock,
  Users,
  Zap,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeRoute?: string;
}

const navGroups = [
  {
    label: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', badge: null },
      { icon: Target, label: 'Practice', href: '/practice', badge: null },
      { icon: FileText, label: 'Mock Tests', href: '/mock-tests', badge: '3' },
    ],
  },
  {
    label: 'Exams',
    items: [
      { icon: BookOpen, label: 'Post Wise', href: '/question-bank', badge: null },
      { icon: Clock, label: 'Live Exams', href: '/live-exams', badge: '2' },
      { icon: Zap, label: 'Quick Practice', href: '/quick-practice', badge: null },
    ],
  },
  {
    label: 'Insights',
    items: [
      { icon: BarChart3, label: 'My Analytics', href: '/analytics', badge: null },
      { icon: Trophy, label: 'Leaderboard', href: '/leaderboard', badge: null },
      { icon: Users, label: 'Study Groups', href: '/study-groups', badge: null },
    ],
  },
];

const bottomItems = [
  { icon: Bell, label: 'Notifications', href: '/notifications', badge: '5' },
  { icon: HelpCircle, label: 'Help & Support', href: '/help', badge: null },
  { icon: Settings, label: 'Settings', href: '/settings', badge: null },
];

export default function Sidebar({ collapsed, onToggle, activeRoute }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside
      className="relative flex flex-col bg-card border-r border-border sidebar-transition flex-shrink-0 h-screen z-20"
      style={{ width: collapsed ? '64px' : '240px' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-border min-h-[64px]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <AppLogo size={48} />
            <span className="font-bold text-base text-foreground tracking-tight">ExamPeakAI</span>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center w-full">
            <AppLogo size={48} />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="btn-ghost p-1.5 ml-auto"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Toggle button when collapsed */}
      {collapsed && (
        <button
          onClick={onToggle}
          className="absolute -right-3 top-16 z-30 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow"
          aria-label="Expand sidebar"
        >
          <ChevronRight size={12} className="text-muted-foreground" />
        </button>
      )}

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navGroups.map((group) => (
          <div key={`group-${group.label}`} className="mb-4">
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 py-1 mb-1">
                {group.label}
              </p>
            )}
            {collapsed && <div className="h-px bg-border mx-2 my-2" />}
            {group.items.map((item) => {
              const isActive = activeRoute === item.href;
              const Icon = item.icon;
              return (
                <div
                  key={`nav-${item.href}`}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={`nav-item mb-0.5 ${isActive ? 'nav-item-active' : ''} ${
                      collapsed ? 'justify-center px-2' : ''
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-primary' : ''} />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="status-badge bg-primary/10 text-primary text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                  {/* Collapsed tooltip */}
                  {collapsed && hoveredItem === item.href && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-foreground text-background text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-modal pointer-events-none">
                      {item.label}
                      {item.badge && (
                        <span className="ml-1.5 bg-primary text-white text-[10px] rounded-full px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom items */}
      <div className="border-t border-border px-2 py-3 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={`bottom-${item.href}`}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className={`nav-item ${collapsed ? 'justify-center px-2' : ''}`}
              >
                <div className="relative">
                  <Icon size={18} />
                  {item.badge && collapsed && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-danger rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="status-badge bg-danger/10 text-danger text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
              {collapsed && hoveredItem === item.href && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-foreground text-background text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-modal pointer-events-none">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-foreground" />
                </div>
              )}
            </div>
          );
        })}

        {/* User profile */}
        <div className={`flex items-center gap-2.5 mt-2 px-2 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            RA
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Amardip Kumar</p>
              <p className="text-[11px] text-muted-foreground truncate">SSC CGL Aspirant</p>
            </div>
          )}
          {!collapsed && (
            <button className="btn-ghost p-1" aria-label="Log out">
              <LogOut size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
