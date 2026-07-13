'use client';

import React, { useState } from 'react';
import { BookMarked, Minus, Plus } from 'lucide-react';
import type { Question, QuestionState } from './ExamInterfaceContainer';

interface QuestionPanelProps {
  question: Question;
  questionState: QuestionState;
  questionIndex: number;
  totalQuestions: number;
  onOptionSelect: (optionId: string) => void;
}

export default function QuestionPanel({
  question,
  questionState,
  questionIndex,
  totalQuestions,
  onOptionSelect,
}: QuestionPanelProps) {
  const [fontSize, setFontSize] = React.useState(15);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin p-5 xl:p-7">
      {/* Question meta */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {question.number}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="status-badge bg-primary/10 text-primary text-[11px]">
                {question.section}
              </span>
              <span className="status-badge bg-success/10 text-success text-[11px]">
                +{question.marks} marks
              </span>
              <span className="status-badge bg-danger/10 text-danger text-[11px]">
                -{question.negativeMarks} negative
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Question {questionIndex + 1} of {totalQuestions}
            </p>
          </div>
        </div>

        {/* Font size controls */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground mr-1">Text size</span>
          <button
            onClick={() => setFontSize((f) => Math.max(12, f - 1))}
            className="btn-ghost p-1.5"
            aria-label="Decrease font size"
          >
            <Minus size={13} />
          </button>
          <span className="text-xs font-mono text-muted-foreground w-6 text-center">{fontSize}</span>
          <button
            onClick={() => setFontSize((f) => Math.min(22, f + 1))}
            className="btn-ghost p-1.5"
            aria-label="Increase font size"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-1 mb-6">
        <div
          className="gradient-primary rounded-full h-1 transition-all duration-300"
          style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question text */}
      <div
        className="text-foreground leading-relaxed mb-8 font-medium"
        style={{ fontSize: `${fontSize}px` }}
      >
        <p className="whitespace-pre-line">{question.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 max-w-3xl">
        {question.options.map((option) => {
          const isSelected = questionState.selectedOption === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onOptionSelect(option.id)}
              className={`w-full flex items-start gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-150 group ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/50'
              }`}
            >
              {/* Option label */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                  isSelected
                    ? 'gradient-primary text-white' :'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                }`}
              >
                {option.label}
              </div>

              {/* Option text */}
              <span
                className={`flex-1 leading-relaxed pt-0.5 ${
                  isSelected ? 'text-primary font-semibold' : 'text-foreground'
                }`}
                style={{ fontSize: `${fontSize - 1}px` }}
              >
                {option.text}
              </span>

              {/* Selected indicator */}
              {isSelected && (
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
              {!isSelected && (
                <div className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0 mt-0.5 group-hover:border-primary/40 transition-colors" />
              )}
            </button>
          );
        })}
      </div>

      {/* Instructions note */}
      <div className="mt-8 flex items-start gap-2 bg-muted/60 rounded-xl p-3.5 max-w-3xl">
        <BookMarked size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Marking Scheme:</span> Each correct answer carries{' '}
          <span className="text-success font-semibold">+{question.marks} marks</span>. Each wrong answer
          deducts{' '}
          <span className="text-danger font-semibold">-{question.negativeMarks} marks</span>. Unattempted
          questions carry <span className="font-semibold">0 marks</span>.
        </p>
      </div>
    </div>
  );
}