import jwt from "jsonwebtoken";
import { UnAuthorizedError } from "../../../pentagon-ERP/src/utils/error.js";
import { ERROR_MESSAGE } from "../../../pentagon-ERP/src/constants/error.message.js";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new UnAuthorizedError(ERROR_MESSAGE.UNAUTHORISED);
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddleware;
