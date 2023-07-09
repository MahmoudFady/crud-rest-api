import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import notFoundMw from "./middlewares/not-found.mw";
import errorMw from "./middlewares/error.mw";
import path from "path";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
import { createLogger, transports } from "winston";
import expressWinston from "express-winston";

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logfile.log" }),
  ],
});

app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  })
);
app.use(notFoundMw);
app.use(errorMw);
export default app;
