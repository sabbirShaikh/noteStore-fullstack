import USER from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(200).json({ success: false, message: "provide all the fields." })
    }
    const isUser = await USER.findOne({ email });
    if (isUser) {
      return res.status(409).json({ success: false, message: "already user exist on this email!" })
    }
    const hashPass = await bcrypt.hash(password, 10);
    await USER.insertOne({ name, email, password: hashPass });
    return res.status(201).json({ success: true, message: "user account is created! you can login now." })
  } catch (error) {
    return res.status(500).json({ success: false, message: "server side error" })
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "provide all the fields" })
    }
    const isUser = await USER.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ success: false, message: "invalid email!" })
    }
    const verifyPass = await bcrypt.compare(password, isUser.password);
    if (!verifyPass) {
      return res.status(400).json({ success: false, message: "invalid password" })
    }
    const token = jwt.sign({ userId: isUser._id }, process.env.USERSECRET_KEY, { expiresIn: "1d" })
    return res.status(200).json({ success: true, message: "you are logged in successfully.", token })
  } catch (error) {
    return res.status(500).json({ success: false, message: "server side error" })
  }
}

export { handleSignup, handleLogin }