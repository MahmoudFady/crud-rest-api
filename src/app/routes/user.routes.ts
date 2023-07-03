import { Router } from "express";
const router = Router();
import fileUpload from "../middlewares/file-upload.mw";
import * as userController from "../controllers/user.controller";
import validationMw from "../middlewares/validation.mw";
const userImageMw = fileUpload("uploads/users/", [".png", ".jpeg"]).single(
  "image"
);
router.post(
  "/",
  userImageMw,
  (req, res, next) => validationMw(next, ["user", req.body]),
  userController.addOne
);
router.patch(
  "/img-upload/:userId",
  userImageMw,
  (req, res, next) =>
    validationMw(
      next,
      ["mongoId", req.params.userId],
      ["file", req.body.image]
    ),
  userController.updateImage
);

router.get("/list", userController.getAllUsers);

router.get(
  "/:userId",
  (req, res, next) => validationMw(next, ["mongoId", req.params.userId]),
  userController.getOneUser
);

router.patch(
  "/editUser/:id",
  (req, res, next) =>
    validationMw(
      next,
      ["mongoId", req.params.userId],
      ["file", req.body.image]
    ),
  userController.editUser
);
router.delete(
  "/deleteUser/:id",
  (req, res, next) =>
    validationMw(
      next,
      ["mongoId", req.params.userId],
      ["file", req.body.image]
    ),
  userController.deleteUser
);

export default router;
