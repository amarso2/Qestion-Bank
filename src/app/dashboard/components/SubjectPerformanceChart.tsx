'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SubjectPerformanceChartClient = dynamic(
  () => import('./SubjectPerformanceChartClient'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-lg h-[240px] w-full" /> }
);

export default function SubjectPerformanceChart() {
  return <SubjectPerformanceChartClient />;
}