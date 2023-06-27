import { Router } from "express";
const router = Router();
import fileUpload from "../middlewares/file-upload.mw";
import * as userController from "../controllers/user.controller";
const userImageMw = fileUpload("uploads/users/", [".png", ".jpeg"]).single(
  "image"
);
router.post("/", userImageMw, userController.addOne);
router.patch("/img-upload/:userId", userImageMw, userController.updateImage);
export default router;
