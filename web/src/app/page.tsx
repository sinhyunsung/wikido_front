import { redirect } from "next/navigation";

/**
 * Root redirect. Once auth lands (Implementation.md §1) this will branch:
 * unauthenticated → /login, authenticated → /dashboard.
 */
export default function RootPage() {
  redirect("/dashboard");
}
