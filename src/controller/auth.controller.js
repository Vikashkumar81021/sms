import { STATUS_CODE } from "../constant/status.code.js";
import {
  registerUser,
  loginUser,
} from "../service/auth.service.js";

import {asyncHandler} from "../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
};

const register = asyncHandler(async (req, res) => {

  const { userName, email, password, phone } = req.body;

  const user = await registerUser(
    userName,
    email,
    password,
    phone
  );

  res.status(STATUS_CODE.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });

});

const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.cookie("accessToken", result.accessToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Login successfully",
    data: result.user,
  });

});


const userlogout = asyncHandler(async (req, res) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });

});

export{
    register,
    login,
    userlogout,
};
