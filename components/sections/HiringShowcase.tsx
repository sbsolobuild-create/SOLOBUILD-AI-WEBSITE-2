"use client";

// Section 05 — AI for Hiring homepage callout
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DASHBOARD_URL } from "@/lib/config";

export default function HiringShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((el, i) => {
      const isScale = el.dataset.reveal === "scale";
      el.style.opacity = "0";
      el.style.transform = isScale ? "scale(0.97) translateY(10px)" : "translateY(20px)";
      el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`;
    });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        items.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
        obs.unobserve(section);
      }
    }, { threshold: 0.08 });
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: "#0f1b30" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div data-reveal>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(59,126,255,0.3)" }}>
              <span className="w-2 h-2 rounded-full pulse-dot flex-shrink-0" style={{ backgroundColor: "#3b7eff" }} />
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#60a5fa" }}>Available Now</span>
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase block mb-3" style={{ color: "#4e607a" }}>
              AI for Hiring
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-5" style={{ color: "#f0f4ff" }}>
              From job description<br /> to qualified candidate.
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "#94a3c4" }}>
              SoloBuildAI&apos;s hiring solution brings candidate discovery, outreach,
              voice screening, qualification and recruiter workflows into one connected system.
            </p>

            <div className="space-y-3 mb-10">
              {[
                "Screen candidates automatically via AI voice calls",
                "Engage candidate pools with outbound calling campaigns",
                "Qualify and rank candidates based on role criteria",
                "Schedule interviews without manual coordination",
                "Give recruiters full context — call summaries, scores, insights",
              ].map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(59,126,255,0.12)", border: "1px solid rgba(59,126,255,0.25)" }}>
                    <svg className="w-3 h-3" style={{ color: "#3b7eff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "#94a3c4" }}>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/solutions/hiring" className="btn-glow px-6 py-3 text-white text-sm font-medium rounded-xl transition-colors shadow-sm" style={{ backgroundColor: "#2563eb" }}>
                Explore AI for Hiring
              </Link>
              <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-sm font-medium rounded-xl transition-colors" style={{ color: "#94a3c4", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                Open Hiring Platform
              </a>
            </div>
          </div>

          {/* Right — dashboard screenshot
              PLACEHOLDER: Replace /images/hiring-dashboard-1.png with actual screenshot.
              Aspect ratio 16:10. Layout will not need to change. */}
          <div data-reveal="scale">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 pulse-dot" />
                  <span className="text-[11px] font-medium text-slate-300 uppercase tracking-widest">
                    Recruitment Operations
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">AI Active</span>
              </div>
              <Image
                src="/images/hiring-dashboard-1.png"
                alt="SoloBuildAI Hiring Platform — Recruitment Operations dashboard"
                width={1400}
                height={875}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
