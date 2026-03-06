import { prisma } from "@/lib/prisma";
import SubscribersTable from "./SubscribersTable";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialised = subscribers.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));

  const confirmed = subscribers.filter((s) => s.confirmed).length;

  return (
    <div>
      <div className="section-header mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
          Subscribers
        </h1>
        <p style={{ color: "var(--muted)" }}>
          {confirmed} confirmed · {subscribers.length - confirmed} unconfirmed
        </p>
      </div>
      <SubscribersTable subscribers={serialised} />
    </div>
  );
}
