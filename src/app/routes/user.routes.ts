import { Router } from "express";
const router = Router();
import userModel from "../models/user.model";
import ControllerFactroy from "../controllers/factory.controller";
const userCtrlFactory = new ControllerFactroy(userModel);
import fileUpload from "../middlewares/file-upload.mw";
import * as userController from "../controllers/user.controller";
import validationMw from "../middlewares/validation.mw";
const userImageMw = fileUpload("uploads/users/", [".png", ".jpeg"]).single(
  "image"
);
router.get("/options", userCtrlFactory.getOptions);
router
  .route("/")
  .post(
    userImageMw,
    (req, res, next) => validationMw(next, ["user", req.body]),
    userController.create
  )
  .get(userCtrlFactory.getAll("image firstName"));
router.patch(
  "/img-upload/:id",
  userImageMw,
  (req, res, next) => validationMw(next, ["mongoId", req.params.id]),
  userController.updateImage
);
router
  .route("/:id")
  .all((req, res, next) => validationMw(next, ["mongoId", req.params.id]))
  .get(userCtrlFactory.getById("id"))
  .patch(
    (req, res, next) => validationMw(next, ["user", req.body]),
    userCtrlFactory.updateById("id")
  )
  .delete(userCtrlFactory.deleteById("id"));

export default router;
