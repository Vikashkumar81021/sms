import { asyncHandler } from "../utils/asyncHandler.js";

import {
  createAcademicSession,
  getAllAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
} from "../service/academicSession.service.js";
import { STATUS_CODE } from "../constant/status.code.js";

const createAcademicSessionController = asyncHandler(async (req, res) => {
  const session = await createAcademicSession(req.body);

  res.status(STATUS_CODE.CREATED).json({
    success: true,
    message: "Academic session created successfully",
    data: session,
  });
});

const getAllAcademicSessionsController = asyncHandler(async (req, res) => {
  const sessions = await getAllAcademicSessions();

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Academic sessions fetched successfully",
    total: sessions.length,
    data: sessions,
  });
});

const getAcademicSessionByIdController = asyncHandler(async (req, res) => {
  const session = await getAcademicSessionById(
    Number(req.params.id)
  );

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Academic session fetched successfully",
    data: session,
  });
});

const updateAcademicSessionController = asyncHandler(async (req, res) => {
  const session = await updateAcademicSession(
    Number(req.params.id),
    req.body
  );

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Academic session updated successfully",
    data: session,
  });
});

const deleteAcademicSessionController = asyncHandler(async (req, res) => {
  await deleteAcademicSession(Number(req.params.id));

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Academic session deleted successfully",
  });
});

export {
  createAcademicSessionController,
  getAllAcademicSessionsController,
  getAcademicSessionByIdController,
  updateAcademicSessionController,
  deleteAcademicSessionController,
};