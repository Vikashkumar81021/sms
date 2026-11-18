import prisma from "../config/db.js";

import {
  NotFoundError,
  ConflictError,
  BadRequestError,
} from "../utils/error.js";

// const createSubject = async (data) => {
//   try {
//     const { schoolId, classIds, ...subjectData } = data;


//     const school = await prisma.school.findUnique({
//       where: { id: schoolId },
//     });


//     if (!school) {
//       throw new NotFoundError("School not found");
//     }

//    const uniqueClassIds = [...new Set(classIds)];

//     const classes = await prisma.schoolClass.findMany({
//       where: {
//          id: {
//       in: classIds,
//     },
//         schoolId,
//       },
//       select: {
//         id: true,
//       },
//     });

//     if (classes.length !== uniqueClassIds.length) {
//       throw new BadRequestError(
//         "One or more classes are invalid or do not belong to this school"
//       );
//     }

//     const subject = await prisma.subject.create({
//       data: {
//         ...subjectData,

//         school: {
//           connect: { id: schoolId },
//         },

//         classMappings: {
//           create: uniqueClassIds.map((classId) => ({
//             schoolClass: {
//               connect: { id: classId },
//             },
//           })),
//         },
//       },

//       include: {
//         school: {
//           select: {
//             id: true,
//             schoolName: true,
//           },
//         },

//         classMappings: {
//           include: {
//             schoolClass: {
//               select: {
//                 id: true,
//                 className: true,
//                 classCode: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return subject;
//   } catch (error) {
//     if (error.code === "P2002") {
//       throw new ConflictError(
//         "Subject name or code already exists in this school"
//       );
//     }

//     if (error.code === "P2003") {
//       throw new NotFoundError("School or Class not found");
//     }

//     throw error;
//   }
// };

const createSubject = async (data) => {
  try {
    const { schoolId, classIds, ...subjectData } = data;

    // Validate classIds
    if (!Array.isArray(classIds) || classIds.length === 0) {
      throw new BadRequestError("At least one class is required");
    }

    // Remove duplicate class IDs
    const uniqueClassIds = [...new Set(classIds)];

    // School and Classes validation (Parallel Queries)
    const [school, classes] = await Promise.all([
      prisma.school.findUnique({
        where: { id: schoolId },
        select: { id: true },
      }),

      prisma.schoolClass.findMany({
        where: {
          id: {
            in: uniqueClassIds,
          },
          schoolId,
        },
        select: {
          id: true,
        },
      }),
    ]);

    // Validate School
    if (!school) {
      throw new NotFoundError("School not found");
    }

    // Validate Classes
    if (classes.length !== uniqueClassIds.length) {
      throw new BadRequestError(
        "One or more classes are invalid or do not belong to this school"
      );
    }

    // Create Subject with Class Mappings
    const subject = await prisma.subject.create({
      data: {
        ...subjectData,

        school: {
          connect: { id: schoolId },
        },

        classMappings: {
          create: uniqueClassIds.map((classId) => ({
            schoolClass: {
              connect: { id: classId },
            },
          })),
        },
      },

      include: {
        school: {
          select: {
            id: true,
            schoolName: true,
          },
        },

        classMappings: {
          include: {
            schoolClass: {
              select: {
                id: true,
                className: true,
                classCode: true,
              },
            },
          },
        },
      },
    });

    return subject;

  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError(
        "Subject name or code already exists in this school"
      );
    }

    if (error.code === "P2003") {
      throw new NotFoundError("School or Class not found");
    }

    throw error;
  }
};
const getAllSubjects = async () => {
  return await prisma.subject.findMany({
    include: {
      school: {
        select: {
          id: true,
          schoolName: true,
        },
      },

      classMappings: {
        include: {
          schoolClass: {
            select: {
              id: true,
              className: true,
              classCode: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSubjectById = async (id) => {
  const subject = await prisma.subject.findUnique({
    where: { id },

    include: {
      school: {
        select: {
          id: true,
          schoolName: true,
        },
      },

      classMappings: {
        include: {
          schoolClass: {
            select: {
              id: true,
              className: true,
              classCode: true,
            },
          },
        },
      },
    },
  });

  if (!subject) {
    throw new NotFoundError("Subject not found");
  }

  return subject;
};

const updateSubject = async (id, data) => {
  try {
    const { classIds, ...subjectData } = data;

    const existingSubject = await prisma.subject.findUnique({
      where: { id },
    });

    if (!existingSubject) {
      throw new NotFoundError("Subject not found");
    }

    if (classIds !== undefined) {
      const uniqueClassIds = [...new Set(classIds)];

      const classes = await prisma.schoolClass.findMany({
        where: {
          id: { in: uniqueClassIds },
          schoolId: existingSubject.schoolId,
        },
        select: {
          id: true,
        },
      });

      if (classes.length !== uniqueClassIds.length) {
        throw new BadRequestError(
          "One or more classes are invalid or do not belong to this school"
        );
      }

      subjectData.classMappings = {
        deleteMany: {},
        create: uniqueClassIds.map((classId) => ({
          schoolClass: {
            connect: { id: classId },
          },
        })),
      };
    }

    return await prisma.subject.update({
      where: { id },

      data: subjectData,

      include: {
        school: {
          select: {
            id: true,
            schoolName: true,
          },
        },

        classMappings: {
          include: {
            schoolClass: {
              select: {
                id: true,
                className: true,
                classCode: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError(
        "Subject name or code already exists in this school"
      );
    }

    throw error;
  }
};

const deleteSubject = async (id) => {
  const existingSubject = await prisma.subject.findUnique({
    where: { id },
  });

  if (!existingSubject) {
    throw new NotFoundError("Subject not found");
  }

  await prisma.subject.delete({
    where: { id },
  });

  return true;
};

export {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};