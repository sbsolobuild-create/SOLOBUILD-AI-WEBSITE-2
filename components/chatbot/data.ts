import { ChatMessage, ChatbotContextConfig, ConnectedTool, RecentChat, SolutionContext, SolutionId } from "./types";
import { DASHBOARD_PATHS } from "@/lib/config";

export const CHATBOT_CONTEXTS: Record<string, ChatbotContextConfig> = {
  "talent-acquisition": {
    id: "talent-acquisition",
    groupId: "hr",
    name: "Talent Acquisition",
    landingHref: "/solutions/hr/talent-acquisition",
    menuItems: [
      { id: "hiring", name: "Hiring", href: DASHBOARD_PATHS.hiring(), external: true },
      { id: "candidates", name: "Candidates", href: DASHBOARD_PATHS.candidates(), external: true },
      { id: "screening-reports", name: "Screening Reports", href: DASHBOARD_PATHS.screeningReports(), external: true },
      { id: "ai-recruiters", name: "AI Recruiters", href: DASHBOARD_PATHS.recruiters(), external: true },
      { id: "interviews", name: "Interviews", href: DASHBOARD_PATHS.interviews(), external: true },
      { id: "activity", name: "Activity", href: DASHBOARD_PATHS.activity(), external: true },
    ],
  },
  "employee-onboarding": {
    id: "employee-onboarding",
    groupId: "hr",
    name: "Employee Onboarding",
    landingHref: "/solutions/hr/employee-onboarding",
    menuItems: [
      { id: "new-hires", name: "New Hires", href: "/solutions/hr/employee-onboarding" },
      { id: "documents", name: "Documents", href: "/solutions/hr/employee-onboarding" },
      { id: "account-setup", name: "Account Setup", href: "/solutions/hr/employee-onboarding" },
      { id: "it-setup", name: "IT Setup", href: "/solutions/hr/employee-onboarding" },
      { id: "orientation", name: "Orientation", href: "/solutions/hr/employee-onboarding" },
      { id: "activity", name: "Activity", href: "/solutions/hr/employee-onboarding" },
    ],
  },
  "learning-development": {
    id: "learning-development",
    groupId: "hr",
    name: "Learning & Development",
    landingHref: "/solutions/hr/learning-development",
    menuItems: [
      { id: "learning-plans", name: "Learning Plans", href: "/solutions/hr/learning-development" },
      { id: "skill-gaps", name: "Skill Gaps", href: "/solutions/hr/learning-development" },
      { id: "courses", name: "Courses", href: "/solutions/hr/learning-development" },
      { id: "training", name: "Training", href: "/solutions/hr/learning-development" },
      { id: "evaluations", name: "Evaluations", href: "/solutions/hr/learning-development" },
      { id: "activity", name: "Activity", href: "/solutions/hr/learning-development" },
    ],
  },
  "performance-reviews": {
    id: "performance-reviews",
    groupId: "hr",
    name: "Performance & Reviews",
    landingHref: "/solutions/hr/performance-reviews",
    menuItems: [
      { id: "performance-reviews", name: "Performance Reviews", href: "/solutions/hr/performance-reviews" },
      { id: "goals", name: "Goals", href: "/solutions/hr/performance-reviews" },
      { id: "feedback", name: "Feedback", href: "/solutions/hr/performance-reviews" },
      { id: "sentiment", name: "Sentiment", href: "/solutions/hr/performance-reviews" },
      { id: "development-plans", name: "Development Plans", href: "/solutions/hr/performance-reviews" },
      { id: "activity", name: "Activity", href: "/solutions/hr/performance-reviews" },
    ],
  },
  "payroll-benefits": {
    id: "payroll-benefits",
    groupId: "hr",
    name: "Payroll & Benefits",
    landingHref: "/solutions/hr/payroll-benefits",
    menuItems: [
      { id: "payroll", name: "Payroll", href: "/solutions/hr/payroll-benefits" },
      { id: "salary-tax", name: "Salary & Tax", href: "/solutions/hr/payroll-benefits" },
      { id: "benefits", name: "Benefits", href: "/solutions/hr/payroll-benefits" },
      { id: "payslips", name: "Payslips", href: "/solutions/hr/payroll-benefits" },
      { id: "leave-attendance", name: "Leave & Attendance", href: "/solutions/hr/payroll-benefits" },
      { id: "activity", name: "Activity", href: "/solutions/hr/payroll-benefits" },
    ],
  },
  "employee-support": {
    id: "employee-support",
    groupId: "hr",
    name: "Employee Support",
    landingHref: "/solutions/hr/employee-support",
    menuItems: [
      { id: "hr-queries", name: "HR Queries", href: "/solutions/hr/employee-support" },
      { id: "policies-faqs", name: "Policies & FAQs", href: "/solutions/hr/employee-support" },
      { id: "leave", name: "Leave", href: "/solutions/hr/employee-support" },
      { id: "attendance", name: "Attendance", href: "/solutions/hr/employee-support" },
      { id: "payroll-support", name: "Payroll Support", href: "/solutions/hr/employee-support" },
      { id: "activity", name: "Activity", href: "/solutions/hr/employee-support" },
    ],
  },
  "offboarding": {
    id: "offboarding",
    groupId: "hr",
    name: "Offboarding",
    landingHref: "/solutions/hr/offboarding",
    menuItems: [
      { id: "exit-requests", name: "Exit Requests", href: "/solutions/hr/offboarding" },
      { id: "knowledge-transfer", name: "Knowledge Transfer", href: "/solutions/hr/offboarding" },
      { id: "access-revocation", name: "Access Revocation", href: "/solutions/hr/offboarding" },
      { id: "asset-return", name: "Asset Return", href: "/solutions/hr/offboarding" },
      { id: "exit-interviews", name: "Exit Interviews", href: "/solutions/hr/offboarding" },
      { id: "activity", name: "Activity", href: "/solutions/hr/offboarding" },
    ],
  },
  "lead-management": {
    id: "lead-management",
    groupId: "sales",
    name: "Lead Management",
    landingHref: "/solutions/sales/lead-management",
    menuItems: [
      { id: "lead-research", name: "Lead Research", href: "/coming-soon/lead-management/lead-research" },
      { id: "lead-enrichment", name: "Lead Enrichment", href: "/coming-soon/lead-management/lead-enrichment" },
      { id: "lead-qualification", name: "Lead Qualification", href: "/coming-soon/lead-management/lead-qualification" },
      { id: "lead-scoring", name: "Lead Scoring", href: "/coming-soon/lead-management/lead-scoring" },
      { id: "lead-assignment", name: "Lead Assignment", href: "/coming-soon/lead-management/lead-assignment" },
      { id: "activity", name: "Activity", href: "/coming-soon/lead-management/activity" },
    ],
  },
  "lead-qualification": {
    id: "lead-qualification",
    groupId: "sales",
    name: "Lead Qualification",
    landingHref: "/solutions/sales/lead-qualification",
    menuItems: [
      { id: "lead-research", name: "Lead Research", href: "/coming-soon/lead-qualification/lead-research" },
      { id: "qualification-criteria", name: "Qualification Criteria", href: "/coming-soon/lead-qualification/qualification-criteria" },
      { id: "lead-scoring", name: "Lead Scoring", href: "/coming-soon/lead-qualification/lead-scoring" },
      { id: "intent-detection", name: "Intent Detection", href: "/coming-soon/lead-qualification/intent-detection" },
      { id: "qualification-results", name: "Qualification Results", href: "/coming-soon/lead-qualification/qualification-results" },
      { id: "activity", name: "Activity", href: "/coming-soon/lead-qualification/activity" },
    ],
  },
  "sales-outreach": {
    id: "sales-outreach",
    groupId: "sales",
    name: "Sales Outreach",
    landingHref: "/solutions/sales/sales-outreach",
    menuItems: [
      { id: "lead-research", name: "Lead Research", href: "/coming-soon/sales-outreach/lead-research" },
      { id: "personalized-outreach", name: "Personalized Outreach", href: "/coming-soon/sales-outreach/personalized-outreach" },
      { id: "email-campaigns", name: "Email Campaigns", href: "/coming-soon/sales-outreach/email-campaigns" },
      { id: "follow-ups", name: "Follow-ups", href: "/coming-soon/sales-outreach/follow-ups" },
      { id: "meeting-booking", name: "Meeting Booking", href: "/coming-soon/sales-outreach/meeting-booking" },
      { id: "activity", name: "Activity", href: "/coming-soon/sales-outreach/activity" },
    ],
  },
  "meeting-scheduling": {
    id: "meeting-scheduling",
    groupId: "sales",
    name: "Meeting & Scheduling",
    landingHref: "/solutions/sales/meeting-scheduling",
    menuItems: [
      { id: "meeting-requests", name: "Meeting Requests", href: "/coming-soon/meeting-scheduling/meeting-requests" },
      { id: "availability", name: "Availability", href: "/coming-soon/meeting-scheduling/availability" },
      { id: "scheduling", name: "Scheduling", href: "/coming-soon/meeting-scheduling/scheduling" },
      { id: "rescheduling", name: "Rescheduling", href: "/coming-soon/meeting-scheduling/rescheduling" },
      { id: "reminders", name: "Reminders", href: "/coming-soon/meeting-scheduling/reminders" },
      { id: "activity", name: "Activity", href: "/coming-soon/meeting-scheduling/activity" },
    ],
  },
  "opportunity-management": {
    id: "opportunity-management",
    groupId: "sales",
    name: "Opportunity Management",
    landingHref: "/solutions/sales/opportunity-management",
    menuItems: [
      { id: "opportunity-tracking", name: "Opportunity Tracking", href: "/coming-soon/opportunity-management/opportunity-tracking" },
      { id: "deal-qualification", name: "Deal Qualification", href: "/coming-soon/opportunity-management/deal-qualification" },
      { id: "pipeline-management", name: "Pipeline Management", href: "/coming-soon/opportunity-management/pipeline-management" },
      { id: "deal-updates", name: "Deal Updates", href: "/coming-soon/opportunity-management/deal-updates" },
      { id: "follow-ups", name: "Follow-ups", href: "/coming-soon/opportunity-management/follow-ups" },
      { id: "activity", name: "Activity", href: "/coming-soon/opportunity-management/activity" },
    ],
  },
  "sales-analytics": {
    id: "sales-analytics",
    groupId: "sales",
    name: "Sales Analytics",
    landingHref: "/solutions/sales/sales-analytics",
    menuItems: [
      { id: "sales-dashboard", name: "Sales Dashboard", href: "/coming-soon/sales-analytics/sales-dashboard" },
      { id: "pipeline-analytics", name: "Pipeline Analytics", href: "/coming-soon/sales-analytics/pipeline-analytics" },
      { id: "conversion-analytics", name: "Conversion Analytics", href: "/coming-soon/sales-analytics/conversion-analytics" },
      { id: "revenue-insights", name: "Revenue Insights", href: "/coming-soon/sales-analytics/revenue-insights" },
      { id: "forecasting", name: "Forecasting", href: "/coming-soon/sales-analytics/forecasting" },
      { id: "activity", name: "Activity", href: "/coming-soon/sales-analytics/activity" },
    ],
  },
  "ticket-management": {
    id: "ticket-management",
    groupId: "support",
    name: "Ticket Management",
    landingHref: "/solutions/customer-support/support-workflow",
    menuItems: [
      { id: "ticket-creation", name: "Ticket Creation", href: "/coming-soon/ticket-management/ticket-creation" },
      { id: "ticket-classification", name: "Ticket Classification", href: "/coming-soon/ticket-management/ticket-classification" },
      { id: "priority-routing", name: "Priority & Routing", href: "/coming-soon/ticket-management/priority-routing" },
      { id: "ticket-assignment", name: "Ticket Assignment", href: "/coming-soon/ticket-management/ticket-assignment" },
      { id: "sla-management", name: "SLA Management", href: "/coming-soon/ticket-management/sla-management" },
      { id: "resolution-tracking", name: "Resolution Tracking", href: "/coming-soon/ticket-management/resolution-tracking" },
      { id: "activity", name: "Activity", href: "/coming-soon/ticket-management/activity" },
    ],
  },
  "agent-assist": {
    id: "agent-assist",
    groupId: "support",
    name: "Agent Assist",
    landingHref: "/solutions/customer-support/agent-assist",
    menuItems: [
      { id: "ticket-context", name: "Ticket Context", href: "/coming-soon/agent-assist/ticket-context" },
      { id: "suggested-responses", name: "Suggested Responses", href: "/coming-soon/agent-assist/suggested-responses" },
      { id: "customer-information", name: "Customer Information", href: "/coming-soon/agent-assist/customer-information" },
      { id: "next-best-action", name: "Next Best Action", href: "/coming-soon/agent-assist/next-best-action" },
      { id: "agent-guidance", name: "Agent Guidance", href: "/coming-soon/agent-assist/agent-guidance" },
      { id: "activity", name: "Activity", href: "/coming-soon/agent-assist/activity" },
    ],
  },
  "knowledge-resolution": {
    id: "knowledge-resolution",
    groupId: "support",
    name: "Knowledge & Resolution",
    landingHref: "/solutions/customer-support/knowledge-resolution",
    menuItems: [
      { id: "knowledge-search", name: "Knowledge Search", href: "/coming-soon/knowledge-resolution/knowledge-search" },
      { id: "answer-generation", name: "Answer Generation", href: "/coming-soon/knowledge-resolution/answer-generation" },
      { id: "resolution-suggestions", name: "Resolution Suggestions", href: "/coming-soon/knowledge-resolution/resolution-suggestions" },
      { id: "article-recommendations", name: "Article Recommendations", href: "/coming-soon/knowledge-resolution/article-recommendations" },
      { id: "case-resolution", name: "Case Resolution", href: "/coming-soon/knowledge-resolution/case-resolution" },
      { id: "activity", name: "Activity", href: "/coming-soon/knowledge-resolution/activity" },
    ],
  },
  escalation: {
    id: "escalation",
    groupId: "support",
    name: "Escalation",
    landingHref: "/solutions/customer-support/escalation",
    menuItems: [
      { id: "escalation-detection", name: "Escalation Detection", href: "/coming-soon/escalation/escalation-detection" },
      { id: "priority-management", name: "Priority Management", href: "/coming-soon/escalation/priority-management" },
      { id: "human-handoff", name: "Human Handoff", href: "/coming-soon/escalation/human-handoff" },
      { id: "case-routing", name: "Case Routing", href: "/coming-soon/escalation/case-routing" },
      { id: "escalation-tracking", name: "Escalation Tracking", href: "/coming-soon/escalation/escalation-tracking" },
      { id: "activity", name: "Activity", href: "/coming-soon/escalation/activity" },
    ],
  },
  "customer-communication": {
    id: "customer-communication",
    groupId: "support",
    name: "Customer Communication",
    landingHref: "/solutions/customer-support/customer-communication",
    menuItems: [
      { id: "email-responses", name: "Email Responses", href: "/coming-soon/customer-communication/email-responses" },
      { id: "chat-responses", name: "Chat Responses", href: "/coming-soon/customer-communication/chat-responses" },
      { id: "customer-updates", name: "Customer Updates", href: "/coming-soon/customer-communication/customer-updates" },
      { id: "notifications", name: "Notifications", href: "/coming-soon/customer-communication/notifications" },
      { id: "follow-ups", name: "Follow-ups", href: "/coming-soon/customer-communication/follow-ups" },
      { id: "activity", name: "Activity", href: "/coming-soon/customer-communication/activity" },
    ],
  },
  "support-analytics": {
    id: "support-analytics",
    groupId: "support",
    name: "Support Analytics",
    landingHref: "/solutions/customer-support/support-analytics",
    menuItems: [
      { id: "support-dashboard", name: "Support Dashboard", href: "/coming-soon/support-analytics/support-dashboard" },
      { id: "ticket-analytics", name: "Ticket Analytics", href: "/coming-soon/support-analytics/ticket-analytics" },
      { id: "resolution-analytics", name: "Resolution Analytics", href: "/coming-soon/support-analytics/resolution-analytics" },
      { id: "response-time", name: "Response Time", href: "/coming-soon/support-analytics/response-time" },
      { id: "customer-insights", name: "Customer Insights", href: "/coming-soon/support-analytics/customer-insights" },
      { id: "activity", name: "Activity", href: "/coming-soon/support-analytics/activity" },
    ],
  },
  "it-support": {
    id: "it-support",
    groupId: "it",
    name: "IT Support",
    landingHref: "/solutions/it/it-support",
    menuItems: [
      { id: "it-requests", name: "IT Requests", href: "/coming-soon/it-support/it-requests" },
      { id: "incident-management", name: "Incident Management", href: "/coming-soon/it-support/incident-management" },
      { id: "troubleshooting", name: "Troubleshooting", href: "/coming-soon/it-support/troubleshooting" },
      { id: "device-support", name: "Device Support", href: "/coming-soon/it-support/device-support" },
      { id: "access-requests", name: "Access Requests", href: "/coming-soon/it-support/access-requests" },
      { id: "activity", name: "Activity", href: "/coming-soon/it-support/activity" },
    ],
  },
  "service-operations": {
    id: "service-operations",
    groupId: "it",
    name: "Service Operations",
    landingHref: "/solutions/it/service-operations",
    menuItems: [
      { id: "service-requests", name: "Service Requests", href: "/coming-soon/service-operations/service-requests" },
      { id: "incident-tracking", name: "Incident Tracking", href: "/coming-soon/service-operations/incident-tracking" },
      { id: "workflow-automation", name: "Workflow Automation", href: "/coming-soon/service-operations/workflow-automation" },
      { id: "approvals", name: "Approvals", href: "/coming-soon/service-operations/approvals" },
      { id: "service-monitoring", name: "Service Monitoring", href: "/coming-soon/service-operations/service-monitoring" },
      { id: "activity", name: "Activity", href: "/coming-soon/service-operations/activity" },
    ],
  },
  "email-automation": {
    id: "email-automation",
    groupId: "it",
    name: "Email Automation",
    landingHref: "/solutions/it/email-automation",
    menuItems: [
      { id: "email-classification", name: "Email Classification", href: "/coming-soon/email-automation/email-classification" },
      { id: "email-drafting", name: "Email Drafting", href: "/coming-soon/email-automation/email-drafting" },
      { id: "email-routing", name: "Email Routing", href: "/coming-soon/email-automation/email-routing" },
      { id: "response-automation", name: "Response Automation", href: "/coming-soon/email-automation/response-automation" },
      { id: "follow-ups", name: "Follow-ups", href: "/coming-soon/email-automation/follow-ups" },
      { id: "activity", name: "Activity", href: "/coming-soon/email-automation/activity" },
    ],
  },
  sales: {
    id: "sales",
    groupId: "sales",
    name: "Sales",
    landingHref: "/solutions/sales",
    menuItems: [{ id: "coming-soon", name: "Coming Soon", isComingSoon: true }],
  },
  "customer-support": {
    id: "customer-support",
    groupId: "support",
    name: "Customer Support",
    landingHref: "/solutions/customer-support",
    menuItems: [{ id: "coming-soon", name: "Coming Soon", isComingSoon: true }],
  },
  it: {
    id: "it",
    groupId: "it",
    name: "IT Solutions",
    landingHref: "/solutions/it",
    menuItems: [{ id: "coming-soon", name: "Coming Soon", isComingSoon: true }],
  },
};

