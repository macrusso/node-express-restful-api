import mongoose from "mongoose";
import User from "./user";
import Post from "./post";
import Comment from "./comment";

mongoose.Promise = Promise;

if (process.env.NODE_ENV === "test") {
  mongoose.connect(
    process.env.MONGO_TEST_URI,
    {
      keepAlive: true,
      useNewUrlParser: true,
    },
    () => {
      mongoose.connection.db.dropDatabase();
    },
  );
} else {
  mongoose.connect(process.env.MONGO_API_URI, {
    keepAlive: true,
    useNewUrlParser: true,
  });
}

export { User, Post, Comment };
