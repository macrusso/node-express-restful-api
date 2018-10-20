import mongoose from "mongoose";
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  "mongodb://localhost/api/v1",
  {
    keepAlive: true,
    useMongoClient: true
  }
);
