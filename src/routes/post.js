import express from "express";
import { createPost, getPosts, deletePost, updatePost } from "../controllers/post";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getPosts)
  .post(createPost);

router
  .route("/:post_id")
  .patch(updatePost)
  .delete(deletePost);

export default router;
