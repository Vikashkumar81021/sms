import express from "express";

import {
  createSectionController,
  getAllSectionsController,
  getSectionByIdController,
  updateSectionController,
  deleteSectionController,
} from "../controller/section.controller.js";

const router = express.Router();

router.post("/createsection", createSectionController);

router.get("/fetchallsection", getAllSectionsController);

router.get("/fetchsection/:id", getSectionByIdController);

router.patch("/updatesection/:id", updateSectionController);

  router.delete("/deletesection/:id",  deleteSectionController);

export default router;