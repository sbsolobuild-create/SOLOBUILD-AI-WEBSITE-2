import Link from "next/link";
import SignupFlow from "./SignupFlow";

export const metadata = {
  title: "Sign Up — SoloBuildAI",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <SignupFlow />
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 text-center">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} SoloBuildAI ·{" "}
          <Link
            href="/legal/privacy"
            className="hover:text-white/60 transition-colors"
          >
            Privacy
          </Link>
          {" · "}
          <Link
            href="/legal/terms"
            className="hover:text-white/60 transition-colors"
          >
            Terms
          </Link>
        </p>
      </footer>
    </div>
  );
}
