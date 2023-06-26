import { Router } from "express";
const router = Router();
import fileUpload from "../middlewares/file-upload.mw";
router.post(
  "/img-upload",
  fileUpload("uploads/users/", [".png", ".jpeg"]).single("image"),
  (req, res, next) => {
    res.status(200).json({
      message: "file uploaded",
    });
  }
);
export default router;