export function getChatbotContext(contextId: string | null | undefined) {
  if (!contextId) return null;
  return CHATBOT_CONTEXTS[contextId] ?? null;
}

export function getSolutionIdForContext(contextId: string | null | undefined): SolutionId {
  const context = getChatbotContext(contextId);
  if (!context) return "hr";
  return context.id === "talent-acquisition" ? "talent-acquisition" : context.groupId;
}

export function getChatbotContextFromPath(pathname: string | null | undefined) {
  if (!pathname) return null;

  return (
    Object.values(CHATBOT_CONTEXTS).find((context) => {
      const landingHref = context.landingHref;
      return pathname === landingHref || pathname.startsWith(`${landingHref}/`);
    }) ?? null
  );
}

export const SOLUTIONS: SolutionContext[] = [
  {
    id: "hr",
    name: "HR Solutions",
    shortName: "HR",
    icon: "people",
    topics: ["Leave requests", "Employee onboarding", "Payroll", "Attendance", "Hiring", "Employee documents"],
    tools: ["HR System", "Document Management", "Email & Calendar", "Identity Management", "People Analytics"],
    actions: ["View pending leave requests", "Check joining formalities", "Verify documents", "Update employee profile", "Generate HR report"],
    starter: "Help me with my pending HR tasks",
    response: "I found several pending HR tasks. I can help you review, prioritize, and take action on them. Here’s a summary of what I found:",
    summary: ["3 pending leave requests", "2 pending joining formalities", "1 pending document verification", "1 pending profile update"],
  },
  {
    id: "sales",
    name: "Sales",
    shortName: "Sales",
    icon: "chart",
    topics: ["Leads", "Sales pipeline", "Follow-ups", "Customer information", "Sales reports"],
    tools: ["CRM", "Email & Calendar", "Sales Analytics", "Customer Database"],
    actions: ["Summarize open opportunities", "Find overdue follow-ups", "Review top leads", "Draft a sales report"],
    starter: "Give me a summary of sales performance",
    response: "I reviewed the current sales workspace and found a few useful signals for your team:",
    summary: ["12 active opportunities", "4 follow-ups due today", "3 high-intent leads", "1 stalled deal needing attention"],
  },
  {
    id: "support",
    name: "Customer Support",
    shortName: "Support",
    icon: "headset",
    topics: ["Customer tickets", "Issue resolution", "Support requests", "Customer information", "Escalations"],
    tools: ["Support Desk", "Customer Database", "Knowledge Base", "Email & Calendar"],
    actions: ["Review urgent tickets", "Find unresolved escalations", "Summarize customer issues", "Prepare a support report"],
    starter: "Show me the latest customer support update",
    response: "I checked the support workspace and organized the issues that need the most attention:",
    summary: ["5 tickets awaiting response", "2 priority escalations", "8 issues resolved today", "1 knowledge gap identified"],
  },
  {
    id: "it",
    name: "IT Solutions",
    shortName: "IT",
    icon: "terminal",
    topics: ["System access", "IT tickets", "Password/access requests", "Device issues", "Technical support"],
    tools: ["IT Service Desk", "Identity Management", "Device Management", "Knowledge Base"],
    actions: ["Review access requests", "Find unresolved IT tickets", "Check device issues", "Generate an IT report"],
    starter: "Help me review system access requests",
    response: "I checked the IT workspace and found these requests ready for review:",
    summary: ["4 access requests pending", "2 tickets awaiting approval", "3 device issues in progress", "1 password reset escalation"],
  },
  {
    id: "operations",
    name: "Operations",
    shortName: "Operations",
    icon: "workflow",
    topics: ["Tasks", "Approvals", "Reports", "Business operations", "Workflow status"],
    tools: ["Workflow Hub", "Operations Database", "Email & Calendar", "Business Analytics"],
    actions: ["Review pending approvals", "Check workflow status", "Summarize operations", "Generate an operations report"],
    starter: "What needs my attention in operations?",
    response: "I reviewed the operations workspace and grouped the work that needs attention:",
    summary: ["7 tasks in progress", "3 approvals waiting", "2 workflows delayed", "1 report ready to review"],
  },
];

