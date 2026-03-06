import Link from "next/link";
import PostEditor from "../PostEditor";

export const metadata = {
  title: "New Post | Admin",
};

export default function NewPostPage() {
  return (
    <div>
      <div className="section-header mb-8">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
              New Post
            </h1>
            <p style={{ color: "var(--muted)" }}>Create and publish a post directly</p>
          </div>
          <Link href="/admin/posts" className="btn-outline" style={{ marginLeft: "auto" }}>
            ← Back to Posts
          </Link>
        </div>
      </div>
      <PostEditor />
    </div>
  );
}
