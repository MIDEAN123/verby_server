import express from "express";
import { login, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", registerUser)

export default userRouter