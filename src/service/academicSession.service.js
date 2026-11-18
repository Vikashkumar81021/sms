import prisma from "../config/db.js";

import {
  NotFoundError,
  ConflictError,
  BadRequestError,
} from "../utils/error.js";

const createAcademicSession = async (data) => {
  try {
    const { schoolId, ...sessionData } = data;

    if (sessionData.endDate <= sessionData.startDate) {
      throw new BadRequestError(
        "End date must be greater than start date"
      );
    }

    const session = await prisma.academicSession.create({
      data: {
        ...sessionData,
        school: {
          connect: { id: schoolId },
        },
      },
    });

    return session;
  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError(
        "Session name already exists for this school"
      );
    }

    if (error.code === "P2003") {
      throw new NotFoundError("School not found");
    }

    throw error;
  }
};

const getAllAcademicSessions = async () => {
  return await prisma.academicSession.findMany({
    include: {
      school: {
        select: {
          id: true,
          schoolName: true,
          schoolCode: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAcademicSessionById = async (id) => {
  const session = await prisma.academicSession.findUnique({
    where: { id },
    include: {
      school: {
        select: {
          id: true,
          schoolName: true,
          schoolCode: true,
        },
      },
    },
  });

  if (!session) {
    throw new NotFoundError("Academic session not found");
  }

  return session;
};

const updateAcademicSession = async (id, data) => {
  try {
    const existingSession = await prisma.academicSession.findUnique({
      where: { id },
    });

    if (!existingSession) {
      throw new NotFoundError("Academic session not found");
    }

    const startDate = data.startDate ?? existingSession.startDate;
    const endDate = data.endDate ?? existingSession.endDate;

    if (endDate <= startDate) {
      throw new BadRequestError(
        "End date must be greater than start date"
      );
    }

    return await prisma.academicSession.update({
      where: { id },
      data,
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError(
        "Session name already exists for this school"
      );
    }

    throw error;
  }
};

const deleteAcademicSession = async (id) => {
  const existingSession = await prisma.academicSession.findUnique({
    where: { id },
  });

  if (!existingSession) {
    throw new NotFoundError("Academic session not found");
  }

  await prisma.academicSession.delete({
    where: { id },
  });

  return true;
};

export {
  createAcademicSession,
  getAllAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
};