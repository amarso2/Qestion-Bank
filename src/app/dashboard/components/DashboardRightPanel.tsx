'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Zap,
  ChevronRight,
  AlertCircle,
  BookMarked,
  Trophy,
  ArrowUpRight,
  Bell,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';

// Backend integration point: GET /api/exams/recommended?userId=&category=SSC
const recommendedExams = [
  { id: 'rec-001', name: 'SSC CGL Full Mock #39', subject: 'Mixed', questions: 100, duration: 60, difficulty: 'Hard', enrolled: 18240, freeAttempts: 2 },
  { id: 'rec-002', name: 'Quant Booster — Algebra', subject: 'Quant', questions: 30, duration: 25, difficulty: 'Medium', enrolled: 9870, freeAttempts: 5 },
  { id: 'rec-003', name: 'Reasoning Speed Drill #12', subject: 'Reasoning', questions: 25, duration: 15, difficulty: 'Easy', enrolled: 14200, freeAttempts: 3 },
  { id: 'rec-004', name: 'GK Current Affairs July 2026', subject: 'GK/GS', questions: 50, duration: 20, difficulty: 'Medium', enrolled: 22100, freeAttempts: 1 },
];

const weakTopics = [
  { id: 'weak-001', topic: 'Number System', subject: 'Quant', accuracy: 48, questions: 84 },
  { id: 'weak-002', topic: 'General Knowledge', subject: 'GK/GS', accuracy: 52, questions: 120 },
  { id: 'weak-003', topic: 'Reading Comprehension', subject: 'English', accuracy: 55, questions: 96 },
  { id: 'weak-004', topic: 'Coding-Decoding', subject: 'Reasoning', accuracy: 58, questions: 72 },
];

const leaderboard = [
  { id: 'lb-001', rank: 1, name: 'Ananya Krishnan', score: 189.4, badge: 'SSC' },
  { id: 'lb-002', rank: 2, name: 'Dev Patel', score: 186.2, badge: 'SSC' },
  { id: 'lb-003', rank: 3, name: 'Sneha Iyer', score: 183.8, badge: 'SSC' },
  { id: 'lb-004', rank: 3241, name: 'Rohit Anand', score: 142.0, badge: 'You', isMe: true },
];

function LiveExamCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 34, s: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-4 text-white mb-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-blue-100 uppercase tracking-wide">Live Exam Starting In</span>
      </div>
      <p className="font-bold text-sm mb-2 text-white">SSC CGL Tier-I Live Mock #40</p>
      <div className="flex items-center gap-2 mb-3">
        {[
          { val: pad(timeLeft.h), label: 'Hours' },
          { val: pad(timeLeft.m), label: 'Mins' },
          { val: pad(timeLeft.s), label: 'Secs' },
        ].map((t, i) => (
          <React.Fragment key={`timer-${t.label}`}>
            {i > 0 && <span className="text-blue-300 font-bold text-xl">:</span>}
            <div className="bg-white/20 rounded-lg px-3 py-2 text-center min-w-[48px]">
              <p className="text-xl font-bold font-tabular leading-none">{t.val}</p>
              <p className="text-[9px] text-blue-200 mt-0.5 uppercase">{t.label}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Link href="/exam-interface">
        <button className="w-full bg-white text-primary text-xs font-bold py-2 rounded-lg hover:bg-blue-50 transition-colors active:scale-95 duration-150">
          Register Now — Free
        </button>
      </Link>
    </div>
  );
}

export default function DashboardRightPanel() {
  const [activeSection, setActiveSection] = useState<'recommended' | 'weak' | 'leaderboard'>('recommended');

  const notifications = [
    { id: 'note-1', title: 'Mock review ready', message: 'Your latest SSC mock is now available.', time: '5m ago' },
    { id: 'note-2', title: 'Deadline approaching', message: 'Daily revision plan due at 9pm.', time: '45m ago' },
    { id: 'note-3', title: 'New challenge', message: 'Try the reasoning speed drill now.', time: '2h ago' },
  ];

  return (
    <div className="space-y-5">
      <LiveExamCountdown />

      <div className="card-elevated bg-white dark:bg-slate-900 border border-border dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-600">Notifications</p>
            <p className="mt-2 text-sm font-semibold text-foreground dark:text-slate-100">Latest alerts</p>
          </div>
          <Bell size={18} className="text-muted-foreground" />
        </div>
        <div className="mt-4 space-y-3">
          {notifications.map((note) => (
            <div key={note.id} className="rounded-3xl bg-muted dark:bg-slate-800 border border-border dark:border-slate-700 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground dark:text-slate-100">{note.title}</p>
                <span className="text-[11px] text-muted-foreground dark:text-slate-400">{note.time}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground dark:text-slate-400">{note.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex bg-muted rounded-xl p-0.5">
        {(['recommended', 'weak', 'leaderboard'] as const).map((tab) => (
          <button
            key={`tab-${tab}`}
            onClick={() => setActiveSection(tab)}
            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg transition-all ${
              activeSection === tab ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'
            }`}
          >
            {tab === 'recommended' ? 'For You' : tab === 'weak' ? 'Weak Areas' : 'Ranks'}
          </button>
        ))}
      </div>

      {/* Recommended exams */}
      {activeSection === 'recommended' && (
        <div className="space-y-2.5 fade-in">
          {recommendedExams.map((exam) => (
            <div
              key={exam.id}
              className="card-elevated card-hover p-3.5 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-foreground leading-snug flex-1">{exam.name}</p>
                <Badge variant={exam.difficulty === 'Hard' ? 'danger' : exam.difficulty === 'Medium' ? 'warning' : 'success'}>
                  {exam.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><BookMarked size={11} />{exam.questions} Qs</span>
                <span className="flex items-center gap-1"><Clock size={11} />{exam.duration} min</span>
                <span>{exam.enrolled.toLocaleString('en-IN')} enrolled</span>
              </div>
              <Link href="/exam-interface">
                <button className="w-full btn-primary py-2 text-xs">
                  <Zap size={12} />
                  Start Exam
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Weak topics */}
      {activeSection === 'weak' && (
        <div className="space-y-2.5 fade-in">
          <div className="flex items-start gap-2 bg-danger/5 border border-danger/20 rounded-xl p-3">
            <AlertCircle size={14} className="text-danger flex-shrink-0 mt-0.5" />
            <p className="text-xs text-danger leading-relaxed">
              These 4 topics are dragging your overall score. Focus on them to gain +8–12 marks.
            </p>
          </div>
          {weakTopics.map((topic) => (
            <div key={topic.id} className="card-elevated p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{topic.topic}</p>
                  <p className="text-[11px] text-muted-foreground">{topic.subject} · {topic.questions} questions attempted</p>
                </div>
                <span className="text-sm font-bold text-danger font-tabular">{topic.accuracy}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="rounded-full h-1.5 bg-danger transition-all duration-500"
                  style={{ width: `${topic.accuracy}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-muted-foreground">Target: 75%</span>
                <button className="text-[11px] text-primary font-semibold flex items-center gap-0.5 hover:underline">
                  Practice now <ArrowUpRight size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeSection === 'leaderboard' && (
        <div className="space-y-2 fade-in">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">SSC CGL — All India</p>
            <button className="text-xs text-primary font-semibold hover:underline flex items-center gap-0.5">
              Full board <ChevronRight size={11} />
            </button>
          </div>
          {leaderboard.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-colors ${
                entry.isMe
                  ? 'bg-primary/5 border-primary/30' :'bg-card border-border hover:bg-muted/50'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                entry.rank === 1 ? 'bg-amber-100 text-amber-600' :
                entry.rank === 2 ? 'bg-slate-100 text-slate-600' :
                entry.rank === 3 ? 'bg-orange-100 text-orange-600': 'bg-primary/10 text-primary'
              }`}>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${(entry.rank / 1000).toFixed(1)}k`}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${entry.isMe ? 'text-primary' : 'text-foreground'}`}>
                  {entry.name} {entry.isMe && <span className="text-[10px] font-bold bg-primary text-white rounded-full px-1.5 py-0.5 ml-1">You</span>}
                </p>
                <p className="text-[11px] text-muted-foreground">Avg: {entry.score}/200</p>
              </div>
              <Trophy size={14} className={entry.rank <= 3 ? 'text-amber-500' : 'text-muted-foreground/40'} />
            </div>
          ))}
          {/* Gap indicator */}
          <div className="text-center py-2">
            <p className="text-[11px] text-muted-foreground">· · · 3,237 ranks above you · · ·</p>
          </div>
        </div>
      )}
    </div>
  );
}