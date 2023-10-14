/*
  Warnings:

  - Made the column `customer_latitude` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customer_longitude` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "customer_latitude" SET NOT NULL,
ALTER COLUMN "customer_longitude" SET NOT NULL;
