import { Router } from "express";
import Post from "../models/post.model";
const router = Router();
import multer from "multer";
const uplaods = multer();
router.post("/", uplaods.single("image"), async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file.buffer;

    const post = new Post({ title, image });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new post" });
  }
});
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new post" });
  }
});
export default router;
