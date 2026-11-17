import express from "express";

import {
  createSchoolController,
  getAllSchoolsController,
  getSchoolByIdController,
  updateSchoolController,
  deleteSchoolController,
} from "../controller/school.controller.js";

const router = express.Router();

router.post("/create", createSchoolController);
router.get("/fetch", getAllSchoolsController);
router.get("/:id", getSchoolByIdController);
router.patch("/:id", updateSchoolController);
router.delete("/:id", deleteSchoolController);

export default router;