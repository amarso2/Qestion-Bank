'use client';

import React, { useState } from 'react';

import { ChevronUp, ChevronDown, ExternalLink, RotateCcw, Search, ChevronLeft, ChevronRight,  } from 'lucide-react';
import Badge from '@/components/ui/Badge';

// Backend integration point: GET /api/attempts?userId=&page=&limit=10&sortBy=&order=
const attemptsData = [
  { id: 'attempt-001', examName: 'SSC CGL Tier-I Full Mock #38', subject: 'Mixed', score: 142, maxScore: 200, accuracy: 71, timeTaken: '58m 12s', rank: 2847, totalCandidates: 24810, status: 'Completed', date: '30 Jun 2026', difficulty: 'Hard' },
  { id: 'attempt-002', examName: 'Quantitative Aptitude Chapter Test', subject: 'Quant', score: 36, maxScore: 50, accuracy: 62, timeTaken: '22m 44s', rank: 5124, totalCandidates: 18340, status: 'Completed', date: '29 Jun 2026', difficulty: 'Medium' },
  { id: 'attempt-003', examName: 'English Language & Comprehension', subject: 'English', score: 32, maxScore: 50, accuracy: 68, timeTaken: '18m 30s', rank: 3892, totalCandidates: 21100, status: 'Completed', date: '29 Jun 2026', difficulty: 'Medium' },
  { id: 'attempt-004', examName: 'General Awareness Mega Quiz', subject: 'GK/GS', score: 28, maxScore: 50, accuracy: 54, timeTaken: '14m 05s', rank: 9241, totalCandidates: 15600, status: 'Completed', date: '28 Jun 2026', difficulty: 'Easy' },
  { id: 'attempt-005', examName: 'SSC CGL Tier-I Full Mock #37', subject: 'Mixed', score: 138, maxScore: 200, accuracy: 69, timeTaken: '57m 48s', rank: 3104, totalCandidates: 23890, status: 'Completed', date: '27 Jun 2026', difficulty: 'Hard' },
  { id: 'attempt-006', examName: 'Reasoning Ability Speed Test', subject: 'Reasoning', score: 44, maxScore: 50, accuracy: 88, timeTaken: '12m 18s', rank: 412, totalCandidates: 19200, status: 'Completed', date: '26 Jun 2026', difficulty: 'Easy' },
  { id: 'attempt-007', examName: 'Computer Fundamentals Test', subject: 'Computer', score: 42, maxScore: 50, accuracy: 84, timeTaken: '16m 55s', rank: 680, totalCandidates: 12400, status: 'Completed', date: '25 Jun 2026', difficulty: 'Easy' },
  { id: 'attempt-008', examName: 'SSC CGL Tier-I Full Mock #36', subject: 'Mixed', score: 131, maxScore: 200, accuracy: 65, timeTaken: '59m 01s', rank: 4780, totalCandidates: 22100, status: 'Completed', date: '24 Jun 2026', difficulty: 'Hard' },
  { id: 'attempt-009', examName: 'GK Current Affairs June 2026', subject: 'GK/GS', score: 31, maxScore: 50, accuracy: 62, timeTaken: '11m 40s', rank: 7810, totalCandidates: 14200, status: 'Completed', date: '23 Jun 2026', difficulty: 'Medium' },
  { id: 'attempt-010', examName: 'SSC CGL Tier-I Full Mock #35', subject: 'Mixed', score: 128, maxScore: 200, accuracy: 64, timeTaken: '60m 00s', rank: 5320, totalCandidates: 21800, status: 'Timed Out', date: '22 Jun 2026', difficulty: 'Hard' },
];

type SortKey = 'date' | 'score' | 'accuracy' | 'rank';

const subjectColors: Record<string, string> = {
  Mixed: 'primary',
  Quant: 'warning',
  English: 'info',
  'GK/GS': 'neutral',
  Reasoning: 'success',
  Computer: 'primary',
};

const difficultyColors: Record<string, string> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

