import React from 'react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Categories', href: '#categories' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const stats = [
  { value: '1.2M+', label: 'Questions answered' },
  { value: '98%', label: 'Average accuracy' },
  { value: '120+', label: 'Mock exams available' },
];

const categories = [
  { title: 'Campus Recruitment', description: 'Coding, aptitude, and verbal tests for top recruiters.' },
  { title: 'Government Exams', description: 'UPSC, SSC, and banking preparation with adaptive mocks.' },
  { title: 'Professional Certifications', description: 'IT, finance, and management certifications ready.' },
  { title: 'Academic Entrance', description: 'Engineering, medical, and business entrance practice.' },
];

const features = [
  { title: 'AI-powered insights', description: 'Get detailed feedback on your strengths, weaknesses, and exam readiness.', icon: '⚡' },
  { title: 'Live progress dashboards', description: 'Track accuracy, speed, and subject performance in real time.', icon: '📊' },
  { title: 'Smart revision planner', description: 'Review high-impact topics and keep your study flow efficient.', icon: '🧠' },
  { title: 'Multi-format practice', description: 'Solve MCQs, full tests, and interactive quizzes from one dashboard.', icon: '📝' },
];

const testimonials = [
  {
    quote: 'ExamPeakAI helped me stay on track with smarter mocks and instant feedback — I improved every week.',
    name: 'Priya Sharma',
    role: 'Civil Services Aspirant',
  },
  {
    quote: 'The category filters and analytics made exam prep feel structured and calming.',
    name: 'Rahul Das',
    role: 'Banking Exam Candidate',
  },
];

const faqs = [
  {
    question: 'Can I customize mock exam difficulty?',
    answer: 'Yes. ExamPeakAI adapts difficulty based on your performance and lets you select exam-style options.',
  },
  {
    question: 'Is the platform mobile friendly?',
    answer: 'Absolutely. The interface works seamlessly on mobile, tablet, and desktop with responsive exam layouts.',
  },
  {
    question: 'Do I need to sign up to get started?',
    answer: 'You can browse key features without logging in, but creating an account unlocks progress tracking and personalized recommendations.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/10">
              EP
            </div>
            <div>
              <p className="font-semibold text-slate-900">ExamPeakAI</p>
              <p className="text-sm text-slate-500">AI exam prep hub</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/sign-up-login-screen"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
            >
              Preview UI
            </a>
            <a
              href="/dashboard"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              Open dashboard
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-600 via-sky-500 to-white pb-20 pt-20">
          <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_65%)]" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm text-white shadow-lg shadow-sky-800/10 backdrop-blur">
                  <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                  New launch: adaptive exam tracks for every goal
                </div>
                <div className="space-y-6">
                  <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                    Master every exam with AI-powered practice and clear progress.
                  </h1>
                  <p className="max-w-xl text-base text-slate-100 sm:text-lg">
                    ExamPeakAI brings modern exam prep to life with smart mocks, instant analytics, and curated study paths for aspirants across campus recruitment, government exams, professional certifications, and entrance tests.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
                  >
                    Explore features
                  </a>
                  <a
                    href="#categories"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/20"
                  >
                    Browse categories
                  </a>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/90 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
                <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-blue-200/40 blur-3xl" />
                <div className="space-y-6">
                  <div className="rounded-3xl bg-slate-950/95 p-6 text-white shadow-card">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Next mock test</p>
                        <h2 className="mt-3 text-2xl font-semibold">AI Adaptive Full Test</h2>
                      </div>
                      <div className="rounded-2xl bg-sky-500/10 px-4 py-2 text-sm text-sky-100">Live</div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-900/90 p-4">
                        <p className="text-sm text-slate-400">Duration</p>
                        <p className="mt-2 text-xl font-semibold">90 mins</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/90 p-4">
                        <p className="text-sm text-slate-400">Topics</p>
                        <p className="mt-2 text-xl font-semibold">Quant, Verbal, Logic</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-900 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                      <p className="text-sm text-slate-500">Practice streak</p>
                      <p className="mt-4 text-3xl font-semibold">14 days</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-900 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                      <p className="text-sm text-slate-500">Top category</p>
                      <p className="mt-4 text-3xl font-semibold">Logical Ability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-card-hover">
                <p className="text-4xl font-semibold text-blue-600">{item.value}</p>
                <p className="mt-3 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="categories" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Exam categories</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Find the exam path that fits your ambition.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Choose from curated test sets designed for government exams, campus hiring, certifications, and academic entrance prep.</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((item) => (
                <div key={item.title} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 grid place-items-center text-lg">✓</div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  <div className="mt-6 text-sm font-medium text-blue-600 transition group-hover:text-blue-700">Explore <span aria-hidden="true">→</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Features</p>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Everything you need for consistent exam growth.</h2>
              <p className="max-w-xl text-base leading-7 text-slate-600">ExamPeakAI combines analytic clarity, timed practice, and adaptive review so you stay confident from first mock to final attempt.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Testimonials</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Trusted by aspirants who want steady progress.</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <p className="text-base leading-8 text-slate-700">“{item.quote}”</p>
                  <div className="mt-6">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Common questions, answered clearly.</h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card-hover">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                  {faq.question}
                  <span className="text-blue-600 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">ExamPeakAI</p>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Fast, intelligent exam preparation built for aspirants who want smarter practice and measurable progress.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <a href="#features" className="transition hover:text-blue-600">Features</a>
              <a href="#categories" className="transition hover:text-blue-600">Categories</a>
              <a href="#testimonials" className="transition hover:text-blue-600">Testimonials</a>
              <a href="#faq" className="transition hover:text-blue-600">FAQ</a>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-slate-400">© 2026 ExamPeakAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
