import Link from "next/link";
import SigninFlow from "./SigninFlow";
import BrandLogo from "@/components/layout/BrandLogo";

export const metadata = {
  title: "Sign In — SoloBuildAI",
};

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl px-8 py-10">
          <div className="flex justify-center mb-8">
            <BrandLogo />
          </div>
          <SigninFlow />
        </div>
      </main>

      <footer className="px-6 py-5 text-center">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} SoloBuildAI ·{" "}
          <Link href="/legal/privacy" className="hover:text-white/60 transition-colors">
            Privacy
          </Link>
          {" · "}
          <Link href="/legal/terms" className="hover:text-white/60 transition-colors">
            Terms
          </Link>
        </p>
      </footer>
    </div>
  );
}
