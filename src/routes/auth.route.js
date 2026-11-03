import express from "express";

import {
  register,
  login,
  userlogout,
} from "../controller/auth.controller.js";

import authMiddleware from "../Middleware/auth.middleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, userlogout);
export default router;
