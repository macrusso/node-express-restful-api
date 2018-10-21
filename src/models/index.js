import mongoose from "mongoose";
import User from "./user";
import Post from "./post";
import Comment from "./comment";

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  "mongodb://localhost:27017/api",
  {
    keepAlive: true,
    useNewUrlParser: true
  }
);

export { User, Post, Comment };
