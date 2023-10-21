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
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "https://roomsy-v2.vercel.app"}));
// app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use("/uploads", uploadMiddleware);
app.use("/server/routes/uploads", uploadbylinkMiddleware);
app.use(router);
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

app.get("/", (req, res) => {
  res.send("Home get Request");
});

app.get("/test", (req, res) => {
  res.send("Home get Request");
});


