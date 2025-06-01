-- CreateTable
CREATE TABLE `UserWords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `word_id` INTEGER NOT NULL,
    `saved` BOOLEAN NOT NULL DEFAULT false,
    `learned` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `UserWords_user_id_word_id_key`(`user_id`, `word_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserWords` ADD CONSTRAINT `UserWords_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserWords` ADD CONSTRAINT `UserWords_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `Words`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
