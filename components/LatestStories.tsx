"use client";
import { useState } from "react";
import MagazineGrid from "@/components/MagazineGrid";

type Post = {
  id: string;
  title: string;
  slug: string;
  type: string;
  summary: string;
  imageUrl?: string | null;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  author: { name: string; organisation: string; orgType: string };
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "news", label: "News" },
  { value: "press_release", label: "Press Releases" },
  { value: "event", label: "Events" },
];

export default function LatestStories({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.type === active);

  const counts = {
    all: posts.length,
    news: posts.filter((p) => p.type === "news").length,
    press_release: posts.filter((p) => p.type === "press_release").length,
    event: posts.filter((p) => p.type === "event").length,
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-7 border-b" style={{ borderColor: "var(--border)" }}>
        {FILTERS.map((f) => {
          const count = counts[f.value as keyof typeof counts];
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className="px-4 py-2.5 text-sm font-medium bg-transparent border-none cursor-pointer transition-colors flex items-center gap-2"
              style={{
                color: isActive ? "var(--navy)" : "var(--muted)",
                borderBottom: isActive ? "2px solid var(--gold)" : "2px solid transparent",
                marginBottom: "-1px",
                fontFamily: "inherit",
              }}
            >
              {f.label}
              {count > 0 && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: isActive ? "var(--gold)" : "var(--border)",
                    color: isActive ? "#fff" : "var(--muted)",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <MagazineGrid posts={filtered} />
      ) : (
        <div className="text-center py-16" style={{ color: "var(--muted)" }}>
          No {FILTERS.find((f) => f.value === active)?.label.toLowerCase()} posts yet.
        </div>
      )}
    </div>
  );
}
