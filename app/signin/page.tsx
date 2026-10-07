import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In — SoloBuildAI",
};

export default function SigninPage() {
  redirect("/");
}
