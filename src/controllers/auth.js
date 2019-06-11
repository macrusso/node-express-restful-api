import * as db from "../models";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      email: req.body.email,
    });
    const { id, name, email, profileImageUrl } = user;
    const isMatch = await user.comparePass(req.body.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id,
          name,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      return res.status(200).json({
        id,
        name,
        email,
        profileImageUrl,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email and/or Password",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Email and/or Password",
    });
  }
};

export const register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { _id, name, email, profileImageUrl } = user;
    const token = jwt.sign(
      {
        _id,
        name,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    return res.status(200).json({
      _id,
      name,
      email,
      profileImageUrl,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that name and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
