/*
  Warnings:

  - You are about to drop the column `tl` on the `Words` table. All the data in the column will be lost.
  - You are about to alter the column `syntactic` on the `Words` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Words` DROP COLUMN `tl`,
    MODIFY `syntactic` ENUM('noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection') NOT NULL;
