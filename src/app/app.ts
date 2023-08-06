import express, { request } from "express";
import cors from "cors";
import path from "path";
import mongoSanitize from "express-mongo-sanitize";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import assetRouter from "./routes/asset.routes"
import notFoundMw from "./middlewares/not-found.mw";
import errorMw from "./middlewares/error.mw";
import roleAuthMw from "./middlewares/role-auth.mw";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));

import assetModel from "./models/asset.model";

app.post("/addToAsset", async(req, res)=>{
  let data = await assetModel.create(req.body);
  res.json(data);
})
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/assets", assetRouter);
app.use(notFoundMw);
app.use(errorMw);

export default app;
