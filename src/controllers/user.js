import * as db from '../models';

export const getUsers = async (req, res, next) => {
  try {
    const users = await db.User.find();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = {
      name: req.body.name,
      profileImageUrl: req.body.profileImageUrl,
    };
    const foundUser = await db.User.findByIdAndUpdate(
      req.params.user_id,
      updatedUser,
      { new: true }
    );
    return res.status(200).json(foundUser);
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await db.User.findByIdAndDelete(req.params.user_id);
    return res.status(200).json({
      id: req.params.user_id,
    });
  } catch (err) {
    return next(err);
  }
};
