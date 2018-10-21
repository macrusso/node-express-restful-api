import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.load();

export const loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.eventNames.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please log in first"
    });
  }
};
