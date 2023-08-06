import { Router } from "express";
const router = Router();
import userModel from "../models/user.model";
import ControllerFactory from "../controllers/factory.controller";
const userCtrlFactory = new ControllerFactory(userModel);
import fileUpload from "../middlewares/file-upload.mw";
import * as userController from "../controllers/user.controller";
import validationMw from "../middlewares/validation.mw";
import roleAuthMw from "../middlewares/role-auth.mw";
const userImageMw = fileUpload("uploads/users/", [".png", ".jpeg"]).single(
  "image"
);




//router.get("/template/form", userCtrlFactory.getFormTemplate);
// 
router
  .route("/search")
  .post(userCtrlFactory.search("", ["gender", "ssn"]));

router.get("/options", userCtrlFactory.getOptions);

// Parent 1 // get  post
router
  .route("/")
  .post(
    userImageMw,
    (req, res, next) => validationMw(next, ["addUser", req.body]),
    userController.create
  )
  .get(userCtrlFactory.getAll("image firstName"));

// 2   
router.patch(
  "/uploadImage/:id",
  userImageMw,
  (req, res, next) => validationMw(next, ["mongoId", req.params.id]),
  userController.updateImage
);

router // 2 patch  get  delete
  .route("/:id")
  .all((req, res, next) => validationMw(next, ["mongoId", req.params.id]))
  .get(userCtrlFactory.getById("id"))
  .patch(
    (req, res, next) => validationMw(next, ["updateUser", req.body]),
    userCtrlFactory.updateById("id")
  )
  .delete(userCtrlFactory.deleteById("id"));
// router.get('getOne/:id' ,userCtrlFactory.getById('id') )
// router.get('delOne/:id' ,userCtrlFactory.deleteById('id') )
// router.get('pathOne/:id' ,userCtrlFactory.updateById('id') )


export default router;
