import React from 'react';
import AccuracyTrendChart from './AccuracyTrendChart';
import SubjectPerformanceChart from './SubjectPerformanceChart';

export default function DashboardChartsRow() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-5 gap-5">
      <div className="xl:col-span-3">
        <AccuracyTrendChart />
      </div>
      <div className="xl:col-span-2">
        <SubjectPerformanceChart />
      </div>
    </div>
  );
}