export const RECENT_CHATS: RecentChat[] = [
  { id: "hr-tasks", title: "Pending HR tasks help", solutionId: "hr", time: "2m ago", message: "Help me with my pending HR tasks" },
  { id: "sales-summary", title: "Sales performance summary", solutionId: "sales", time: "1h ago", message: "Give me a summary of sales performance" },
  { id: "support-update", title: "Customer support update", solutionId: "support", time: "3h ago", message: "Show me the latest customer support update" },
  { id: "access-request", title: "System access request", solutionId: "it", time: "5h ago", message: "Help me review system access requests" },
  { id: "team-report", title: "Team performance report", solutionId: "operations", time: "1d ago", message: "What needs my attention in operations?" },
];

export const TALENT_ACQUISITION_RECENT_CHATS: RecentChat[] = [
  { id: "ta-candidate-screening", title: "Candidate screening help", solutionId: "hr", time: "2m ago", message: "Review candidates and summarize screening flags" },
  { id: "ta-hiring-pipeline", title: "Hiring pipeline update", solutionId: "hr", time: "18m ago", message: "Check hiring status across active roles" },
  { id: "ta-interview-scheduling", title: "Interview scheduling", solutionId: "hr", time: "42m ago", message: "Coordinate interviews and follow-ups" },
  { id: "ta-resume-review", title: "Resume review", solutionId: "hr", time: "1h ago", message: "Summarize candidate strengths and risks" },
];

export function getContextualRecentChats(contextId: string | null | undefined): RecentChat[] {
  if (contextId === "talent-acquisition") return TALENT_ACQUISITION_RECENT_CHATS;
  if (contextId && ["sales", "support", "it"].includes(CHATBOT_CONTEXTS[contextId]?.groupId ?? "")) return [];
  return RECENT_CHATS.filter((chat) => chat.solutionId === "hr");
}

export function getSolution(solutionId: SolutionId) {
  if (solutionId === "talent-acquisition") return SOLUTIONS[0];
  return SOLUTIONS.find((solution) => solution.id === solutionId) ?? SOLUTIONS[0];
}

export function getConnectedTools(solution: SolutionContext): ConnectedTool[] {
  return solution.tools.map((name) => ({ name, status: "Demo mode" }));
}

export function createConversation(solution: SolutionContext): ChatMessage[] {
  return [
    { id: `${solution.id}-user`, role: "user", content: solution.starter },
    {
      id: `${solution.id}-assistant`,
      role: "assistant",
      content: solution.response,
      summary: solution.summary,
      showActivity: true,
    },
  ];
}

