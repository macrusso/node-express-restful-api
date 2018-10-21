import * as db from "../models";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {};

export const register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, name, profileImageUrl } = user;
    const token = jwt.sign(
      {
        id,
        name,
        profileImageUrl
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      idm,
      name,
      profileImageUrl,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that name and/or email is taken.";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
