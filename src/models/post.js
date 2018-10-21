import mongoose from "mongoose";

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

const Post = mongoose.model("Post", postSchema);
export default Post;
