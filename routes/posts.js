import express from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken.js";
import { getPosts } from "../controllers/posts.controller.js";

const router = express();

router.get("/", verifyAuthToken, getPosts);

export default router;
