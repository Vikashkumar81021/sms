import { asyncHandler } from "../utils/asyncHandler.js";

import {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} from "../service/school.service.js";

const createSchoolController = asyncHandler(async (req, res) => {
  const school = await createSchool(req.body);

  res.status(201).json({
    success: true,
    message: "School created successfully",
    data: school,
  });
});

const getAllSchoolsController = asyncHandler(async (req, res) => {
  const schools = await getAllSchools();

  res.status(200).json({
    success: true,
    message: "Schools fetched successfully",
    total: schools.length,
    data: schools,
  });
});
const getSchoolByIdController = asyncHandler(async (req, res) => {
  const school = await getSchoolById(Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "School fetched successfully",
    data: school,
  });
});

const updateSchoolController = asyncHandler(async (req, res) => {
  const school = await updateSchool(Number(req.params.id), req.body);

  res.status(200).json({
    success: true,
    message: "School updated successfully",
    data: school,
  });
});

const deleteSchoolController = asyncHandler(async (req, res) => {
  await deleteSchool(Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "School deleted successfully",
  });
});

export {
  createSchoolController,
  getAllSchoolsController,
  getSchoolByIdController,
  updateSchoolController,
  deleteSchoolController,
};