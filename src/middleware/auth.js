import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.load();

export const loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, err => {
      if (!err) {
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
