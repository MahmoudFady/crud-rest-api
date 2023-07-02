import { Router } from "express";
const router = Router();
import fileUpload from "../middlewares/file-upload.mw";
import * as userController from "../controllers/user.controller";
const userImageMw = fileUpload("uploads/users/", [".png", ".jpeg"]).single(
  "image"
);
router.post("/", userImageMw, userController.addOne);
router.patch("/img-upload/:userId", userImageMw, userController.updateImage);
router.get("/list", userController.getAllUsers)
router.get("/:userId", userController.getOneUser)
router.patch("/editUser",userController.editUser);
router.delete("/deleteUser",userController.deleteUser);

export default router;
