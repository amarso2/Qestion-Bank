'use client';

import React from 'react';
import {
  Flame,
  Target,
  ClipboardList,
  BarChart2,
  Trophy,
  AlertTriangle,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


// Bento grid plan: 6 cards → grid-cols-3 on lg, grid-cols-2 on md, grid-cols-1 on sm
// Row 1: Streak (hero, spans 1), Accuracy (spans 1), Attempts (spans 1)
// Row 2: Avg Score (spans 1), Rank (spans 1), Weak Topics alert (spans 1)

const metrics = [
  {
    id: 'metric-streak',
    label: 'Current Streak',
    value: '14',
    unit: 'days',
    change: '+3 from last week',
    trend: 'positive',
    icon: Flame,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    hero: true,
    description: 'Keep it going — best streak: 22 days',
  },
  {
    id: 'metric-accuracy',
    label: 'Overall Accuracy',
    value: '72.4',
    unit: '%',
    change: '+1.8% this month',
    trend: 'positive',
    icon: Target,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    hero: false,
    description: 'Target: 80% for SSC CGL',
  },
  {
    id: 'metric-attempts',
    label: 'Total Attempts',
    value: '148',
    unit: 'tests',
    change: '+12 this week',
    trend: 'positive',
    icon: ClipboardList,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    hero: false,
    description: 'Avg 4.9 tests/day this month',
  },
  {
    id: 'metric-avgscore',
    label: 'Avg. Score',
    value: '134.6',
    unit: '/200',
    change: '-2.1 vs last month',
    trend: 'negative',
    icon: BarChart2,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    hero: false,
    description: 'Dipped in Quant section',
  },
  {
    id: 'metric-rank',
    label: 'All-India Rank',
    value: '3,241',
    unit: '',
    change: '↑ 518 positions',
    trend: 'positive',
    icon: Trophy,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    hero: false,
    description: 'Top 12% of 27,400 aspirants',
  },
  {
    id: 'metric-weak',
    label: 'Weak Topics',
    value: '4',
    unit: 'subjects',
    change: 'Need attention now',
    trend: 'warning',
    icon: AlertTriangle,
    iconBg: 'bg-danger/10',
    iconColor: 'text-danger',
    hero: false,
    description: 'Reasoning, Quant, GK, English',
    alert: true,
  },
];

export default function MetricsBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
      {metrics?.map((metric) => {
        const Icon = metric?.icon;
        return (
          <div
            key={metric?.id}
            className={`card-elevated card-hover p-5 relative overflow-hidden ${
              metric?.alert
                ? 'border-danger/30 bg-danger/5'
                : metric?.hero
                ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50' :''
            }`}
          >
            {/* Decorative circle */}
            <div
              className={`absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 ${
                metric?.alert ? 'bg-danger' : metric?.hero ? 'bg-orange-400' : 'bg-primary'
              }`}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                    {metric?.label}
                  </p>
                </div>
                <div className={`w-9 h-9 rounded-xl ${metric?.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={metric?.iconColor} />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className={`font-bold font-tabular ${metric?.hero ? 'text-4xl text-orange-600' : 'text-3xl text-foreground'}`}>
                  {metric?.value}
                </span>
                {metric?.unit && (
                  <span className="text-sm text-muted-foreground font-medium">{metric?.unit}</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-2">
                <span
                  className={`text-xs font-semibold ${
                    metric?.trend === 'positive' ?'text-success'
                      : metric?.trend === 'negative' ?'text-danger' :'text-warning'
                  }`}
                >
                  {metric?.change}
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
                {metric?.description}
              </p>

              {/* Progress bar for accuracy */}
              {metric?.id === 'metric-accuracy' && (
                <div className="mt-3">
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="gradient-primary rounded-full h-1.5 transition-all duration-500"
                      style={{ width: '72.4%' }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0%</span>
                    <span className="text-primary font-medium">Target 80%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}