import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Connect to database
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to the database");
});

// Import Routes
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

// Body Parser
app.use(express.json());

// Route Middleware
app.use("/api/user", authRouter);
app.use("/api/posts", postsRouter);

app.listen(5000, () => {
  console.log("App is listening on port 5000...");
});
