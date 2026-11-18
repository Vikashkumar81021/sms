import { asyncHandler } from "../utils/asyncHandler.js";

import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../service/subject.service.js";
import { STATUS_CODE } from "../constant/status.code.js";

const createSubjectController = asyncHandler(async (req, res) => {
  const result = await createSubject(req.body);

  res.status(STATUS_CODE.CREATED).json({
    success: true,
    message: "Subject created successfully",
    data: result,
  });
});

const getAllSubjectsController = asyncHandler(async (req, res) => {
  const result = await getAllSubjects();

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Subjects fetched successfully",
    data: result,
  });
});

const getSubjectByIdController = asyncHandler(async (req, res) => {
  const result = await getSubjectById(Number(req.params.id));

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Subject fetched successfully",
    data: result,
  });
});

const updateSubjectController = asyncHandler(async (req, res) => {
  const result = await updateSubject(
    Number(req.params.id),
    req.body
  );

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Subject updated successfully",
    data: result,
  });
});

const deleteSubjectController = asyncHandler(async (req, res) => {
  await deleteSubject(Number(req.params.id));

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Subject deleted successfully",
  });
});

export {
  createSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
  updateSubjectController,
  deleteSubjectController,
};