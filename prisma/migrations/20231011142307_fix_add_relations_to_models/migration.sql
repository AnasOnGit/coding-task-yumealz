/*
  Warnings:

  - You are about to drop the `captains` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `captainstatistics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `captains`;

-- DropTable
DROP TABLE `captainstatistics`;

-- DropTable
DROP TABLE `orders`;

-- CreateTable
CREATE TABLE `Captain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `joining_date` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Captain_email_key`(`email`),
    UNIQUE INDEX `Captain_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaptainStatistic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `captain_id` INTEGER NOT NULL,
    `total_distance_traveled` DOUBLE NOT NULL,
    `total_orders_delivered` INTEGER NOT NULL,
    `total_orders_canceled` INTEGER NOT NULL,
    `total_orders_rejected` INTEGER NOT NULL,
    `total_orders_accepted` INTEGER NOT NULL,
    `total_rating` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_number` VARCHAR(191) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `customer_phone_number` VARCHAR(191) NOT NULL,
    `customer_longitude` DOUBLE NOT NULL,
    `customer_latitude` DOUBLE NOT NULL,
    `order_status` VARCHAR(191) NOT NULL,
    `captain_id` INTEGER NOT NULL,
    `delivered_at` DATETIME(3) NOT NULL,
    `order_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Order_order_number_key`(`order_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CaptainAttributes` ADD CONSTRAINT `CaptainAttributes_captain_id_fkey` FOREIGN KEY (`captain_id`) REFERENCES `Captain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaptainStatistic` ADD CONSTRAINT `CaptainStatistic_captain_id_fkey` FOREIGN KEY (`captain_id`) REFERENCES `Captain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_captain_id_fkey` FOREIGN KEY (`captain_id`) REFERENCES `Captain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
