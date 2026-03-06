import { prisma } from "@/lib/prisma";
import PostsTable from "./PostsTable";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { createdAt: "desc" },
  });

  const serialised = posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    publishedAt: p.publishedAt?.toISOString() ?? null,
  }));

  return (
    <div>
      <div className="section-header mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
          Posts
        </h1>
        <p style={{ color: "var(--muted)" }}>{posts.length} total submissions</p>
      </div>
      <PostsTable posts={serialised} />
    </div>
  );
}
