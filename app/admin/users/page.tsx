import { prisma } from "@/lib/prisma";
import UsersTable from "./UsersTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { createdAt: "desc" },
  });

  const serialised = users.map((u) => ({
    ...u,
    password: undefined,
    createdAt: u.createdAt.toISOString(),
    approved: u.approved,
  }));

  return (
    <div>
      <div className="section-header mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
          Users
        </h1>
        <p style={{ color: "var(--muted)" }}>
          {users.length} registered user{users.length !== 1 ? "s" : ""}
        </p>
      </div>
      <UsersTable users={serialised} />
    </div>
  );
}
