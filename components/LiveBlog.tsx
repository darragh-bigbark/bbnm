"use client";
import { useState, useEffect, useCallback } from "react";

type LiveEntry = {
  id: string;
  heading: string | null;
  content: string;
  createdAt: string;
};

type Props = {
  postId: string;
  liveEnded: boolean;
  initialEntries: LiveEntry[];
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function LiveBlog({ postId, liveEnded, initialEntries }: Props) {
  const [entries, setEntries] = useState<LiveEntry[]>(initialEntries);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch(`/api/live-entries/${postId}`, { cache: "no-store" });
      if (!res.ok) return;
      const data: LiveEntry[] = await res.json();

      // Detect new entries
      const existingIds = new Set(entries.map((e) => e.id));
      const freshIds = data.filter((e) => !existingIds.has(e.id)).map((e) => e.id);

      if (freshIds.length > 0) {
        setEntries(data);
        setNewIds(new Set(freshIds));
        setLastUpdated(new Date());
        // Remove highlight after 5 seconds
        setTimeout(() => setNewIds(new Set()), 5000);
      }
    } catch {
      // silently ignore fetch errors
    }
  }, [postId, entries]);

  useEffect(() => {
    if (liveEnded) return;
    const interval = setInterval(fetchEntries, 30000);
    return () => clearInterval(interval);
  }, [liveEnded, fetchEntries]);

  return (
    <div style={{ marginTop: "2rem" }}>
      {/* Live header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: liveEnded ? "#f3f4f6" : "#fee2e2",
            border: `1px solid ${liveEnded ? "var(--border)" : "#fca5a5"}`,
            borderRadius: "999px",
            padding: "0.3rem 0.85rem",
          }}
        >
          {!liveEnded && (
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#dc2626",
                animation: "livePulse 1.5s infinite",
              }}
            />
          )}
          <span
            style={{
              fontWeight: 800,
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: liveEnded ? "var(--muted)" : "#dc2626",
            }}
          >
            {liveEnded ? "Live Blog Ended" : "Live"}
          </span>
        </div>

        {!liveEnded && (
          <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            Updates every 30 seconds · Last checked{" "}
            {lastUpdated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}

        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.78rem",
            color: "var(--muted)",
          }}
        >
          {entries.length} {entries.length === 1 ? "update" : "updates"}
        </span>
      </div>

      {entries.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "var(--muted)",
            border: "1px dashed var(--border)",
            borderRadius: "0.75rem",
          }}
        >
          <p className="text-sm">No updates yet. Check back soon.</p>
        </div>
      ) : (
        <div
          style={{
            borderLeft: "3px solid var(--gold)",
            paddingLeft: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {entries.map((entry) => {
            const isNew = newIds.has(entry.id);
            return (
              <div
                key={entry.id}
                style={{
                  position: "relative",
                  paddingBottom: "1.75rem",
                  transition: "background 0.5s",
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.6rem",
                    top: "0.2rem",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: isNew ? "#dc2626" : "var(--gold)",
                    border: "2px solid var(--cream)",
                    transition: "background 1s",
                  }}
                />

                <div
                  style={{
                    background: isNew ? "rgba(239,68,68,0.04)" : "transparent",
                    borderRadius: "0.6rem",
                    padding: isNew ? "0.75rem" : "0",
                    transition: "background 1s, padding 0.3s",
                  }}
                >
                  {/* Timestamp */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.4rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        color: "var(--navy)",
                        fontFamily: "monospace",
                      }}
                    >
                      {formatTime(entry.createdAt)}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                      {formatDateShort(entry.createdAt)}
                    </span>
                    {isNew && (
                      <span
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          letterSpacing: "0.05em",
                          padding: "0.1rem 0.5rem",
                          borderRadius: "999px",
                          textTransform: "uppercase",
                        }}
                      >
                        New
                      </span>
                    )}
                  </div>

                  {/* Heading */}
                  {entry.heading && (
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--navy)",
                        marginBottom: "0.4rem",
                        lineHeight: 1.35,
                      }}
                    >
                      {entry.heading}
                    </p>
                  )}

                  {/* Content */}
                  <div
                    className="prose"
                    style={{ fontSize: "0.9rem", color: "var(--text)" }}
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
