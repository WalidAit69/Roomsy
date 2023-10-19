import express from "express";
import cors from "cors";
import connectDB from "./database/conn.js";
import router from "./routes/route.js";
import placerouter from "./routes/Placeroute.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import uploadMiddleware from "./uploadMiddleware.cjs";
import uploadbylinkMiddleware from "./uploadbylinkMiddleware.cjs";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "https://roomsy-v3.vercel.app" }));
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(cookieParser());
app.use("/uploads", uploadMiddleware);
app.use("/server/routes/uploads", uploadbylinkMiddleware);

app.get("/", (req, res) => {
  res.send("Home get Request");
});

app.get("/testing", (req, res) => {
  res.send("testing get Request");
});

app.use("/api", router);
app.use(placerouter);

const port = 3001;

connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (error) {
      console.log("cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("invalid database");
  });
