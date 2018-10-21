import mongoose from "mongoose";
import User from "./user";

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  "mongodb://localhost/api",
  {
    keepAlive: true,
    useNewUrlParser: true
  }
);

export { User };
