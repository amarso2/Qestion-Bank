import React from 'react';

type Stat = {
  label: string;
  value: string;
};

type Testimonial = {
  id: string;
  name: string;
  exam: string;
  quote: string;
  avatar: string;
};

type Feature = {
  text: string;
};

const stats: Stat[] = [
  { label: 'Questions in Bank', value: '2.4M+' },
  { label: 'Active Aspirants', value: '8.6L+' },
  { label: 'Mock Tests Daily', value: '1.2L+' },
  { label: 'Top Selections', value: '24,000+' },
];

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Priya Sharma',
    exam: 'SSC CGL 2025 — AIR 47',
    quote: "ExamForge's mock tests were identical to the actual paper. Practiced 200+ tests here.",
    avatar: 'PS',
  },
  {
    id: 'testimonial-2',
    name: 'Arjun Mehta',
    exam: 'IBPS PO 2025 — Selected',
    quote: 'The analytics showed my weak topics in Quant. Cleared in first attempt.',
    avatar: 'AM',
  },
];

const features: Feature[] = [
  { text: 'Chapter-wise & full-length mock tests' },
  { text: 'AI-powered performance analytics' },
  { text: 'Compete on live leaderboards' },
  { text: 'Detailed solutions for every question' },
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[520px] xl:w-[580px] flex-col gradient-primary p-10 xl:p-14 relative overflow-hidden flex-shrink-0">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 flex items-center gap-3 mb-12">
        <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">E</span>
        </div>
        <div>
          <p className="text-white font-bold text-xl leading-none">ExamPeakAI</p>
          <p className="text-blue-200 text-xs mt-0.5">Practice smarter. Rank higher.</p>
        </div>
      </div>

      <div className="relative z-10 mb-10">
        <h1 className="text-white font-extrabold text-3xl xl:text-4xl leading-tight mb-4">
          India&apos;s Most Trusted<br />Exam Preparation<br />Platform
        </h1>
        <p className="text-blue-100 text-base leading-relaxed">
          Join 8.6 lakh aspirants who cleared SSC, UPSC, Banking, and Railways exams with ExamForge&apos;s adaptive mock tests and real-time analytics.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white/10 rounded-xl p-4">
            <p className="text-white font-bold text-2xl font-tabular">{stat.value}</p>
            <p className="text-blue-200 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 space-y-3 mb-10">
        {features.map((feature) => (
          <div key={feature.text} className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center">
              <span className="block w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <p className="text-blue-100 text-sm">{feature.text}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 space-y-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white font-semibold">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-blue-200 text-xs">{testimonial.exam}</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">{testimonial.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}