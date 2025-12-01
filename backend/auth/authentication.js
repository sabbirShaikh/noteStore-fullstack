import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config();

function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authentication) {
      return res.status(400).json({ success: false, message: "unauthorized, you can not access!" })
    }
    const token = authorization.split(" ")[1];
    const userId = jwt.verify(token, process.env.USERSECRET_KEY);
    req.userId = userId;
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message || "server side error" })
  }
}

export default authentication;