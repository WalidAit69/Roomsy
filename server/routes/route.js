import { Router } from "express";
import UserModel from "../model/Usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";
import connectDB from "../database/conn.js";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mime from "mime-types";
import dotenv from "dotenv";

const router = Router();
dotenv.config();


const uploadMiddleware = multer({ dest: "/tmp" });

// upload pictures to AWS
async function uploadToS3(newPath, originalFilename, mimetype) {
  connectDB();
  const client = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const ext = originalFilename.split(".")[1];
  const newFilename = Date.now() + "." + ext;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKETNAME,
      Body: fs.readFileSync(newPath),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );

  console.log({ data });
  return `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${newFilename}`;
}

// Register
router.post(
  "/api/register",
  uploadMiddleware.single("file"),
  async (req, res) => {
    connectDB();

    try {
      const { originalname, path, mimetype } = req.file;
      const newPath = path.replace(/\\/g, "/");
      const url = await uploadToS3(newPath, originalname, mimetype);

      const { fullname, email, password, phone, bio, location } = req.body;
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      } else {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new UserModel({
            fullname,
            email,
            password: hashedPassword,
            phone,
            bio,
            location,
            profilepic: url,
            job: "",
            lang: "",
            host: false,
            Superhost: false,
          });

          const result = await newUser.save();
          res
            .status(201)
            .json({ msg: "User Registered Successfully", user: result });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//update user
router.put(
  "/api/UpdateUserimg/:Userid",
  uploadMiddleware.single("file"),
  async (req, res) => {
    connectDB();

    const { mimetype, path, originalname } = req?.file;
    const newPath = path.replace(/\\/g, "/");
    const url = await uploadToS3(newPath, originalname, mimetype);

    const { Userid } = req.params;
    if (Userid) {
      const { job, bio, lang } = req.body;
      const userDoc = await UserModel.findById(Userid);
      if (!userDoc) {
        return res.status(404).json({ msg: "User not found" });
      }

      await userDoc.updateOne({
        job: job ? job : userDoc.job,
        bio: bio ? bio : userDoc.bio,
        lang: lang ? lang : userDoc.lang,
        profilepic: url ? url : userDoc.profilepic,
      });

      res.status(200).json(userDoc);
    }
  }
);

router.put("/api/UpdateUser/:Userid", async (req, res) => {
  connectDB();

  const { Userid } = req.params;
  if (Userid) {
    try {
      const { job, bio, lang } = req.body;
      const userDoc = await UserModel.findById(Userid);
      if (!userDoc) {
        return res.status(404).json({ msg: "User not found" });
      }

      await userDoc.updateOne({
        job: job ? job : userDoc.job,
        bio: bio ? bio : userDoc.bio,
        lang: lang ? lang : userDoc.lang,
      });

      res.status(200).json(userDoc);
    } catch (error) {
      res.status(500).json("Error");
    }
  }
});

//Login
router.post("/api/login", async (req, res) => {
  connectDB();
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email not found" });
    } else {
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ msg: "Password incorrect" });
      }
      jwt.sign(
        {
          Userid: user._id,
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
          bio: user.bio,
          location: user.location,
          password: user.password,
          profilepic: user.profilepic,
          host: user.host,
          Superhost: user.Superhost,
        },
        process.env.JWT_SECRET,
        { expiresIn: 24 * 60 * 60 },
        (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .cookie("token", token)
            .json({ id: user._id, accesstoken: token });
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET Users
router.get("/api/user/:id", async (req, res) => {
  connectDB();

  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      fullname: user.fullname,
      phone: user.phone,
      email: user.email,
      bio: user.bio,
      location: user.location,
      profilepic: user.profilepic,
      job: user.job,
      lang: user.lang,
      host: user.host,
      Superhost: user.Superhost,
      likedPosts: user.likedPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// Logout
router.get("/api/logout", async (req, res) => {
  connectDB();

  try {
    res.clearCookie("token");
    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
