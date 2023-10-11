/*
  Warnings:

  - You are about to drop the column `customer_phone_number` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `order_at` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `order_number` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `order_status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- DropIndex
DROP INDEX `Order_order_number_key` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `customer_phone_number`,
    DROP COLUMN `order_at`,
    DROP COLUMN `order_number`,
    MODIFY `order_status` BOOLEAN NOT NULL;
