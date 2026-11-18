import { asyncHandler } from "../utils/asyncHandler.js";

import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../service/class.service.js";
import { STATUS_CODE } from "../constant/status.code.js";

const createClassController = asyncHandler(async (req, res) => {
  const result = await createClass(req.body);

  res.status(STATUS_CODE.CREATED).json({
    success: true,
    message: "Class created successfully",
    data: result,
  });
});

const getAllClassesController = asyncHandler(async (req, res) => {
  const result = await getAllClasses();

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Classes fetched successfully",
    data: result,
  });
});

const getClassByIdController = asyncHandler(async (req, res) => {
  const result = await getClassById(Number(req.params.id));

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Class fetched successfully",
    data: result,
  });
});

const updateClassController = asyncHandler(async (req, res) => {
  const result = await updateClass(
    Number(req.params.id),
    req.body
  );

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Class updated successfully",
    data: result,
  });
});

const deleteClassController = asyncHandler(async (req, res) => {
  await deleteClass(Number(req.params.id));

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Class deleted successfully",
  });
});

export {
  createClassController,
  getAllClassesController,
  getClassByIdController,
  updateClassController,
  deleteClassController,
};