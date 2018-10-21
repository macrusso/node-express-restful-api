import mongoose from "mongoose";
import User from "./user";

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  "mongodb://localhost:27017/api",
  {
    keepAlive: true,
    useNewUrlParser: true
  }
);

export { User };
