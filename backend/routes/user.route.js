import express from "express";
import { getUser } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js";

const userRouter=express.Router();

userRouter.get("/currentuser",isAuth,getUser);

export default userRouter;