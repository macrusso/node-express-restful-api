import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./handlers/error";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
