'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, BookOpen, Sparkles } from 'lucide-react';

export default function AuthContainer() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_60%)] bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-2xl shadow-slate-900/10 backdrop-blur">
          <div className="grid gap-10 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                <Sparkles size={16} />
                Frontend preview only
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Explore the ExamPeakAI experience without any sign-in flow.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600">
                  This view is intentionally focused on the website&apos;s visual intent. Authentication, validation, and account creation have been removed so the product can be previewed as a polished frontend experience.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Open dashboard
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
                >
                  Back to home
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Preview highlights</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-sky-500/15 p-2 text-sky-300">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">Question bank experience</p>
                      <p className="text-sm text-slate-400">Clean navigation and curated exam prep sections.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-300">
                      <BarChart3 size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">Insights dashboard</p>
                      <p className="text-sm text-slate-400">Performance trends and mock-test readiness shown clearly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}