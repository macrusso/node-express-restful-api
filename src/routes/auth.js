import express from "express";
import { register } from "../handlers/auth";

const router = express.Router();

router.post("/register", register);

export default router;
