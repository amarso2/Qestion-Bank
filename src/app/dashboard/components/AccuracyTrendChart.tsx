'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const AccuracyTrendChartClient = dynamic(
  () => import('./AccuracyTrendChartClient'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-lg h-[240px] w-full" /> }
);

export default function AccuracyTrendChart() {
  return <AccuracyTrendChartClient />;
}