export default function RecentAttemptsTable() {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const perPage = 7;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filtered = attemptsData
    .filter((a) =>
      a.examName.toLowerCase().includes(search.toLowerCase()) &&
      (subjectFilter === 'All' || a.subject === subjectFilter)
    )
    .sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'score') return (a.score - b.score) * dir;
      if (sortKey === 'accuracy') return (a.accuracy - b.accuracy) * dir;
      if (sortKey === 'rank') return (a.rank - b.rank) * dir;
      return a.id > b.id ? -dir : dir;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp size={10} className={sortKey === col && sortDir === 'asc' ? 'text-primary' : 'text-muted-foreground/40'} />
      <ChevronDown size={10} className={sortKey === col && sortDir === 'desc' ? 'text-primary' : 'text-muted-foreground/40'} />
    </span>
  );

  const subjects = ['All', 'Mixed', 'Quant', 'English', 'GK/GS', 'Reasoning', 'Computer'];

  return (
    <div className="card-elevated">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-base font-semibold text-foreground">Recent Attempts</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} tests · Last 30 days</p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search exams..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="form-input pl-8 py-2 text-sm w-48"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {subjects.map((s) => (
              <button
                key={`filter-${s}`}
                onClick={() => { setSubjectFilter(s); setPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  subjectFilter === s
                    ? 'bg-primary text-white' :'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              {[
                { label: 'Exam Name', key: null, width: 'min-w-[220px]' },
                { label: 'Subject', key: null, width: 'w-24' },
                { label: 'Score', key: 'score' as SortKey, width: 'w-24' },
                { label: 'Accuracy', key: 'accuracy' as SortKey, width: 'w-24' },
                { label: 'Time Taken', key: null, width: 'w-24' },
                { label: 'Rank', key: 'rank' as SortKey, width: 'w-28' },
                { label: 'Difficulty', key: null, width: 'w-20' },
                { label: 'Status', key: null, width: 'w-24' },
                { label: '', key: null, width: 'w-16' },
              ].map((col, i) => (
                <th
                  key={`th-${i + 1}`}
                  className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide ${col.width} ${col.key ? 'cursor-pointer hover:text-foreground select-none' : ''}`}
                  onClick={() => col.key && handleSort(col.key)}
                >
                  {col.label}
                  {col.key && <SortIcon col={col.key} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Search size={32} className="text-muted-foreground/40" />
                    <p className="text-sm font-medium text-muted-foreground">No attempts found</p>
                    <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((attempt, idx) => (
                <tr
                  key={attempt.id}
                  className={`border-b border-border last:border-0 hover:bg-muted/50 transition-colors group ${
                    idx % 2 === 0 ? '' : 'bg-muted/20'
                  }`}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground text-sm leading-snug line-clamp-1">
                      {attempt.examName}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{attempt.date}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={subjectColors[attempt.subject] as any}>
                      {attempt.subject}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-foreground font-tabular">
                      {attempt.score}
                    </span>
                    <span className="text-muted-foreground text-xs">/{attempt.maxScore}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold font-tabular text-sm ${
                        attempt.accuracy >= 75 ? 'text-success' : attempt.accuracy >= 65 ? 'text-warning' : 'text-danger'
                      }`}>
                        {attempt.accuracy}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-tabular">
                    {attempt.timeTaken}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground font-tabular text-sm">
                      #{attempt.rank.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-muted-foreground block">
                      of {attempt.totalCandidates.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={difficultyColors[attempt.difficulty] as any}>
                      {attempt.difficulty}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={attempt.status === 'Completed' ? 'success' : 'warning'} dot>
                      {attempt.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="btn-ghost p-1.5"
                        title="View analysis"
                        aria-label="View attempt analysis"
                      >
                        <ExternalLink size={13} />
                      </button>
                      <button
                        className="btn-ghost p-1.5"
                        title="Reattempt exam"
                        aria-label="Reattempt this exam"
                      >
                        <RotateCcw size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} attempts
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="btn-ghost p-1.5 disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={`page-${i + 1}`}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                page === i + 1
                  ? 'bg-primary text-white' :'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="btn-ghost p-1.5 disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}