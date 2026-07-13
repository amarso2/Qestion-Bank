'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

// Backend integration point: GET /api/analytics/accuracy-trend?userId=&days=30
const accuracyData = [
  { date: '01 Jun', accuracy: 61, score: 122 },
  { date: '03 Jun', accuracy: 58, score: 116 },
  { date: '05 Jun', accuracy: 64, score: 128 },
  { date: '07 Jun', accuracy: 67, score: 134 },
  { date: '09 Jun', accuracy: 63, score: 126 },
  { date: '11 Jun', accuracy: 69, score: 138 },
  { date: '13 Jun', accuracy: 71, score: 142 },
  { date: '15 Jun', accuracy: 68, score: 136 },
  { date: '17 Jun', accuracy: 73, score: 146 },
  { date: '19 Jun', accuracy: 70, score: 140 },
  { date: '21 Jun', accuracy: 74, score: 148 },
  { date: '23 Jun', accuracy: 72, score: 144 },
  { date: '25 Jun', accuracy: 76, score: 152 },
  { date: '27 Jun', accuracy: 74, score: 148 },
  { date: '29 Jun', accuracy: 72, score: 144 },
  { date: '30 Jun', accuracy: 73, score: 146 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-modal px-4 py-3 text-sm">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-6">
            <span className="text-muted-foreground">Accuracy</span>
            <span className="font-bold text-primary">{payload[0]?.value}%</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-muted-foreground">Score</span>
            <span className="font-bold text-foreground">{payload[1]?.value}/200</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function AccuracyTrendChartClient() {
  const [metric, setMetric] = useState<'accuracy' | 'score'>('accuracy');

  return (
    <div className="card-elevated p-5 h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            Accuracy Trend
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 30 days · Updated just now</p>
        </div>
        <div className="flex items-center bg-muted rounded-lg p-0.5">
          <button
            onClick={() => setMetric('accuracy')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              metric === 'accuracy' ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'
            }`}
          >
            Accuracy %
          </button>
          <button
            onClick={() => setMetric('score')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              metric === 'score' ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'
            }`}
          >
            Score
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={accuracyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
            interval={3}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
            domain={metric === 'accuracy' ? [50, 90] : [100, 180]}
          />
          <Tooltip content={<CustomTooltip />} />
          {metric === 'accuracy' && (
            <ReferenceLine y={80} stroke="var(--warning)" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Target 80%', fontSize: 10, fill: 'var(--warning)', position: 'right' }} />
          )}
          <Area
            type="monotone"
            dataKey={metric}
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill={metric === 'accuracy' ? 'url(#accuracyGradient)' : 'url(#scoreGradient)'}
            dot={false}
            activeDot={{ r: 5, fill: 'var(--primary)', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground font-tabular">72.4%</p>
          <p className="text-[10px] text-muted-foreground">Current</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-success font-tabular">76.1%</p>
          <p className="text-[10px] text-muted-foreground">Best</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-muted-foreground font-tabular">62.3%</p>
          <p className="text-[10px] text-muted-foreground">30d Ago</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-primary font-tabular">+10.1%</p>
          <p className="text-[10px] text-muted-foreground">Improvement</p>
        </div>
      </div>
    </div>
  );
}