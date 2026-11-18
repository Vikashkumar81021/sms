import { asyncHandler } from "../utils/asyncHandler.js";

import {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
} from "../service/section.service.js";
import { STATUS_CODE } from "../constant/status.code.js";

const createSectionController = asyncHandler(async (req, res) => {
  const result = await createSection(req.body);

  res.status(STATUS_CODE.CREATED).json({
    success: true,
    message: "Section created successfully",
    data: result,
  });
});

const getAllSectionsController = asyncHandler(async (req, res) => {
  const result = await getAllSections();

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Sections fetched successfully",
    data: result,
  });
});

const getSectionByIdController = asyncHandler(async (req, res) => {
  const result = await getSectionById(Number(req.params.id));

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Section fetched successfully",
    data: result,
  });
});

const updateSectionController = asyncHandler(async (req, res) => {
  const result = await updateSection(
    Number(req.params.id),
    req.body
  );

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Section updated successfully",
    data: result,
  });
});

const deleteSectionController = asyncHandler(async (req, res) => {
  await deleteSection(Number(req.params.id));

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Section deleted successfully",
  });
});

export {
  createSectionController,
  getAllSectionsController,
  getSectionByIdController,
  updateSectionController,
  deleteSectionController,
};