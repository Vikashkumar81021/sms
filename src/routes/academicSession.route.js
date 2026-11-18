import express from "express";
import {
  createAcademicSessionController,
  getAllAcademicSessionsController,
  getAcademicSessionByIdController,
  updateAcademicSessionController,
  deleteAcademicSessionController,
} from "../controller/academicSession.controller.js";
const router = express.Router();

router.post("/createsession", createAcademicSessionController);

router.get("/fetchallsession", getAllAcademicSessionsController);

router.get("/fetchsession/:id", getAcademicSessionByIdController);

router.patch("/updatesession/:id", updateAcademicSessionController);

router.delete("/deletesession/:id", deleteAcademicSessionController);

export default router;