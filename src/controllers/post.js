import * as db from "../models";

export const createPost = async (req, res, next) => {
  try {
    const post = await db.Post.create({
      title: req.body.title,
      body: req.body.body,
      user: req.body.userId
    });
    const foundPost = await db.Post.findById(post._id).populate("user", {
      name: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundPost);
  } catch (err) {
    return next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await db.Post.find().sort({ createdAt: "desc" });
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updatedPost = {
      title: req.body.title,
      body: req.body.body
    };
    const foundPost = await db.Post.findByIdAndUpdate(
      req.params.post_id,
      updatedPost,
      { new: true }
    );
    return res.status(200).json(foundPost);
  } catch (err) {
    return next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await db.Post.findByIdAndDelete(req.params.post_id);
    return res.status(200).json({
      id: req.params.post_id
    });
  } catch (err) {
    return next(err);
  }
};
