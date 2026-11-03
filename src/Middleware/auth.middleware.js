import jwt from "jsonwebtoken";

import { UnAuthorizedError } from "../utils/error.js";

import { ERROR_MESSAGE } from "../constant/error.message.js";


const authMiddleware = (req, res, next) => {

  try {

    const token = req.cookies?.accessToken;

    if (!token) {
      throw new UnAuthorizedError(ERROR_MESSAGE.UNAUTHORISED);
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);

    req.user = decoded;

    next();

  } catch (error) {

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(new UnAuthorizedError("Invalid or expired token"));
    }

    next(error);
  }
};

export default authMiddleware;
