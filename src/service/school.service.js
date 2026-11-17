import prisma from "../config/db.js";

import {
  NotFoundError,
  ConflictError,
} from "../utils/error.js";

const createSchool = async (data) => {
  try {
    const school = await prisma.school.create({
      data: {
        schoolName: data.schoolName,
        schoolCode: data.schoolCode,
        address: data.address,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
        contactNumber: data.contactNumber,
        email: data.email,
        affiliationBoard: data.affiliationBoard,
      },
    });

    return school;

  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError("School code or email already exists");
    }

    throw error;
  }
};

const getAllSchools = async () => {
  const schools = await prisma.school.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return schools;
};

const getSchoolById = async (id) => {
  const school = await prisma.school.findUnique({
    where: {
      id,
    },
  });

  if (!school) {
    throw new NotFoundError("School not found");
  }

  return school;
};

const updateSchool = async (id, data) => {
  try {
    const existingSchool = await prisma.school.findUnique({
      where: { id },
    });

    if (!existingSchool) {
      throw new NotFoundError("School not found");
    }

    const updatedSchool = await prisma.school.update({
      where: { id },
      data,
    });

    return updatedSchool;

  } catch (error) {
    if (error.code === "P2002") {
      throw new ConflictError("School code or email already exists");
    }

    throw error;
  }
};

const deleteSchool = async (id) => {
  const existingSchool = await prisma.school.findUnique({
    where: { id },
  });

  if (!existingSchool) {
    throw new NotFoundError("School not found");
  }

  await prisma.school.delete({
    where: { id },
  });

  return true;
};


export {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};