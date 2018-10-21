import * as db from "../models";

export const createComment = async (req, res, next) => {
  try {
    const post = await db.Comment.create({
      body: req.body.body,
      userId: req.body.userId,
      postId: req.body.postId
    });
    const foundUser = await db.User.findById(req.body.userId);
    foundUser.commentIds.push(post._id);
    await foundUser.save();
    const foundPost = await db.Post.findById(req.body.postId);
    foundPost.commentIds.push(post._id);
    await foundPost.save();
    const foundComment = await db.Comment.findById(post._id).populate("user", {
      name: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundComment);
  } catch (err) {
    return next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await db.Comment.find();
    return res.status(200).json(comments);
  } catch (err) {
    return next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const updatedComment = {
      body: req.body.body
    };
    const foundComment = await db.Comment.findByIdAndUpdate(
      req.params.comment_id,
      updatedComment,
      { new: true }
    );
    return res.status(200).json(foundComment);
  } catch (err) {
    return next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await db.Comment.findByIdAndDelete(
      req.params.comment_id
    );
    return res.status(200).json({
      id: req.params.comment_id
    });
  } catch (err) {
    return next(err);
  }
};
