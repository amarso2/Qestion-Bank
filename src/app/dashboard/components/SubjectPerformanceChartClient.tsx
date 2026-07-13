'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BookOpen } from 'lucide-react';

// Backend integration point: GET /api/analytics/subject-performance?userId=
const subjectData = [
  { subject: 'Reasoning', accuracy: 78, color: '#2563EB' },
  { subject: 'Quant', accuracy: 61, color: '#DC2626' },
  { subject: 'English', accuracy: 69, color: '#D97706' },
  { subject: 'GK/GS', accuracy: 54, color: '#DC2626' },
  { subject: 'Computer', accuracy: 84, color: '#16A34A' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-xl shadow-modal px-3.5 py-2.5 text-sm">
        <p className="font-semibold text-foreground mb-1">{d.subject}</p>
        <p className="text-muted-foreground">
          Accuracy: <span className="font-bold text-foreground">{d.accuracy}%</span>
        </p>
        <p className={`text-xs mt-0.5 font-medium ${d.accuracy >= 75 ? 'text-success' : d.accuracy >= 65 ? 'text-warning' : 'text-danger'}`}>
          {d.accuracy >= 75 ? '✓ Strong' : d.accuracy >= 65 ? '⚠ Average' : '✗ Needs work'}
        </p>
      </div>
    );
  }
  return null;
};

export default function SubjectPerformanceChartClient() {
  return (
    <div className="card-elevated p-5 h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <BookOpen size={16} className="text-primary" />
            Subject Accuracy
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">This month · 5 subjects</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-[10px] text-muted-foreground">≥75% Strong</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-danger" />
            <span className="text-[10px] text-muted-foreground">&lt;65% Weak</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={subjectData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} />
          <XAxis
            dataKey="subject"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.5 }} />
          <Bar dataKey="accuracy" radius={[5, 5, 0, 0]}>
            {subjectData.map((entry, index) => (
              <Cell
                key={`cell-subject-${index + 1}`}
                fill={entry.accuracy >= 75 ? 'var(--success)' : entry.accuracy >= 65 ? 'var(--warning)' : 'var(--danger)'}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Subject list */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        {subjectData.map((s) => (
          <div key={`subj-row-${s.subject}`} className="flex items-center gap-2.5">
            <span className="text-xs text-muted-foreground w-20 flex-shrink-0">{s.subject}</span>
            <div className="flex-1 bg-muted rounded-full h-1.5">
              <div
                className="rounded-full h-1.5 transition-all duration-500"
                style={{
                  width: `${s.accuracy}%`,
                  backgroundColor: s.accuracy >= 75 ? 'var(--success)' : s.accuracy >= 65 ? 'var(--warning)' : 'var(--danger)',
                }}
              />
            </div>
            <span className={`text-xs font-bold w-10 text-right font-tabular ${
              s.accuracy >= 75 ? 'text-success' : s.accuracy >= 65 ? 'text-warning' : 'text-danger'
            }`}>
              {s.accuracy}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}