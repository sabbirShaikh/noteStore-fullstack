import express from 'express';
import { handleLogin, handleSignup } from '../controllers/userController.js';

const userRouter = express.Router();

//post
userRouter.post("/signup", handleSignup)
userRouter.post("/login", handleLogin)


export default userRouter;