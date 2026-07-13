'use client';

import React, { useState } from 'react';
import { Search, Bell, Calendar, ChevronDown } from 'lucide-react';

const dateRanges = [
  { id: 'range-7d', label: 'Last 7 days' },
  { id: 'range-30d', label: 'Last 30 days' },
  { id: 'range-90d', label: 'Last 90 days' },
  { id: 'range-all', label: 'All time' },
];

export default function DashboardTopBar() {
  const [selectedRange, setSelectedRange] = useState('Last 30 days');
  const [showRangeDropdown, setShowRangeDropdown] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, Amardip! 👋</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          30 Jun 2026 · SSC CGL 2026 — 47 days to go
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search exams, topics..."
            className="form-input pl-9 pr-4 py-2 text-sm w-52 bg-card"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border font-mono">
            ⌘K
          </kbd>
        </div>

        {/* Date range */}
        <div className="relative">
          <button
            onClick={() => setShowRangeDropdown(!showRangeDropdown)}
            className="btn-secondary py-2 text-sm gap-2"
          >
            <Calendar size={14} />
            {selectedRange}
            <ChevronDown size={14} className={`transition-transform duration-200 ${showRangeDropdown ? 'rotate-180' : ''}`} />
          </button>
          {showRangeDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-modal z-20 w-44 py-1 fade-in">
              {dateRanges?.map((range) => (
                <button
                  key={range?.id}
                  onClick={() => {
                    setSelectedRange(range?.label);
                    setShowRangeDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selectedRange === range?.label
                      ? 'text-primary font-semibold bg-primary/5' :'text-foreground hover:bg-muted'
                  }`}
                >
                  {range?.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative btn-ghost p-2.5">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>
      </div>
    </div>
  );
}