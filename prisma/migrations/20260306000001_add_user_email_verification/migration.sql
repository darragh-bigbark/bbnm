-- AlterTable: add emailVerified (default 1 so existing users are already verified)
ALTER TABLE "User" ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT 1;
ALTER TABLE "User" ADD COLUMN "emailVerifyToken" TEXT;
CREATE UNIQUE INDEX "User_emailVerifyToken_key" ON "User"("emailVerifyToken");
