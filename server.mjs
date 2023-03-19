import express from "express";
import dotenv from "dotenv";
const app = express();
import "express-async-errors";
import morgan from "morgan";

import { dirname } from 'path'
import { fileURLToPath } from "url";
import path from "path";
//db and authUser
import connectDB from "./job/db/connect.mjs";

//router
import authRouter from "./job/routes/authRoutes.mjs";
import jobsRouter from "./job/routes/jobsRoutes.mjs";

//middleware
import notFoundMiddleWare from "./job/middleware/not-found.mjs";
import errorHandlerMiddleware from "./job/middleware/error-handler.mjs";
import authenticateUser from './job/middleware/auth.mjs '
dotenv.config();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
const __dirname=dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./job/build')))

app.use(express.json());

// app.get('/', (req, res) => {
//     // throw new Error("error")
//     res.send('Welcome')
// })

// app.get('/', (req, res) => {
//         res.json({msg:"api"})
//     })

app.get("/api/v1", (req, res) => {
  res.json({ msg: "api", hel: "dhsfhs" });
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs",authenticateUser, jobsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'./job/build','index.html'))
})

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("running on ", port);
    });
  } catch (err) {
    console.log("haji");
    console.log(err);
  }
};
start();
