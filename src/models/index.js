import mongoose from "mongoose";
import User from "./user";
import Post from "./post";
import Comment from "./comment";

mongoose.Promise = Promise;

if (process.env.NODE_ENV === "test") {
  mongoose.connect(
    "mongodb://localhost:27017/test",
    {
      keepAlive: true,
      useNewUrlParser: true
    },
    () => {
      mongoose.connection.db.dropDatabase();
    }
  );
} else {
  mongoose.connect(
    "mongodb://localhost:27017/api",
    {
      keepAlive: true,
      useNewUrlParser: true
    }
  );
}

export { User, Post, Comment };
