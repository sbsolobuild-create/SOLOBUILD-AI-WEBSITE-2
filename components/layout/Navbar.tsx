"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";

const BRAND = "#0066FF";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** A leaf link inside a mega-menu group or simple dropdown. */
interface MenuItem {
  label: string;
  href: string;
  tag?: string;
  description?: string;
  meta?: Array<{ label: string; value: string }>;
  icon?: React.ReactNode;
}

/** A visual column group inside a mega-menu panel. */
interface MenuGroup {
  heading: string;
  /** Optional href for the group heading itself */
  headingHref?: string;
  items: MenuItem[];
}

/** Config for one top-level nav button. */
interface NavConfig {
  label: string;
  /** If set the label is a clickable link AND opens the panel on hover */
  href?: string;
  /** null = simple label-only nav item (no panel) */
  menu: MegaMenuConfig | SimpleMenuConfig | null;
}

/** A full-width mega panel with columns and optional hover-preview. */
interface MegaMenuConfig {
  kind: "mega";
  groups: MenuGroup[];
  /** If true, hovering a MenuItem shows a preview in the right column */
  withPreview?: boolean;
  footerText?: string;
  footerHref?: string;
  footerLabel?: string;
}

/** A compact single-column dropdown. */
interface SimpleMenuConfig {
  kind: "simple";
  items: MenuItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MENU DATA — built from the shared nav-data registry
// ─────────────────────────────────────────────────────────────────────────────

import { SOLUTION_NAV } from "@/lib/solutions/nav-data";

// Solution-level items (HR, Sales, CS, IT)
const solutionMenuItems = SOLUTION_NAV.map((sol) => ({
  label: sol.label,
  href: sol.href,
  description: sol.description,
  /** Keep the solution id so the mega-menu can look up subprocesses */
  _solutionId: sol.id,
  meta: [{ label: "Workflows", value: String(sol.subprocesses.length) }],
}));

// Platform capabilities column (static)
const platformCapabilities = [
  { label: "AI Agents",           href: "/platform/ai-agents",           description: "Task-specific agents that act across your tools and workflows." },
  { label: "Workflow Automation", href: "/platform/workflow-automation",  description: "Automate multi-step operational processes with AI." },
  { label: "Plugins",             href: "/solutions",                     description: "50+ ready-to-use capabilities for every business workflow." },
  { label: "Integrations",        href: "/platform/integrations",         description: "Connect to Salesforce, Zendesk, ServiceNow, Slack and more." },
  { label: "Voice Intelligence",  href: "/platform/voice-intelligence",   description: "Natural voice interactions for any operational workflow." },
];

const NAV: NavConfig[] = [
  // ── Solutions ──────────────────────────────────────────────────────────────
  {
    label: "Solutions",
    href: "/solutions",
    menu: {
      kind: "solutions",   // ← special kind handled by SolutionsMegaMenu
    } as unknown as MegaMenuConfig,
  },

  // ── Services (Platform + Products) ────────────────────────────────────────
  {
    label: "Services",
    menu: {
      kind: "mega",
      withPreview: true,
      footerText: "AI employees · Agents · Products · Integrations",
      footerHref: "/platform/ai-employees",
      footerLabel: "Explore services →",
      groups: [
        {
          heading: "Core Platform",
          items: [
            {
              label: "AI Employees",
              href: "/platform/ai-employees",
              description: "Autonomous AI workers deployed inside your organization.",
              meta: [{ label: "Type", value: "Autonomous" }],
            },
            {
              label: "AI Agents",
              href: "/platform/ai-agents",
              description: "Task-specific agents that act across your tools and data.",
              meta: [{ label: "Type", value: "Task-specific" }],
            },
            {
              label: "Voice Intelligence",
              href: "/platform/voice-intelligence",
              description: "Natural voice interaction for any operational workflow.",
              meta: [{ label: "Type", value: "Voice-first" }],
            },
            {
              label: "Workflow Automation",
              href: "/platform/workflow-automation",
              description: "Automate multi-step operational processes with AI.",
              meta: [{ label: "Type", value: "Multi-step" }],
            },
            {
              label: "Integrations",
              href: "/platform/integrations",
              description: "Connect to the tools and systems your teams already use.",
              meta: [{ label: "Connectors", value: "25+" }],
            },
          ],
        },
        {
          heading: "Products",
          items: [
            {
              label: "Hiring Intelligence",
              href: "/products/hiring-intelligence",
              tag: "Live",
              description: "Make faster, more informed hiring decisions with intelligent talent insights.",
              meta: [{ label: "Type", value: "Hiring" }],
            },
            {
              label: "Voice AI",
              href: "/products/voice-ai",
              description: "Create natural voice experiences for candidate and customer conversations.",
              meta: [{ label: "Type", value: "Voice" }],
            },
            {
              label: "Campaigns",
              href: "/products/campaigns",
              description: "Plan and run targeted campaigns with intelligent workflow automation.",
              meta: [{ label: "Type", value: "Campaigns" }],
            },
            {
              label: "Candidate Intelligence",
              href: "/products/candidate-intelligence",
              description: "Turn candidate data into clearer insights across the hiring journey.",
              meta: [{ label: "Type", value: "Talent" }],
            },
            {
              label: "Analytics",
              href: "/products/analytics",
              description: "Understand workflow and team performance with actionable analytics.",
              meta: [{ label: "Type", value: "Insights" }],
            },
          ],
        },
      ],
    },
  },

  // ── Resources ──────────────────────────────────────────────────────────────
  {
    label: "Resources",
    menu: {
      kind: "simple",
      items: [
        { label: "Documentation", href: "/resources/documentation" },
        { label: "Case Studies",  href: "/resources/case-studies" },
        { label: "Blog",          href: "/resources/blog" },
        { label: "AI Resources",  href: "/resources/ai-resources" },
      ],
    },
  },

  // ── Company ────────────────────────────────────────────────────────────────
  {
    label: "Company",
    menu: {
      kind: "simple",
      items: [
        { label: "About",    href: "/company/about" },
        { label: "Security", href: "/company/security" },
        { label: "Contact",  href: "/company/contact" },
        { label: "Careers",  href: "/company/careers" },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SIMPLE DROPDOWN
// ─────────────────────────────────────────────────────────────────────────────

function SimpleDropdown({ items }: { items: MenuItem[] }) {
  const safeItems = items ?? [];
  
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-50 overflow-hidden">
      <div className="py-1.5">
        {safeItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between gap-2 px-4 py-2.5 text-[13px] text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>{item.label}</span>
            {item.tag && (
              <span
                className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0"
                style={{ color: BRAND, border: `1px solid ${BRAND}4D`, background: `${BRAND}1A` }}
              >
                {item.tag}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MEGA MENU
// ─────────────────────────────────────────────────────────────────────────────

function MegaMenuPanel({
  config,
  onClose,
}: {
  config: MegaMenuConfig;
  onClose: () => void;
}) {
  // Collect every previewable item (those with description)
  const allPreviewItems = (config.groups ?? [])
    .flatMap((g) => g.items ?? [])
    .filter((i) => i?.description);

  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(
    allPreviewItems[0] ?? null
  );

  const groups = config.groups ?? [];
  const colCount = config.withPreview
    ? groups.length + 1  // extra preview column
    : groups.length;

  // Grid template: equal columns for groups + fixed preview column
  const gridStyle: React.CSSProperties = config.withPreview
    ? {
        gridTemplateColumns: `repeat(${groups.length}, 1fr) 220px`,
      }
    : { gridTemplateColumns: `repeat(${groups.length}, 1fr)` };

  return (
    <div
      className="absolute top-full left-1/2 mt-3 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50 overflow-hidden"
      // Centre the panel relative to the viewport width, not the trigger
      style={{
        transform: "translateX(-50%)",
        width: "min(900px, calc(100vw - 48px))",
      }}
      // Keep open while mouse is inside the panel
      onMouseLeave={onClose}
    >
      <div className="grid" style={gridStyle}>
        {/* ── Groups ─────────────────────────────────────────────────── */}
        {groups.map((group, gi) => (
          <div
            key={group.heading}
            className={`py-5 px-5 ${gi > 0 ? "border-l border-white/[0.06]" : ""}`}
          >
            {/* Group heading */}
            {group.headingHref ? (
              <Link
                href={group.headingHref}
                className="block mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] hover:opacity-75 transition-opacity"
                style={{ color: BRAND }}
                onClick={onClose}
              >
                {group.heading}
              </Link>
            ) : (
              <p
                className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {group.heading}
              </p>
            )}

            {/* Items */}
            <ul className="space-y-0.5">
              {(group.items ?? []).map((item) => {
                const isActive = hoveredItem?.label === item.label;
                return (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => item.description ? setHoveredItem(item) : undefined}
                      onClick={onClose}
                      className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[13px] transition-all duration-100 ${
                        isActive
                          ? "bg-white/[0.07] text-white"
                          : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <span className="leading-snug">{item.label}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {item.tag && (
                          <span
                            className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                            style={{ color: BRAND, border: `1px solid ${BRAND}4D`, background: `${BRAND}1A` }}
                          >
                            {item.tag}
                          </span>
                        )}
                        <svg
                          className={`w-3 h-3 transition-all duration-100 ${
                            isActive ? "opacity-60 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0"
                          }`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* ── Preview column ──────────────────────────────────────────── */}
        {config.withPreview && (
          <div className="border-l border-white/[0.06] bg-white/[0.02] py-5 px-5 flex flex-col justify-between">
            {hoveredItem ? (
              <div className="flex flex-col gap-3 h-full">
                {/* Title */}
                <div>
                  <p className="text-[13px] font-semibold text-white leading-snug mb-2">
                    {hoveredItem.label}
                  </p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {hoveredItem.description}
                  </p>
                </div>

                {/* Meta pills */}
                {hoveredItem.meta && hoveredItem.meta.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {hoveredItem.meta.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg px-2.5 py-1.5 flex flex-col"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <span className="text-[9px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.30)" }}>
                          {m.label}
                        </span>
                        <span className="text-[15px] font-semibold text-white leading-tight">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto pt-3">
                  <Link
                    href={hoveredItem.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold transition-colors hover:opacity-80"
                    style={{ color: BRAND }}
                  >
                    View workflow
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                Hover an item to preview
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>
          {config.footerText ?? "AI agents · Workflows · Plugins · Integrations"}
        </p>
        <Link
          href={config.footerHref ?? "/solutions"}
          onClick={onClose}
          className="text-[11px] font-semibold transition-colors hover:opacity-75"
          style={{ color: BRAND }}
        >
          {config.footerLabel ?? "See all solutions →"}
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SOLUTIONS MEGA MENU  (dynamic subprocess panel)
// Shows: [Solutions column] | [Subprocesses for hovered solution] | [Platform]
// ─────────────────────────────────────────────────────────────────────────────

function SolutionsMegaMenu({ onClose }: { onClose: () => void }) {
  // Default to the first solution (HR) so the panel is never empty on open
  const safeSolutionNav = SOLUTION_NAV ?? [];
  const [activeSolId, setActiveSolId] = useState<string>(safeSolutionNav[0]?.id ?? "");
  const activeSol = safeSolutionNav.find((s) => s.id === activeSolId) ?? safeSolutionNav[0];

  if (!activeSol) return null;

  return (
    <div
      className="absolute top-full left-1/2 mt-3 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50 overflow-hidden"
      style={{ transform: "translateX(-50%)", width: "min(860px, calc(100vw - 48px))" }}
      onMouseLeave={onClose}
    >
      <div className="grid" style={{ gridTemplateColumns: "200px 1fr 190px" }}>

        {/* ── Column 1: Solution categories ────────────────────────── */}
        <div className="py-5 px-4 border-r border-white/[0.06]">
          <Link
            href="/solutions"
            onClick={onClose}
            className="block mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] hover:opacity-75 transition-opacity"
            style={{ color: BRAND }}
          >
            Solutions
          </Link>
          <ul className="space-y-0.5">
            {safeSolutionNav.map((sol) => {
              const isActive = activeSolId === sol.id;
              return (
                <li key={sol.id}>
                  <button
                    onMouseEnter={() => setActiveSolId(sol.id)}
                    onClick={() => { onClose(); window.location.href = sol.href; }}
                    className={`w-full text-left flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[13px] transition-all duration-100 ${
                      isActive
                        ? "bg-white/[0.08] text-white"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span className="leading-snug">{sol.label}</span>
                    <svg
                      className={`w-3 h-3 flex-shrink-0 transition-all duration-100 ${isActive ? "opacity-60" : "opacity-0"}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Column 2: Subprocesses for hovered solution ──────────── */}
        <div className="py-5 px-5 border-r border-white/[0.06]">
          <Link
            href={activeSol.href}
            onClick={onClose}
            className="block mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] hover:opacity-75 transition-opacity"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            {activeSol.label} workflows
          </Link>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
            {(activeSol.subprocesses ?? []).map((sub) => (
              <li key={sub.id}>
                <Link
                  href={sub.href}
                  onClick={onClose}
                  className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] text-slate-400 hover:bg-white/[0.05] hover:text-white transition-all duration-100"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#0066FF] flex-shrink-0 transition-colors" />
                  <span className="leading-snug truncate">{sub.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-white/[0.06]">
            <Link
              href={activeSol.href}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold transition-colors hover:opacity-80"
              style={{ color: BRAND }}
            >
              All {activeSol.label} workflows
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Column 3: Platform capabilities (static) ─────────────── */}
        <div className="py-5 px-4">
          <p
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Platform
          </p>
          <ul className="space-y-0.5">
            {(platformCapabilities ?? []).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-slate-400 hover:bg-white/[0.04] hover:text-white transition-all duration-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-5 py-4 border-t gap-4"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>
          AI agents · Workflows · Plugins · Integrations
        </p>
        <Link
          href="/solutions"
          onClick={onClose}
          className="inline-flex items-center gap-2 flex-shrink-0 px-4 py-2 text-[13px] font-medium text-white border border-white/15 hover:border-white/30 rounded-xl transition-colors"
        >
          See all solutions
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP NAV BUTTON + PANEL
// ─────────────────────────────────────────────────────────────────────────────

function NavButton({
  config,
  active,
  dark,
  onOpen,
  onClose,
}: {
  config: NavConfig;
  active: boolean;
  dark: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const hasMenu = config.menu !== null;
  const btnCls = `flex items-center gap-0.5 text-[13px] font-medium px-3 py-2 transition-colors rounded-lg ${
    dark
      ? active ? "text-white bg-white/[0.05]" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
      : active ? "text-slate-900 bg-slate-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
  }`;

  return (
    // onMouseLeave on the wrapper — mega panel also calls onClose on its own leave
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={() => {
        // Only close if not mega (mega self-manages leave)
        if (config.menu?.kind !== "mega") onClose();
      }}
    >
      {/* Trigger button / link */}
      {config.href ? (
        <Link href={config.href} className={btnCls}>
          {config.label}
          {hasMenu && (
            <svg className={`w-3 h-3 ml-0.5 transition-transform ${active ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </Link>
      ) : (
        <button className={btnCls} aria-haspopup={hasMenu} aria-expanded={active}>
          {config.label}
          {hasMenu && (
            <svg className={`w-3 h-3 ml-0.5 transition-transform ${active ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      )}

      {/* Panel */}
      {active && config.menu && (
        (config.menu as { kind: string }).kind === "solutions" ? (
          <SolutionsMegaMenu onClose={onClose} />
        ) : config.menu.kind === "mega" ? (
          <MegaMenuPanel config={config.menu} onClose={onClose} />
        ) : (
          <SimpleDropdown items={config.menu.items} />
        )
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE MENU  (accordion)
// ─────────────────────────────────────────────────────────────────────────────

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function MobileMenu({ open, onClose, dark, onToggleTheme }: { open: boolean; onClose: () => void; dark: boolean; onToggleTheme: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => { onClose(); /* eslint-disable-next-line */ }, [pathname]);
  // Reset expansion when menu closes
  useEffect(() => { if (!open) setExpanded(null); }, [open]);

  if (!open) return null;

  /** Flatten all items from a menu config */
  function flatItems(menu: MegaMenuConfig | SimpleMenuConfig | null): Array<{ item: MenuItem; groupLabel: string }> {
    if (!menu) return [];
    if (menu.kind === "simple") return (menu.items ?? []).map((item) => ({ item, groupLabel: "" }));
    if (menu.kind === "mega") return (menu.groups ?? []).flatMap((g) => (g.items ?? []).map((item) => ({ item, groupLabel: g.heading })));
    return [];
  }

  /** Deduplicate items by href */
  function dedup(items: Array<{ item: MenuItem; groupLabel: string }>) {
    const seen = new Set<string>();
    return items.filter(({ item }) => {
      if (seen.has(item.href + item.label)) return false;
      seen.add(item.href + item.label);
      return true;
    });
  }

  return (
    <div className={`fixed inset-0 z-40 flex flex-col backdrop-blur-sm ${dark ? "bg-black/97" : "bg-white/97"}`}>
      {/* Close button */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <Link href="/" onClick={onClose}>
          <BrandLogo compact />
        </Link>
        <button onClick={onClose} className={`p-2 ${dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto flex-1 px-4 py-4">
        <Link href="/" onClick={onClose} className={`flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${dark ? "text-white hover:bg-white/5" : "text-slate-900 hover:bg-slate-100"}`}>
          Home
        </Link>

        {NAV.map((nav) => {
          const isOpen = expanded === nav.label;
          const rows = nav.menu ? dedup(flatItems(nav.menu)) : [];

          return (
            <div key={nav.label} className="mb-1">
              <button
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-colors ${dark ? "text-white hover:bg-white/5" : "text-slate-900 hover:bg-slate-100"}`}
                onClick={() => setExpanded(isOpen ? null : nav.label)}
              >
                <span>{nav.label}</span>
                <svg
                  className={`w-4 h-4 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="ml-3 mt-0.5 mb-2 rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
                  {/* Section heading link if exists */}
                  {nav.href && (
                    <Link
                      href={nav.href}
                      onClick={onClose}
                      className="flex items-center gap-2 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] border-b border-white/8 transition-colors hover:bg-white/5"
                      style={{ color: BRAND }}
                    >
                      All {nav.label} →
                    </Link>
                  )}

                  {/* Grouped items */}
                  {(nav.menu as { kind: string })?.kind === "solutions"
                    ? <>
                        {(SOLUTION_NAV ?? []).map((sol) => (
                          <div key={sol.id}>
                            <Link
                              href={sol.href}
                              onClick={onClose}
                              className="flex items-center px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] hover:opacity-80 transition-opacity"
                              style={{ color: BRAND }}
                            >
                              {sol.label} →
                            </Link>
                            {(sol.subprocesses ?? []).map((sub) => (
                              <Link
                                key={sub.id}
                                href={sub.href}
                                onClick={onClose}
                                className="flex items-center gap-2 px-6 py-2 text-[13px] text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                        {/* See All Solutions button — mobile */}
                        <div className="px-4 py-3 border-t border-white/8">
                          <Link
                            href="/solutions"
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-[13px] font-medium text-white border border-white/15 hover:border-white/30 rounded-xl transition-colors"
                          >
                            See all solutions
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>
                      </>
                    : nav.menu?.kind === "mega"
                    ? ((nav.menu as MegaMenuConfig).groups ?? []).map((group) => (
                        <div key={group.heading}>
                          <p
                            className="px-4 pt-3 pb-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
                            style={{ color: "rgba(255,255,255,0.28)" }}
                          >
                            {group.heading}
                          </p>
                          {(group.items ?? []).map((item) => (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              onClick={onClose}
                              className="flex items-center justify-between px-4 py-2.5 text-[13px] text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <span>{item.label}</span>
                              {item.tag && (
                                <span
                                  className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                                  style={{ color: BRAND, border: `1px solid ${BRAND}4D`, background: `${BRAND}1A` }}
                                >
                                  {item.tag}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      ))
                    : rows.map(({ item }) => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center justify-between px-4 py-2.5 text-[13px] text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <span>{item.label}</span>
                          {item.tag && (
                            <span
                              className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                              style={{ color: BRAND, border: `1px solid ${BRAND}4D`, background: `${BRAND}1A` }}
                            >
                              {item.tag}
                            </span>
                          )}
                        </Link>
                      ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`border-t px-4 py-4 flex flex-col gap-3 ${dark ? "border-white/10" : "border-slate-200"}`}>
        <a href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://main.d3ataamm8hxei7.amplifyapp.com'}/`} onClick={onClose} className={`w-full px-4 py-3 text-sm font-medium text-center transition-all rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white`}>
          Sign In / Sign Up
        </a>
        <button onClick={onToggleTheme} className={`flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-center transition-colors rounded-xl ${dark ? "text-white hover:bg-white/5" : "text-slate-900 hover:bg-slate-100"}`}>
          <ThemeIcon dark={dark} />
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/"><BrandLogo /></Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar({ framed = false }: { framed?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [activeMenu, setActiveMenu]   = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("solobuild-theme") !== "light";
  });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    window.localStorage.setItem("solobuild-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = useCallback(() => setDark((current) => !current), []);

  // ── Escape key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setActiveMenu(null); setMobileOpen(false); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // ── Click outside ──────────────────────────────────────────────────────────
  useEffect(() => {
    function onPointer(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const handleOpen = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  }, []);

  const handleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 80);
  }, []);

  const inner = (
      <div
      ref={navRef}
      className={`flex items-center justify-between h-[58px] ${framed ? "px-5 sm:px-6" : "px-6"}`}
    >
      <Logo />

      {/* ── Desktop nav ─────────────────────────────────────────────── */}
      <nav className="hidden lg:flex items-center" aria-label="Main navigation">
        <Link
          href="/"
          className={`relative text-[13px] font-medium px-3 py-2 rounded-lg transition-colors ${
            dark
              ? isHome ? "text-white bg-white/[0.05]" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
              : isHome ? "text-slate-900 bg-slate-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Home
          {isHome && (
            <span className="absolute left-3 right-3 -bottom-px h-[2px] rounded-full bg-[#0066FF]" />
          )}
        </Link>

        {NAV.map((nav) => (
          <NavButton
            key={nav.label}
            config={nav}
            active={activeMenu === nav.label}
            dark={dark}
            onOpen={() => handleOpen(nav.label)}
            onClose={handleClose}
          />
        ))}
      </nav>

      {/* ── Desktop right ────────────────────────────────────────────── */}
      <div className="hidden lg:flex items-center gap-3">
        <a
          href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://main.d3ataamm8hxei7.amplifyapp.com'}/`}
          className="inline-flex items-center px-4 py-2 text-[13px] font-medium rounded-lg transition-all bg-[#0066FF] hover:bg-[#0052CC] text-white"
        >
          Sign In / Sign Up
        </a>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${dark ? "text-slate-300 hover:text-white hover:bg-white/[0.05]" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}
        >
          <ThemeIcon dark={dark} />
        </button>
      </div>

      {/* ── Mobile hamburger ─────────────────────────────────────────── */}
      <button
        className="lg:hidden p-2 text-white/80 hover:text-white relative z-50 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
  );

  return (
    <>
      <header
        className={
          framed
            ? `fixed top-0 left-0 right-0 z-50 backdrop-blur-md px-2 sm:px-3 pt-2 sm:pt-3 ${dark ? "bg-black/80" : "bg-white/80"}`
            : `fixed top-0 left-0 right-0 z-50 border-b ${dark ? "bg-black border-white/10" : "bg-white border-slate-200"}`
        }
      >
        <nav
          className={
            framed
              ? `rounded-2xl border ${dark ? "border-white/12 bg-black" : "border-slate-200 bg-white"}`
              : "max-w-[1600px] mx-auto"
          }
          aria-label="Site navigation"
        >
          {inner}
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} dark={dark} onToggleTheme={toggleTheme} />

      {!framed && <div className="h-14" />}
    </>
  );
}
