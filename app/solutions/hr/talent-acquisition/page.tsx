 import SolutionWorkflowPage from "@/components/solutions/SolutionWorkflowPage";
import { ALL_TA_PLUGINS, TA_STAGES } from "@/lib/solutions/hr-workflows";

export const metadata = {
  title: "Talent Acquisition | HR Solutions | SoloBuildAI",
  description: "Find, screen and hire candidates through an AI-powered recruiting workflow.",
};

const CATEGORIES = [
  null,
  "Analysis",
  "Sourcing",
  "Screening",
  "Communication",
  "Scheduling",
  "Reporting",
  "Integration",
] as const;

export default function TalentAcquisitionPage() {
  return (
    <SolutionWorkflowPage
      eyebrow="Solutions / HR"
      solutionHref="/solutions/hr"
      solutionLabel="HR Solutions"
      workflowLabel="Talent Acquisition"
      headline={
        <>
          Talent Acquisition.<br />
          Smarter hiring with{" "}
          <span style={{ color: "#0066FF" }}>AI.</span>
        </>
      }
      description="Find, screen and hire the best candidates through a connected AI-powered workflow — from job description to qualified shortlist, with recruiters in control at every step."
      stats={[
        { value: String(TA_STAGES.length),            label: "Workflow stages" },
        { value: String(ALL_TA_PLUGINS.length) + "+", label: "Ready-to-use plugins" },
        { value: "8+",  label: "Integrations" },
        { value: "60%", label: "Faster time-to-shortlist" },
      ]}
      integrationNames={["Google Calendar", "Jira", "Workable", "BambooHR", "Ashby", "Slack", "Confluence", "HubSpot CRM"]}
      plugins={ALL_TA_PLUGINS}
      stages={TA_STAGES}
      categories={[...CATEGORIES]}
    />
  );
}
