import express from "express";

import {
  createSchoolController,
  getAllSchoolsController,
  getSchoolByIdController,
  updateSchoolController,
  deleteSchoolController,
} from "../controller/school.controller.js";

const router = express.Router();

router.post("/createschool", createSchoolController);
router.get("/fetchallschool", getAllSchoolsController);
router.get("/fetchschool/:id", getSchoolByIdController);
router.patch("/updateschool/:id", updateSchoolController);
router.delete("/deleteschool/:id", deleteSchoolController);

export default router;