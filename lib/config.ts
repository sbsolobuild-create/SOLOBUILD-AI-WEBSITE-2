/**
 * Centralized runtime configuration for the SoloBuildAI landing page.
 *
 * NEXT_PUBLIC_* variables are safe for the browser — they must NOT contain
 * secrets, credentials, or private keys.
 *
 * Server-only variables (SMTP_*, CONTACT_EMAIL) are read directly in server
 * actions; they are never exposed to the client bundle.
 */

/**
 * The URL of the external dashboard application (Vite / AWS Amplify).
 * Set NEXT_PUBLIC_DASHBOARD_URL in your .env.local file.
 *
 * The fallback keeps local development pointing at the known staging URL so
 * the site is usable without extra configuration; change the env var for
 * production once the permanent URL is confirmed.
 */
export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ||
  "https://main.d3ataamm8hxei7.amplifyapp.com";

/**
 * Common deep-link paths within the dashboard.
 * All are relative to DASHBOARD_URL so they stay consistent when the URL
 * changes through environment variables.
 */
export const DASHBOARD_PATHS = {
  /** Root of the dashboard (also handles sign-in redirect) */
  root: () => DASHBOARD_URL,

  /** Explicit sign-in page if the dashboard exposes one */
  signIn: () => `${DASHBOARD_URL}/`,

  /** Specific dashboard module paths */
  hiring: () => `${DASHBOARD_URL}/`,
  candidates: () => `${DASHBOARD_URL}/candidates`,
  screeningReports: () => `${DASHBOARD_URL}/screening-reports`,
  recruiters: () => `${DASHBOARD_URL}/recruiters`,
  interviews: () => `${DASHBOARD_URL}/interviews`,
  activity: () => `${DASHBOARD_URL}/activity`,
} as const;

/**
 * Throw a descriptive error in development if a required public variable is
 * missing.  In production this is a soft warning so we don't crash a page
 * because of a missing-but-optional variable.
 */
export function assertPublicConfig(): void {
  if (!process.env.NEXT_PUBLIC_DASHBOARD_URL) {
    const msg =
      "NEXT_PUBLIC_DASHBOARD_URL is not set. " +
      "Copy .env.example to .env.local and fill in the value. " +
      "The site will use the default staging URL until this is configured.";
    if (process.env.NODE_ENV === "development") {
      console.warn("[SoloBuildAI config]", msg);
    }
  }
}
