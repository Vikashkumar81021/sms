import express from "express";

import {
  createClassController,
  getAllClassesController,
  getClassByIdController,
  updateClassController,
  deleteClassController,
} from "../controller/class.controller.js";

const router = express.Router();

router.post("/createclass", createClassController);

router.get("/fetchallclass", getAllClassesController);

router.get("/fetchclass/:id", getClassByIdController);

router.patch("/updateclass/:id", updateClassController);

router.delete("/deleteclass/:id", deleteClassController);

export default router;