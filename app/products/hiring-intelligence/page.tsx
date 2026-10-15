import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { DASHBOARD_URL } from "@/lib/config";

export const metadata = { title: "Hiring Intelligence — SoloBuildAI Products" };

export default function HiringIntelligencePage() {
  return (
    <PageLayout>
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-600 mb-5 block">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
              Available Now
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight tracking-tight mb-5">
              Hiring Intelligence
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              The complete AI hiring platform — voice screening, campaign management, candidate
              analytics, interview scheduling, and recruiter workflows in one system.
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Open Platform
              </a>
              <Link href="/solutions/hiring" className="px-6 py-3 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
                Learn about the solution
              </Link>
              <Link href="/demo" className="px-6 py-3 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors">
                Request a demo
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "AI Voice Screening",
                "Outbound Campaigns",
                "Candidate Analytics",
                "Interview Scheduling",
                "Recruiter Dashboard",
                "Human Handoff",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                  <span className="text-sm font-medium text-slate-700">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
