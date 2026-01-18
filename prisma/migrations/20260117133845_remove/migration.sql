/*
  Warnings:

  - You are about to drop the `GitHubCache` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GitHubCache" DROP CONSTRAINT "GitHubCache_userId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "GitHubCache";
