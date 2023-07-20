import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import notFoundMw from "./middlewares/not-found.mw";
import errorMw from "./middlewares/error.mw";
import loggingMw from "./middlewares/logging.mw";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use(notFoundMw);
app.use(errorMw);

export default app;
