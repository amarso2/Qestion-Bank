import React from 'react';
import { BookOpen, FileText, Clock3, ArrowRight } from 'lucide-react';

const postWiseTopics = [
  'SSC CGL General Awareness',
  'Banking Reasoning & Aptitude',
  'UPSC Prelims GS Paper',
  'Railways Mathematics',
  'English Grammar & Vocabulary',
];

const previousYearSets = [
  'SSC CGL 2024 Tier 1',
  'Bank PO 2023 Prelims',
  'UPSC Prelims 2022',
  'Railway NTPC 2021',
];

const mockTestSets = [
  'Full-Length Mock Test 1',
  'Full-Length Mock Test 2',
  'Sectional Mock Test - Reasoning',
  'Sectional Mock Test - Quant',
];

export default function QuestionBankContent() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-border bg-card/80 p-8 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Question Bank
              </p>
              <h1 className="mt-2 text-3xl font-bold text-foreground">
                Post Wise Questions
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Explore all post-wise questions, previous-year questions, and mock tests in one place.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-muted-foreground">
              <div className="font-semibold text-foreground">Available Now</div>
              <div>500+ questions • 120+ previous papers • 40 mock tests</div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <BookOpen size={22} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  All Post Wise Questions
                </h2>
                <p className="text-sm text-muted-foreground">
                  Browse topic-wise practice sets for every subject and exam.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {postWiseTopics.map((topic, index) => (
                <div
                  key={topic}
                  className="flex items-center justify-between rounded-2xl border border-border bg-background/60 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{topic}</p>
                    <p className="text-sm text-muted-foreground">
                      {index + 1}0+ practice questions available
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    Open
                    <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-600">
                  <FileText size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Previous Year Questions
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Practice real exam paper questions from earlier years.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {previousYearSets.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-background/60 px-4 py-3"
                  >
                    <p className="font-medium text-foreground">{item}</p>
                    <p className="text-sm text-muted-foreground">
                      Includes solved explanations and answer keys.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600">
                  <Clock3 size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Mock Tests
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Attempt full-length and sectional mock tests to improve speed and accuracy.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {mockTestSets.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-background/60 px-4 py-3"
                  >
                    <p className="font-medium text-foreground">{item}</p>
                    <p className="text-sm text-muted-foreground">
                      Timed test with instant performance summary.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
