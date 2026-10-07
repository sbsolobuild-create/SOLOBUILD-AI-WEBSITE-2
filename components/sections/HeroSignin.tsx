"use client";

import Image from "next/image";
import Link from "next/link";
import concreteBuildingImage from "@/app/file_00000000f12481fba98e0793f2268462.png";

export default function HeroSignin() {
  return (
    <section className="rounded-2xl border border-white/12 overflow-hidden">
      {/* ── DESKTOP: image fills the section, both columns overlay it ── */}
      <div className="hidden lg:block relative min-h-[620px]">
        {/* Background image */}
        <Image
          src={concreteBuildingImage}
          alt="SoloBuildAI hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />

        {/* Constrained inner layout so both columns sit closer together */}
        <div className="absolute inset-0 flex items-center justify-between max-w-6xl mx-auto w-full px-10 py-16">
          {/* Left: headline + features */}
          <div className="flex flex-col justify-center max-w-[500px]">
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-8">
              AI Agents for real work
            </p>
            <h1 className="mb-7">
              <span className="block text-[80px] leading-[0.92] font-semibold tracking-[-0.04em] text-white uppercase">
                Ideas
              </span>
              <span className="block text-[80px] leading-[0.92] font-semibold tracking-[-0.04em] uppercase">
                <span className="text-white">to </span>
                <span className="text-[#0066FF]">Impact.</span>
              </span>
            </h1>
            <p className="text-[15px] leading-[1.7] text-white mb-9 max-w-[420px]">
              Build, deploy and scale AI agents, workflows and tools to turn your ideas into real outcomes — without the usual complexity.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-neutral-200 font-mono">
              <span>// No coding required</span>
              <span>// Ready-to-use agents</span>
              <span>// Built for real hiring</span>
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl flex flex-col gap-5">
              {/* Enquiry Form */}
              <div className="flex flex-col gap-2">
                <p className="text-[11px] text-white/50 uppercase tracking-widest font-medium">Get in touch</p>
                <p className="text-white/70 text-sm leading-relaxed">Connect with our team to ask questions or discuss custom workflows.</p>
                <Link
                  href="/company/contact"
                  className="mt-1 w-full text-center bg-[#0066FF] hover:bg-[#0052CC] text-white py-3 px-6 rounded-lg font-medium transition-all text-sm"
                >
                  Send Enquiry
                </Link>
              </div>

              <div className="border-t border-white/10" />

              {/* Request Demo */}
              <div className="flex flex-col gap-2">
                <p className="text-[11px] text-white/50 uppercase tracking-widest font-medium">See it live</p>
                <p className="text-white/70 text-sm leading-relaxed">See our AI hiring and sales agents live in action.</p>
                <Link
                  href="/demo"
                  className="mt-1 w-full text-center bg-white/5 hover:bg-white/10 text-white border border-white/20 py-3 px-6 rounded-lg font-medium transition-all text-sm"
                >
                  Request Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE/TABLET: stacked layout (image then card) ── */}
      <div className="lg:hidden flex flex-col">
        {/* Image */}
        <div className="relative h-64 sm:h-80">
          <Image
            src={concreteBuildingImage}
            alt="SoloBuildAI hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
          {/* Headline overlaid on mobile image */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6">
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-3">
              AI Agents for real work
            </p>
            <h1>
              <span className="block text-[48px] sm:text-[60px] leading-[0.92] font-semibold tracking-[-0.04em] text-white uppercase">
                Ideas
              </span>
              <span className="block text-[48px] sm:text-[60px] leading-[0.92] font-semibold tracking-[-0.04em] uppercase">
                <span className="text-white">to </span>
                <span className="text-[#0066FF]">Impact.</span>
              </span>
            </h1>
          </div>
        </div>

        {/* CTA buttons below image on mobile */}
        <div className="bg-[#0A0A0A] border-t border-white/10 px-6 py-10 sm:px-10">
          <p className="text-[13px] leading-[1.7] text-white mb-8">
            Build, deploy and scale AI agents, workflows and tools to turn your ideas into real outcomes.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-white/60 text-xs leading-relaxed">Connect with our team to ask questions or discuss custom workflows.</p>
              <Link
                href="/company/contact"
                className="w-full text-center bg-[#0066FF] hover:bg-[#0052CC] text-white py-3 px-6 rounded-lg font-medium transition-all text-sm"
              >
                Send Enquiry
              </Link>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-white/60 text-xs leading-relaxed">See our AI hiring and sales agents live in action.</p>
              <Link
                href="/demo"
                className="w-full text-center bg-white/5 hover:bg-white/10 text-white border border-white/20 py-3 px-6 rounded-lg font-medium transition-all text-sm"
              >
                Request Demo
              </Link>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-neutral-200 font-mono">
            <span>// No coding required</span>
            <span>// Ready-to-use agents</span>
          </div>
        </div>
      </div>
    </section>
  );
}
