import express from "express";
import { postLogin, postRegister } from "../controllers/auth.controller.js";
import joi from "@hapi/joi";

const router = express.Router();

router.post("/register", postRegister);

router.post("/login", postLogin);

export default router;
