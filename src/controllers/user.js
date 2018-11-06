import * as db from '../models';

export const getUsers = async (req, res, next) => {
  try {
    const users = await db.User.find();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};
