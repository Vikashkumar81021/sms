import { BadRequestError } from "../../../pentagon-ERP/src/utils/error.js";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";

const regsiterUser = async (userName, email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    throw new BadRequestError("User already Exists");
  }
};
