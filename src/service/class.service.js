import prisma from "../config/db.js";

import {
  NotFoundError,
  ConflictError,
} from "../utils/error.js";

const createClass = async (data) => {
  try {
    const { schoolId, ...classData } = data;

    return await prisma.schoolClass.create({
      data: {
        ...classData,
        school: {
          connect: { id: schoolId },
        },
      },
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
  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError(
        "Class name or code already exists in this school"
      );
    }

    if (error.code === "P2003") {
      throw new NotFoundError("School not found");
    }

    throw error;
  }
};

const getAllClasses = async () => {
  return await prisma.schoolClass.findMany({
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
      displayOrder: "asc",
    },
  });
};

const getClassById = async (id) => {
  const classData = await prisma.schoolClass.findUnique({
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

  if (!classData) {
    throw new NotFoundError("Class not found");
  }

  return classData;
};

const updateClass = async (id, data) => {
  try {
    const existingClass = await prisma.schoolClass.findUnique({
      where: { id },
    });

    if (!existingClass) {
      throw new NotFoundError("Class not found");
    }

    return await prisma.schoolClass.update({
      where: { id },
      data,
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
  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError(
        "Class name or code already exists in this school"
      );
    }

    throw error;
  }
};

const deleteClass = async (id) => {
  const existingClass = await prisma.schoolClass.findUnique({
    where: { id },
  });

  if (!existingClass) {
    throw new NotFoundError("Class not found");
  }

  await prisma.schoolClass.delete({
    where: { id },
  });

  return true;
};

export {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};