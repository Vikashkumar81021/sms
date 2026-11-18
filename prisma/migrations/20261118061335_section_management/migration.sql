-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "sectionName" TEXT NOT NULL,
    "classTeacher" TEXT,
    "roomNumber" TEXT,
    "studentCapacity" INTEGER NOT NULL DEFAULT 40,
    "classId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Section_classId_idx" ON "Section"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Section_classId_sectionName_key" ON "Section"("classId", "sectionName");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_classId_fkey" FOREIGN KEY ("classId") REFERENCES "SchoolClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
