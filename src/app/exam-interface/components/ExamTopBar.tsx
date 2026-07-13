'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ChevronRight, PanelRight, AlertTriangle } from 'lucide-react';

interface ExamTopBarProps {
  sections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  timeRemaining: number;
  onSubmitClick: () => void;
  isPaletteOpen: boolean;
  onTogglePalette: () => void;
}

function formatTime(seconds: number): { h: string; m: string; s: string } {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return { h: pad(h), m: pad(m), s: pad(s) };
}

export default function ExamTopBar({
  sections,
  activeSection,
  onSectionChange,
  timeRemaining,
  onSubmitClick,
  isPaletteOpen,
  onTogglePalette,
}: ExamTopBarProps) {
  const time = formatTime(timeRemaining);
  const isUrgent = timeRemaining <= 300; // last 5 minutes
  const isWarning = timeRemaining <= 600; // last 10 minutes

  return (
    <header className="bg-card border-b border-border flex-shrink-0 z-10">
      {/* Top row */}
      <div className="flex items-center justify-between px-4 xl:px-6 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-sm font-semibold hidden sm:block">ExamPeakAI</span>
          </Link>
          <ChevronRight size={14} className="text-muted-foreground hidden sm:block" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-foreground leading-none">SSC CGL Tier-I Full Mock #39</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">100 Questions · 200 Marks · 60 Minutes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-tabular transition-all ${
              isUrgent
                ? 'bg-danger/10 border-danger/30 text-danger animate-pulse'
                : isWarning
                ? 'bg-warning/10 border-warning/30 text-warning' :'bg-muted border-border text-foreground'
            }`}
          >
            {isUrgent ? (
              <AlertTriangle size={15} className="text-danger" />
            ) : (
              <Clock size={15} className={isWarning ? 'text-warning' : 'text-muted-foreground'} />
            )}
            <span className="text-base font-bold">
              {time.h !== '00' && <>{time.h}:</>}{time.m}:{time.s}
            </span>
          </div>

          {/* Palette toggle */}
          <button
            onClick={onTogglePalette}
            className={`btn-ghost p-2.5 ${isPaletteOpen ? 'text-primary bg-primary/10' : ''}`}
            title={isPaletteOpen ? 'Hide question palette' : 'Show question palette'}
            aria-label="Toggle question palette"
          >
            <PanelRight size={18} />
          </button>

          {/* Submit */}
          <button
            onClick={onSubmitClick}
            className="btn-primary py-2 px-5 text-sm"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex items-center gap-0 px-4 xl:px-6 overflow-x-auto scrollbar-thin">
        {sections.map((section) => (
          <button
            key={`section-tab-${section}`}
            onClick={() => onSectionChange(section)}
            className={`relative px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 border-b-2 ${
              activeSection === section
                ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
            }`}
          >
            {section}
          </button>
        ))}
      </div>
    </header>
  );
}