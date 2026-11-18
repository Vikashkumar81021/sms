import express from "express";

import {
  createSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
  updateSubjectController,
  deleteSubjectController,
} from "../controller/subject.controller.js";

const router = express.Router();

router.post("/createsubject", createSubjectController);

router.get("/fetchallsubject", getAllSubjectsController);

router.get("/fetchsubject/:id", getSubjectByIdController);

router.patch("/updatesubject/:id", updateSubjectController);

router.delete("/deletesubject/:id", deleteSubjectController);

export default router;