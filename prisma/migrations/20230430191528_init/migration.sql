/*
  Warnings:

  - You are about to drop the column `paymentIntendId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentIntentID]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_paymentIntendId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentIntendId",
DROP COLUMN "state",
ADD COLUMN     "paymentIntentID" TEXT,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentIntentID_key" ON "Order"("paymentIntentID");
