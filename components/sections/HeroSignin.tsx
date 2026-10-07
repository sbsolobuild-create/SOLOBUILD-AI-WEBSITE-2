"use client";

import Link from "next/link";
import SigninFlow from "@/app/signin/SigninFlow";

export default function HeroSignin() {
  return (
    <section className="rounded-2xl border border-white/12 overflow-hidden bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] lg:min-h-[620px]">
        {/* Left column: headline + features */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
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
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-slate-500 font-mono">
              <span>// No coding required</span>
              <span>// Ready-to-use agents</span>
              <span>// Built for real hiring</span>
            </div>
          </div>
        </div>

        {/* Right column: Sign-In card */}
        <div className="flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/12 px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
          <div className="w-full max-w-md">
            <SigninFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
