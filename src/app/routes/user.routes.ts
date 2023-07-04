import { Router } from "express";
const router = Router();
import fileUpload from "../middlewares/file-upload.mw";
import * as userController from "../controllers/user.controller";
import validationMw from "../middlewares/validation.mw";
const userImageMw = fileUpload("uploads/users/", [".png", ".jpeg"]).single(
  "image"
);
router
  .route("/")
  .post(
    userImageMw,
    (req, res, next) => validationMw(next, ["user", req.body]),
    userController.addOne
  )
  .get(userController.getAllUsers);
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
router
  .route("/:userId")
  .all((req, res, next) => validationMw(next, ["mongoId", req.params.userId]))
  .get(userController.getOneUser)
  .patch(
    (req, res, next) => validationMw(next, ["user", req.body]),
    userController.editUser
  )
  .delete(userController.deleteUser);

export default router;
