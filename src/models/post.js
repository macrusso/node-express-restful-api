import mongoose from "mongoose";
import { User } from "./";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 160
    },
    body: {
      type: String,
      required: true,
      maxLength: 255
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

postSchema.pre("remove", async function(next) {
  try {
    const user = await User.findById(this.user);
    user.posts.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Post = mongoose.model("Post", postSchema);
export default Post;
