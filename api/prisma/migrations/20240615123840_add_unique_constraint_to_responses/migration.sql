/*
  Warnings:

  - A unique constraint covering the columns `[choiceId,respondentId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Response_choiceId_respondentId_key" ON "Response"("choiceId", "respondentId");
