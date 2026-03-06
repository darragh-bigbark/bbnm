import { config } from "dotenv";
config();

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@bigbarknews.com";
  const password = process.env.ADMIN_PASSWORD || "Admin1234!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin user already exists");
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: hashed,
      organisation: "Big Bark News & Media",
      orgType: "business",
      role: "admin",
    },
  });
  console.log(`Admin user created: ${email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
