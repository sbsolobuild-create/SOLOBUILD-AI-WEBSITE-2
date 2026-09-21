import Link from "next/link";
import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import concreteBuildingImage from "@/app/file_00000000f12481fba98e0793f2268462.png";
import AgentRailSection from "@/components/sections/AgentRailSection";
import AIAssistantShowcase from "@/components/sections/AIAssistantShowcase";

const STEPS = [
  { num: "01", title: "Describe", desc: "Tell us the role and who you want to reach." },
  { num: "02", title: "Deploy", desc: "Use a ready screening agent or customise it." },
  { num: "03", title: "Operate", desc: "Let agents call, assess, and rank candidates." },
  { num: "04", title: "Grow", desc: "Review summaries, shortlist, and hire." },
];

export default function HomePage() {
  return (
    <PageLayout framed>

      {/* HERO */}
      <section className="rounded-2xl border border-white/12 overflow-hidden bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] lg:min-h-[620px]">
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
            <ScrollReveal variant="reveal">
              <div className="max-w-[540px]">
                <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-slate-500 mb-8">
                  AI Agents for real work
                </p>

                <h1 className="mb-7">
                  <span className="block text-[56px] sm:text-[68px] lg:text-[80px] leading-[0.92] font-semibold tracking-[-0.04em] text-white">
                    Ideas
                  </span>
                  <span className="block text-[56px] sm:text-[68px] lg:text-[80px] leading-[0.92] font-semibold tracking-[-0.04em]">
                    <span className="text-white">to </span>
                    <span className="text-[#0066FF]">Impact.</span>
                  </span>
                </h1>

                <p className="text-[15px] leading-[1.7] text-slate-400 mb-9 max-w-[460px]">
                  Build, deploy and scale AI agents, workflows and tools to turn your ideas into real outcomes — without the usual complexity.
                </p>

                <div className="flex flex-wrap gap-3 mb-9">
                  <Link
                    href="/demo"
                    className="px-6 py-3 text-[13px] font-semibold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-xl transition-colors inline-flex items-center gap-2"
                  >
                    Get Started
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/demo"
                    className="px-6 py-3 text-[13px] font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 rounded-xl transition-all inline-flex items-center gap-2.5"
                  >
                    <span className="w-[18px] h-[18px] rounded-full border border-white/70 flex items-center justify-center">
                      <svg className="w-2 h-2 ml-px" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    Watch Demo
                  </Link>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-slate-500 font-mono">
                  <span>// No coding required</span>
                  <span>// Ready-to-use agents</span>
                  <span>// Built for real hiring</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative min-h-[420px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-white/12">
            <Image
              src="/images/hero-woman.png"
              alt="Operator working with SoloBuildAI agents"
              fill
              priority
              className="object-cover object-[center_20%] grayscale"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />

            <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-between pointer-events-none">
              <div className="flex items-start justify-between gap-6">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/80 leading-[1.7]">
                  Same<br />people.<br />Bigger<br />outcomes.
                </p>
                <p className="text-right text-[11px] font-medium tracking-[0.2em] uppercase text-white/80 leading-[1.7]">
                  Built for<br />doers.
                </p>
              </div>

              <div className="self-end max-w-[230px] bg-black/75 backdrop-blur-md border border-white/12 rounded-xl p-4 pointer-events-auto">
                <div className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                  <p className="text-[12px] font-medium text-white leading-snug">
                    AI agents that work for you.<br />
                    <span className="text-slate-400 font-normal">Not the other way around.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIAssistantShowcase />

      {/* INTEGRATIONS */}
      <section className="mt-3 rounded-2xl border border-white/12 bg-black px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/35 mb-4">
                Integrations
              </p>
              <h2 className="text-[30px] sm:text-[38px] font-semibold leading-[1.06] tracking-[-0.03em] text-white max-w-[480px]">
                Works with the tools your<br className="hidden sm:block" />
                business already uses.
              </h2>
            </div>
            <p className="text-[13px] text-slate-400 leading-relaxed max-w-[280px] lg:text-right">
              SoloBuildAI connects AI agents to your existing software so business processes move from conversation to action.
            </p>
          </div>

          {/* Logo grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { name: "Salesforce",
                mark: <>
                  <path d="M8.5 5a3 3 0 015 .6 2.7 2.7 0 013.4 3 2.8 2.8 0 01-3 5H4a2.7 2.7 0 01-2.2-4.3A2.8 2.8 0 015 5.2 3 3 0 018.5 5z" fill="#00A1E0"/>
                  <text x="10" y="14" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="white" fontFamily="sans-serif">SF</text>
                </> },
              { name: "HubSpot",
                mark: <>
                  <circle cx="7"    cy="10" r="2.2" fill="#FF7A59"/>
                  <circle cx="13.5" cy="6"  r="1.8" fill="#FF7A59"/>
                  <circle cx="13.5" cy="14" r="1.8" fill="#FF7A59"/>
                  <line x1="9.2" y1="10" x2="11.7" y2="7.5"  stroke="#FF7A59" strokeWidth="1.3" strokeLinecap="round"/>
                  <line x1="9.2" y1="10" x2="11.7" y2="12.5" stroke="#FF7A59" strokeWidth="1.3" strokeLinecap="round"/>
                </> },
              { name: "Slack",
                mark: <>
                  <path d="M7 3.5a1.5 1.5 0 100 3h1V3.5A1.5 1.5 0 007 3.5z"         fill="#E01E5A"/>
                  <path d="M7 8.5H3.5a1.5 1.5 0 100 3H7v-3z"                         fill="#E01E5A"/>
                  <path d="M16.5 10A1.5 1.5 0 1013 10v1.5h1.5a1.5 1.5 0 001.5-1.5z" fill="#ECB22E"/>
                  <path d="M11.5 10V3.5a1.5 1.5 0 10-3 0V10h3z"                      fill="#ECB22E"/>
                  <path d="M13 16.5a1.5 1.5 0 100-3h-1.5v1.5a1.5 1.5 0 001.5 1.5z"  fill="#2EB67D"/>
                  <path d="M13 11.5h3.5a1.5 1.5 0 100-3H13v3z"                       fill="#2EB67D"/>
                  <path d="M3.5 13a1.5 1.5 0 103 0v-1.5H5A1.5 1.5 0 003.5 13z"      fill="#36C5F0"/>
                  <path d="M8.5 13v3.5a1.5 1.5 0 103 0V13h-3z"                       fill="#36C5F0"/>
                </> },
              { name: "Microsoft 365",
                mark: <>
                  <path fill="#F25022" d="M1 1h8.5v8.5H1z"/>
                  <path fill="#7FBA00" d="M10.5 1H19v8.5h-8.5z"/>
                  <path fill="#00A4EF" d="M1 10.5h8.5V19H1z"/>
                  <path fill="#FFB900" d="M10.5 10.5H19V19h-8.5z"/>
                </> },
              { name: "Google Workspace",
                mark: <>
                  <path d="M17 10a7 7 0 00-.1-1H10v2h4a3.5 3.5 0 01-1.5 2.3v1.9h2.4A7 7 0 0017 10z" fill="#4285F4"/>
                  <path d="M10 17a6.9 6.9 0 004.9-1.8L12.5 13.3A4.3 4.3 0 0110 14c-2.1 0-3.8-1.4-4.4-3.4H3v2A7 7 0 0010 17z" fill="#34A853"/>
                  <path d="M5.6 10.6A4.4 4.4 0 015.4 9v-.8a4.3 4.3 0 01.2-.8l-2.5-2A7 7 0 003 10a7 7 0 001.1 3.7l2.5-2z" fill="#FBBC05"/>
                  <path d="M10 5.5c1.2 0 2.3.4 3.1 1.2l2.3-2.3A7 7 0 0010 3a7 7 0 00-6.9 5.8l2.5 2c.6-1.9 2.3-3.3 4.4-3.3z" fill="#EA4335"/>
                </> },
              { name: "Workday",
                mark: <path d="M3 7h4l2.2 7L12 7l2.8 7L17 7h4" fill="none" stroke="#0875E1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/> },
              { name: "Greenhouse",
                mark: <path d="M10 3v14M6 6h8M6 10h8M6 14h8M6 6v8m8-8v8" fill="none" stroke="#24A47F" strokeWidth="1.5" strokeLinecap="round"/> },
              { name: "Zendesk",
                mark: <>
                  <rect width="20" height="20" rx="4" fill="#03363D"/>
                  <path d="M10 4c-2.2 0-4 1.6-4 3.6v.4h8V7.6C14 5.6 12.2 4 10 4z" fill="#BEFF00"/>
                  <path d="M6 9v2.4c0 2 1.8 3.6 4 3.6s4-1.6 4-3.6V9H6z" fill="white" opacity="0.9"/>
                </> },
              { name: "Jira",
                mark: <>
                  <defs><linearGradient id="ig-jira" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2684FF"/><stop offset="100%" stopColor="#0052CC"/></linearGradient></defs>
                  <path d="M10 2L2 10l3.5 3.5L10 9l4.5 4.5L18 10z" fill="url(#ig-jira)"/>
                  <path d="M10 9L6.5 12.5l3.5 3.5 4.5-4.5z" fill="#2684FF" opacity="0.7"/>
                </> },
              { name: "ServiceNow",
                mark: <>
                  <rect width="20" height="20" rx="4" fill="#62D84E"/>
                  <circle cx="10" cy="10" r="5.5" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="10" cy="10" r="2.5" stroke="white" strokeWidth="1.2" fill="none"/>
                </> },
            ].map(({ name, mark }) => (
              <div
                key={name}
                title={name}
                className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-5 hover:border-white/18 hover:bg-white/[0.055] transition-all duration-150"
              >
                <svg viewBox="0 0 20 20" className="h-7 w-7" aria-hidden="true">
                  {mark}
                </svg>
                <span className="text-[10px] font-medium text-white/45 text-center leading-snug">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Footer row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-white/8 pt-8">
            <p className="text-[12px] text-slate-500 text-center sm:text-left">
              These are catalogue integrations. Availability varies by solution and configuration.
            </p>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 rounded-xl transition-all flex-shrink-0"
            >
              View Solutions
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

    {/* TRUSTED BY */}
<section className="mt-3 rounded-2xl border border-white/12 bg-black px-6 py-8 sm:px-10 sm:py-9">
  <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
    Trusted by
  </p>

  <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-white/10">

    {/* Brand For You */}
    <div className="flex min-w-[180px] items-center justify-center px-8 py-3 sm:px-12">
      <Image
        src="/logos/brandforyou.svg"
        alt="Brand For You"
        width={150}
        height={50}
        className="h-10 w-auto max-w-[150px] object-contain"
      />
    </div>

    {/* Sapience */}
    <div className="flex min-w-[180px] items-center justify-center px-8 py-3 sm:px-12">
      <Image
        src="/logos/sapience.svg"
        alt="Sapience"
        width={150}
        height={50}
        className="h-10 w-auto max-w-[150px] object-contain"
      />
    </div>

    {/* roundz.ai */}
    <div className="flex min-w-[180px] items-center justify-center px-8 py-3 sm:px-12">
      <Image
        src="/logos/roundaisvg.svg"
        alt="roundz.ai"
        width={150}
        height={50}
        className="h-10 w-auto max-w-[150px] object-contain"
      />
    </div>

  </div>
</section>

      {/* PLATFORM CAPABILITIES */}
      <AgentRailSection />

      {/* HOW IT WORKS */}
      <section className="mt-3 grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-3">
        <div className="relative min-h-[420px] lg:min-h-[480px] rounded-2xl border border-white/12 overflow-hidden">
          <Image
            src={concreteBuildingImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/35" />
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 leading-[1.8]">
              Ideas<br />
              Agents<br />
              Execution<br />
              Real results
            </p>
            <p className="text-[15px] text-white/90">Built for a more capable you.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/12 bg-black p-6 sm:p-8 lg:p-10 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-slate-500 mb-4">
                How it works
              </p>
              <h2 className="text-[34px] sm:text-[42px] font-semibold leading-[1.08] tracking-[-0.03em]">
                <span className="text-white">A simpler path </span>
                <span className="text-[#0066FF]">forward.</span>
              </h2>
            </div>
            <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-slate-500 sm:text-right max-w-[180px] leading-relaxed">
              Focus on what matters. Let agents handle the rest.
            </p>
          </div>

          <div className="relative mt-auto">
            <div className="hidden sm:block absolute top-[18px] left-[7%] right-[7%] h-px bg-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-4">
              {STEPS.map((step, i) => (
                <ScrollReveal key={step.num} variant="reveal" delay={i * 50}>
                  <div>
                    <div className="text-[13px] font-semibold text-white mb-5 relative z-10">{step.num}</div>
                    <h3 className="text-[16px] font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-[12px] text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL + FACTS + CTA */}
      <section className="mt-3 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr_0.85fr] gap-3">
        <div className="rounded-2xl border border-white/12 bg-black overflow-hidden min-h-[240px]">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] h-full">
            <div className="p-7 sm:p-8 flex flex-col justify-between">
              <p className="text-[22px] sm:text-[26px] font-medium text-white leading-snug tracking-[-0.02em]">
                “We build AI that actually works in practice.”
              </p>
              <p className="mt-8 text-[13px] text-slate-500">SoloBuildAI</p>
            </div>
            <div className="relative min-h-[220px] sm:min-h-full border-t sm:border-t-0 sm:border-l border-white/12">
              <Image
                src="/images/editorial-man.png"
                alt="SoloBuildAI editorial portrait"
                fill
                className="object-cover object-center grayscale"
                sizes="(max-width: 640px) 100vw, 200px"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/12 bg-black px-6 py-7 sm:px-8 flex items-center">
          <div className="grid grid-cols-3 gap-4 w-full text-center">
            <div>
              <p className="text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">Voice</p>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">AI screening calls</p>
            </div>
            <div className="border-x border-white/10">
              <p className="text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">Live</p>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">Hiring intelligence</p>
            </div>
            <div>
              <p className="text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">Human</p>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">Handoff when it counts</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0066FF] p-7 sm:p-8 flex flex-col justify-between min-h-[240px]">
          <Link href="/demo" className="group">
            <h3 className="text-[34px] sm:text-[38px] font-semibold text-white leading-[0.95] tracking-[-0.03em] group-hover:opacity-90">
              Build<br />
              Deploy<br />
              Hire.
            </h3>
            <p className="text-[13px] text-white/85 mt-8">Your next hire is just one agent away.</p>
          </Link>
          <a
            href="https://main.d3ataamm8hxei7.amplifyapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 text-[13px] font-medium text-white/90 hover:text-white inline-flex items-center gap-2"
          >
            Open platform
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

    </PageLayout>
  );
}
