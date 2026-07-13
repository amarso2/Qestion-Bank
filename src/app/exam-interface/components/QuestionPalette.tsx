'use client';

import React, { useEffect } from 'react';
import type { Question, QuestionState, QuestionStatus } from './ExamInterfaceContainer';

interface QuestionPaletteProps {
  questions: Question[];
  questionStates: Record<string, QuestionState>;
  currentIndex: number;
  activeSection: string;
  onNavigate: (index: number) => void;
  stats: {
    answered: number;
    notAnswered: number;
    marked: number;
    answeredMarked: number;
    notVisited: number;
  };
}

const statusClasses: Record<QuestionStatus, string> = {
  'not-visited': 'exam-palette-not-visited',
  'not-answered': 'exam-palette-not-answered',
  'answered': 'exam-palette-answered',
  'marked': 'exam-palette-marked',
  'answered-marked': 'exam-palette-answered-marked',
};

const statusLabels: Record<QuestionStatus, string> = {
  'not-visited': 'Not Visited',
  'not-answered': 'Not Answered',
  'answered': 'Answered',
  'marked': 'Marked for Review',
  'answered-marked': 'Answered + Marked',
};

const legendItems: { status: QuestionStatus; label: string }[] = [
  { status: 'answered', label: 'Answered' },
  { status: 'not-answered', label: 'Not Answered' },
  { status: 'not-visited', label: 'Not Visited' },
  { status: 'marked', label: 'Marked' },
  { status: 'answered-marked', label: 'Ans + Marked' },
];

const sections = ['Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness'];

export default function QuestionPalette({
  questions,
  questionStates,
  currentIndex,
  activeSection,
  onNavigate,
  stats,
}: QuestionPaletteProps) {
  const [expandedSection, setExpandedSection] = React.useState<string>(activeSection);

  React.useEffect(() => {
    setExpandedSection(activeSection);
  }, [activeSection]);

  const getSectionQuestions = (section: string) =>
    questions.filter((q) => q.section === section);

  const getSectionStats = (section: string) => {
    const sqs = getSectionQuestions(section);
    const answered = sqs.filter((q) => {
      const s = questionStates[q.id].status;
      return s === 'answered' || s === 'answered-marked';
    }).length;
    return { total: sqs.length, answered };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex-shrink-0">
        <h3 className="text-sm font-bold text-foreground mb-3">Question Palette</h3>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Answered', value: stats.answered + stats.answeredMarked, color: 'text-success', bg: 'bg-success/10' },
            { label: 'Not Answered', value: stats.notAnswered, color: 'text-danger', bg: 'bg-danger/10' },
            { label: 'Marked', value: stats.marked + stats.answeredMarked, color: 'text-warning', bg: 'bg-warning/10' },
            { label: 'Not Visited', value: stats.notVisited, color: 'text-muted-foreground', bg: 'bg-muted' },
          ].map((item) => (
            <div key={`palette-stat-${item.label}`} className={`${item.bg} rounded-lg px-3 py-2 text-center`}>
              <p className={`text-lg font-bold font-tabular ${item.color}`}>{item.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="space-y-1.5">
          {legendItems.map((item) => (
            <div key={`legend-${item.status}`} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${statusClasses[item.status]}`}>
                1
              </div>
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section-wise palette */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {sections.map((section) => {
          const sectionQs = getSectionQuestions(section);
          const sStats = getSectionStats(section);
          const isExpanded = expandedSection === section;

          return (
            <div key={`palette-section-${section}`} className="border-b border-border">
              <button
                onClick={() => setExpandedSection(isExpanded ? '' : section)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">{section}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {sStats.answered}/{sStats.total} answered
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-1.5">
                    <div
                      className="bg-success rounded-full h-1.5 transition-all duration-300"
                      style={{ width: `${(sStats.answered / sStats.total) * 100}%` }}
                    />
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 fade-in">
                  <div className="grid grid-cols-5 gap-1.5">
                    {sectionQs.map((q) => {
                      const state = questionStates[q.id];
                      const isCurrentQ = questions.indexOf(q) === currentIndex;
                      return (
                        <button
                          key={`palette-q-${q.id}`}
                          onClick={() => onNavigate(questions.indexOf(q))}
                          title={`Q${q.number}: ${statusLabels[state.status]}`}
                          aria-label={`Go to question ${q.number}`}
                          className={`w-full aspect-square rounded-lg text-[11px] font-bold transition-all duration-150 hover:scale-105 active:scale-95 ${statusClasses[state.status]} ${
                            isCurrentQ
                              ? 'ring-2 ring-offset-1 ring-primary scale-110 shadow-md z-10 relative'
                              : ''
                          }`}
                        >
                          {q.number}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User info */}
      <div className="flex-shrink-0 border-t border-border px-4 py-3 bg-card">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            RA
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">Rohit Anand</p>
            <p className="text-[10px] text-muted-foreground">SSC CGL Aspirant</p>
          </div>
        </div>
      </div>
    </div>
  );
}