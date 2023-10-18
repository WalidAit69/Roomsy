import UserModel from "../model/Usermodel.js";
import jwt from "jsonwebtoken";

const protect =  async (req, res, next) => {
  
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  }
  if (!token) {
    res.status(401).send({ message: "Not authorized, no token found" })
  }
};


export { protect }