"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function DashboardIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function PostsIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/admin/posts", label: "Posts", icon: <PostsIcon /> },
  { href: "/admin/users", label: "Users", icon: <UsersIcon /> },
  { href: "/admin/subscribers", label: "Subscribers", icon: <MailIcon /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 shrink-0 flex flex-col sticky top-[108px] overflow-y-auto"
      style={{ background: "var(--navy)", height: "calc(100vh - 108px)" }}
    >
      <div className="px-5 py-5 border-b border-white/10">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--gold)" }}>
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all no-underline"
              style={{
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                background: active ? "rgba(244,161,53,0.18)" : "transparent",
                borderLeft: `3px solid ${active ? "var(--gold)" : "transparent"}`,
              }}
            >
              <span style={{ opacity: active ? 1 : 0.65 }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 border-t border-white/10 flex flex-col gap-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-colors"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          <ExternalIcon />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-transparent border-none cursor-pointer text-left w-full"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "inherit" }}
        >
          <SignOutIcon />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
