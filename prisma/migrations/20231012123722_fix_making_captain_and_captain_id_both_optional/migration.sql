-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_captain_id_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `captain_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_captain_id_fkey` FOREIGN KEY (`captain_id`) REFERENCES `Captain`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
