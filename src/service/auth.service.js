import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  BadRequestError,
  UnAuthorizedError,
} from "../utils/error.js";

const registerUser = async (userName, email, password, phone) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new BadRequestError("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      userName,
      email,
      password: hashedPassword,
      phone,
    },
    select: {
      id: true,
      userName: true,
      email: true,
      role: true,
      phone: true,
      status: true,
      isEmailVerified: true,
      createdAt: true,
    },
  });

  return user;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnAuthorizedError("Invalid email or password");
  }

  if (user.status !== "ACTIVE") {
    throw new UnAuthorizedError("Your account is inactive");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new UnAuthorizedError("Invalid email or password");
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  return {
    accessToken,
    user: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

export {
  registerUser,
  loginUser,
};
