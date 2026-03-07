import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;
  if (!session || user?.role !== "admin") redirect("/");

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-w-0 p-8" style={{ background: "var(--cream)" }}>
        {children}
      </div>
    </div>
  );
}
