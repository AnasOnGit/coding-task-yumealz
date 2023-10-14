/*
  Warnings:

  - You are about to drop the column `customer_latitude` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customer_longitude` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "customer_latitude" DOUBLE PRECISION,
ADD COLUMN     "customer_longitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customer_latitude",
DROP COLUMN "customer_longitude",
DROP COLUMN "price";
