'use client';

import { ChevronLeft, ChevronRight, Bookmark, XCircle } from 'lucide-react';
import type { QuestionState } from './ExamInterfaceContainer';

interface ExamBottomBarProps {
  onPrev: () => void;
  onNext: () => void;
  onMarkForReview: () => void;
  onClearResponse: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentState: QuestionState;
}

export default function ExamBottomBar({
  onPrev,
  onNext,
  onMarkForReview,
  onClearResponse,
  onSubmit,
  isFirst,
  isLast,
  currentState,
}: ExamBottomBarProps) {
  const isMarked =
    currentState.status === 'marked' || currentState.status === 'answered-marked';
  const hasAnswer = currentState.selectedOption !== null;

  return (
    <div className="flex-shrink-0 border-t border-border bg-card px-5 xl:px-7 py-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkForReview}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-150 active:scale-95 ${
              isMarked
                ? 'border-warning/40 bg-warning/10 text-warning hover:bg-warning/20'
                : 'border-border text-muted-foreground hover:border-warning/40 hover:text-warning hover:bg-warning/5'
            }`}
          >
            <Bookmark size={15} />
            <span className="hidden sm:inline">
              {isMarked ? 'Unmark Review' : 'Mark for Review'}
            </span>
          </button>

          <button
            onClick={onClearResponse}
            disabled={!hasAnswer}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              hasAnswer
                ? 'border-border text-muted-foreground hover:border-danger/40 hover:text-danger hover:bg-danger/5'
                : 'border-border text-muted-foreground'
            }`}
          >
            <XCircle size={15} />
            <span className="hidden sm:inline">Clear Response</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="btn-secondary py-2.5 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {isLast ? (
            <button onClick={onSubmit} className="btn-primary py-2.5 px-6">
              Submit Exam
            </button>
          ) : (
            <button onClick={onNext} className="btn-primary py-2.5 px-5 flex items-center gap-2">
              <span>Save & Next</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}