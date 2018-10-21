import mongoose from "mongoose";
import { User, Post } from "./";

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      maxLength: 255
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  {
    timestamps: true
  }
);

commentSchema.pre("remove", async function(next) {
  try {
    const user = await User.findById(this.userId);
    user.commentIds.remove(this.id);
    await user.save();
    const post = await Post.findById(this.postId);
    post.commentIds.remove(this.id);
    await post.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
