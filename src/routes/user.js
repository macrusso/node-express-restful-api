import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/user";

const router = express.Router();

router.route("/").get(getUsers);

router
  .route("/:user_id")
  .patch(updateUser)
  .delete(deleteUser);

export default router;
