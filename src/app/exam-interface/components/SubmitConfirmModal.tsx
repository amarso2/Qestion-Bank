'use client';

import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, BookMarked, Eye } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SubmitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  stats: {
    answered: number;
    notAnswered: number;
    marked: number;
    answeredMarked: number;
    notVisited: number;
  };
  totalQuestions: number;
  timeRemaining: number;
}

function formatTimeRemaining(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function SubmitConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  stats,
  totalQuestions,
  timeRemaining,
}: SubmitConfirmModalProps) {
  if (!isOpen) return null;

  const attempted = stats.answered + stats.answeredMarked;
  const unattempted = stats.notAnswered + stats.notVisited + stats.marked;
  const completionPct = Math.round((attempted / totalQuestions) * 100);

  const summaryItems = [
    {
      id: 'submit-answered',
      icon: CheckCircle2,
      label: 'Answered',
      value: stats.answered,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      id: 'submit-ans-marked',
      icon: BookMarked,
      label: 'Answered + Marked',
      value: stats.answeredMarked,
      color: 'text-violet-600',
      bg: 'bg-violet-100',
    },
    {
      id: 'submit-marked',
      icon: BookMarked,
      label: 'Marked for Review',
      value: stats.marked,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      id: 'submit-not-answered',
      icon: XCircle,
      label: 'Not Answered',
      value: stats.notAnswered,
      color: 'text-danger',
      bg: 'bg-danger/10',
    },
    {
      id: 'submit-not-visited',
      icon: Eye,
      label: 'Not Visited',
      value: stats.notVisited,
      color: 'text-muted-foreground',
      bg: 'bg-muted',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
    >
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-card rounded-2xl shadow-modal border border-border w-full max-w-md fade-in">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center border-b border-border">
          <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={28} className="text-warning" />
          </div>
          <h2 id="submit-modal-title" className="text-lg font-bold text-foreground">
            Submit Exam?
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            You have{' '}
            <span className={`font-bold ${timeRemaining <= 300 ? 'text-danger' : 'text-warning'}`}>
              {formatTimeRemaining(timeRemaining)}
            </span>{' '}
            remaining. This action cannot be undone.
          </p>
        </div>

        {/* Stats */}
        <div className="px-6 py-5">
          {/* Completion ring indicator */}
          <div className="flex items-center gap-4 mb-5 p-4 bg-muted/50 rounded-xl">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border)" strokeWidth="6" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke={completionPct >= 80 ? 'var(--success)' : completionPct >= 50 ? 'var(--warning)' : 'var(--danger)'}
                  strokeWidth="6"
                  strokeDasharray={`${(completionPct / 100) * 163.4} 163.4`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-foreground font-tabular">{completionPct}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                {attempted}/{totalQuestions} questions attempted
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {unattempted} question{unattempted !== 1 ? 's' : ''} will be left unanswered
              </p>
              {unattempted > 0 && (
                <p className="text-[11px] text-warning font-semibold mt-1">
                  ⚠ Unattempted questions carry 0 marks
                </p>
              )}
            </div>
          </div>

          {/* Status breakdown */}
          <div className="space-y-2">
            {summaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center`}>
                      <Icon size={14} className={item.color} />
                    </div>
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <span className={`text-sm font-bold font-tabular ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="btn-secondary flex-1 py-3"
          >
            Continue Exam
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger flex-1 py-3"
          >
            Submit Final
          </button>
        </div>
      </div>
    </div>
  );
}