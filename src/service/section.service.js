import prisma from "../config/db.js";

import {
  NotFoundError,
  ConflictError,
} from "../utils/error.js";

const createSection = async (data) => {
  try {
    const { classId, ...sectionData } = data;

    return await prisma.section.create({
      data: {
        ...sectionData,
        schoolClass: {
          connect: {
            id: classId,
          },
        },
      },
      include: {
        schoolClass: {
          select: {
            id: true,
            className: true,
            classCode: true,
          },
        },
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError(
        "Section already exists in this class"
      );
    }

    if (error.code === "P2003") {
      throw new NotFoundError("Class not found");
    }

    throw error;
  }
};

const getAllSections = async () => {
  return await prisma.section.findMany({
    // include: {
    //   schoolClass: {
    //     select: {
    //       id: true,
    //       className: true,
    //       classCode: true,
    //     },
    //   },
    // },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSectionById = async (id) => {
  const section = await prisma.section.findUnique({
    where: { id },
    include: {
      schoolClass: {
        select: {
          id: true,
          className: true,
          classCode: true,
        },
      },
    },
  });

  if (!section) {
    throw new NotFoundError("Section not found");
  }

  return section;
};

const updateSection = async (id, data) => {
  try {
    const existingSection = await prisma.section.findUnique({
      where: { id },
    });

    if (!existingSection) {
      throw new NotFoundError("Section not found");
    }

    return await prisma.section.update({
      where: { id },
      data,
      include: {
        schoolClass: {
          select: {
            id: true,
            className: true,
            classCode: true,
          },
        },
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError(
        "Section name already exists in this class"
      );
    }

    throw error;
  }
};

const deleteSection = async (id) => {
  const existingSection = await prisma.section.findUnique({
    where: { id },
  });

  if (!existingSection) {
    throw new NotFoundError("Section not found");
  }

  await prisma.section.delete({
    where: { id },
  });

  return true;
};

export {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
};